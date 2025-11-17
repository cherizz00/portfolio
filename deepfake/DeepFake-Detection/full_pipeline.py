import os
import cv2
import torch
import numpy as np
from torchvision import models, transforms
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import torch.nn as nn
features_dir = "features"

for file in os.listdir(features_dir):
    if file.endswith(".npy") or file == "index.txt":
        os.remove(os.path.join(features_dir, file))

print("✅ Old features and index.txt deleted.")
# -------- Configuration --------
input_dirs = [("data/Celeb-real", 0), ("data/Celeb-synthesis", 1)]
features_dir = "features"
os.makedirs(features_dir, exist_ok=True)
max_videos_per_class = 150
max_len = 40  # max frames per video for LSTM
batch_size = 4
learning_rate = 0.001
epochs = 10
model_save_path = "models/lstm_model.pt"

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# -------- Feature extractor setup --------
resnext = models.resnext50_32x4d(weights=models.ResNeXt50_32X4D_Weights.DEFAULT)
resnext.fc = nn.Identity()
resnext = resnext.to(device).eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# -------- Feature extraction function --------
def extract_video_features(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"❌ Could not open {video_path}")
        return None

    frame_interval = 10
    features = []
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_interval == 0:
            img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            tensor = transform(img).unsqueeze(0).to(device)
            with torch.no_grad():
                feat = resnext(tensor).squeeze(0).cpu().numpy()
            features.append(feat)
        frame_count += 1
    cap.release()

    if len(features) == 0:
        print(f"⚠️ No frames extracted from {video_path}")
        return None

    return np.array(features)

# -------- Dataset building --------
def build_dataset():
    index = []

    for folder, label in input_dirs:
        video_files = [v for v in os.listdir(folder) if v.endswith(".mp4")]
        video_files = video_files[:max_videos_per_class]  # Limit to 150 per class

        for video in video_files:
            vid_path = os.path.join(folder, video)
            feat = extract_video_features(vid_path)
            if feat is None:
                continue
            out_file = os.path.join(features_dir, video.replace(".mp4", ".npy"))
            np.save(out_file, feat)
            index.append((out_file, label))

    # Save index.txt
    index_file = os.path.join(features_dir, "index.txt")
    with open(index_file, "w") as f:
        for path, label in index:
            f.write(f"{path},{label}\n")

    print(f"✅ Extracted features for up to {max_videos_per_class} videos per class.")
    print(f"✅ Dataset build complete with index at {index_file}")

# -------- Dataset class --------
class VideoDataset(Dataset):
    def __init__(self, index_file, max_len=40):
        self.data = []
        self.max_len = max_len
        with open(index_file, "r") as f:
            for line in f:
                path, label = line.strip().split(",")
                self.data.append((path, int(label)))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        path, label = self.data[idx]
        features = np.load(path)
        if features.shape[0] > self.max_len:
            features = features[:self.max_len]
        else:
            padding = np.zeros((self.max_len - features.shape[0], features.shape[1]))
            features = np.vstack((features, padding))
        return torch.tensor(features, dtype=torch.float32), torch.tensor(label, dtype=torch.float32)

# -------- LSTM model --------
class LSTMClassifier(nn.Module):
    def __init__(self, input_size=2048, hidden_size=256, num_layers=1):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        _, (hn, _) = self.lstm(x)
        out = self.fc(hn[-1])
        return out  # logits, use BCEWithLogitsLoss

# -------- Training --------
def train_model():
    index_file = os.path.join(features_dir, "index.txt")
    dataset = VideoDataset(index_file, max_len=max_len)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    labels = [label for _, label in dataset.data]
    pos_weight = torch.tensor([(len(labels) - sum(labels)) / sum(labels)], dtype=torch.float32).to(device)
    print(f"Using pos_weight={pos_weight.item():.4f} to handle class imbalance.")

    model = LSTMClassifier().to(device)
    criterion = nn.BCEWithLogitsLoss(pos_weight=pos_weight).to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

    for epoch in range(epochs):
        model.train()
        total_loss = 0
        for features, labels in dataloader:
            features, labels = features.to(device), labels.to(device)
            labels = labels.unsqueeze(1)
            optimizer.zero_grad()
            outputs = model(features)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {epoch+1}/{epochs} — Loss: {total_loss:.4f}")

    os.makedirs("models", exist_ok=True)
    torch.save(model.state_dict(), model_save_path)
    print(f"✅ Model saved at {model_save_path}")

# -------- Prediction --------
def predict(video_path):
    # Extract features
    feat = extract_video_features(video_path)
    if feat is None:
        print("Failed to extract features from video.")
        return

    # Pad or truncate
    if feat.shape[0] > max_len:
        feat = feat[:max_len]
    else:
        padding = np.zeros((max_len - feat.shape[0], feat.shape[1]))
        feat = np.vstack((feat, padding))

    # Load model
    model = LSTMClassifier().to(device)
    if not os.path.exists(model_save_path):
        print(f"❌ Model not found at {model_save_path}. Train first.")
        return
    model.load_state_dict(torch.load(model_save_path, map_location=device))
    model.eval()

    input_tensor = torch.tensor(feat, dtype=torch.float32).unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(input_tensor)
        prob = torch.sigmoid(output).item()
        label = "Fake" if prob >= 0.5 else "Real"
        print(f"Prediction: {label} (score = {prob:.4f})")

# -------- Main pipeline --------
if __name__ == "__main__":
    print("Step 1: Extracting features and building dataset...")
    build_dataset()

    print("\nStep 2: Training LSTM model...")
    train_model()

    print("\nStep 3: Testing prediction on a sample video...")
    test_video = "data/Celeb-real/id0_0001.mp4"  # Change this to your test video path
    predict(test_video)
