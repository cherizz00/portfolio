from flask import Flask, request, jsonify
import os
import torch
import numpy as np
from PIL import Image
import cv2
from torchvision import models, transforms
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to make requests

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ------------------- LSTM Classifier -------------------
class LSTMClassifier(torch.nn.Module):
    def __init__(self, input_size=2048, hidden_size=256, num_layers=1):
        super(LSTMClassifier, self).__init__()
        self.lstm = torch.nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = torch.nn.Linear(hidden_size, 1)
        self.sigmoid = torch.nn.Sigmoid()

    def forward(self, x):
        _, (hn, _) = self.lstm(x)
        out = self.fc(hn[-1])
        return self.sigmoid(out)

# ------------------- Feature Extractor -------------------
def extract_video_features(video_path, max_len=40):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = models.resnext50_32x4d(weights=models.ResNeXt50_32X4D_Weights.DEFAULT)
    model.fc = torch.nn.Identity()
    model = model.to(device)
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])

    cap = cv2.VideoCapture(video_path)
    frames = []
    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if count % 10 == 0:  # Sample 1 in every 10 frames
            img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            img = transform(img)
            frames.append(img.unsqueeze(0))
        count += 1
    cap.release()

    with torch.no_grad():
        features = [model(img.to(device)).squeeze(0).cpu().numpy() for img in frames]

    features = np.array(features)
    if features.shape[0] > max_len:
        features = features[:max_len]
    else:
        padding = np.zeros((max_len - features.shape[0], 2048))
        features = np.vstack((features, padding))

    return features

# ------------------- Utilities -------------------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ------------------- Predict API -------------------
@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400

    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    features = extract_video_features(filepath)

    # Load trained LSTM model
    model = LSTMClassifier()
    model.load_state_dict(torch.load("models/lstm_model.pt", map_location=torch.device('cpu')))
    model.eval()

    input_tensor = torch.tensor(features, dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        pred = model(input_tensor).item()
        label = "Fake" if pred >= 0.5 else "Real"

    # Logging
    with open("log.txt", "a") as log_file:
        log_file.write(f"{datetime.now()} - {filename} - {label} ({pred:.4f})\n")

    return jsonify({
        'label': label,
        'score': round(pred, 4)
    })

@app.route('/')
def index():
    return jsonify({'message': 'Flask Backend Running. Use /predict endpoint.'})

# ------------------- Main -------------------
if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
