import React, { useState } from 'react';
import axios from 'axios';
import './Detect.css';

function Detect() {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
    setResult(null);
    setConfidence(null);
  };

  const handleRemoveFile = () => {
    setVideo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video file!');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.label);
      setConfidence(response.data.score);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Prediction failed. Check the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detect-container">
      <h2><span className="deepfake-heading">DeepFakeVideo</span> Detection</h2>
      <form onSubmit={handleSubmit} className="detect-form">
        {!video ? (
          <label className="file-label">
            Upload Here
            <input type="file" accept="video/mp4" onChange={handleFileChange} hidden />
          </label>
        ) : (
          <div className="uploaded-file">
            Uploaded: {video.name}
            <span className="remove-file" onClick={handleRemoveFile}> ✗ </span>
          </div>
        )}
        <br /><br />
        <button type="submit" className="predict-button" disabled={loading}>
          {loading ? 'Predicting...' : 'Click Here to Predict'}
        </button>
      </form>

      {result && (
        <div className={`result ${result === 'Fake' ? 'fake' : 'real'}`}>
          <h3>Prediction Result: {result}</h3>
          <p>Confidence Score: {confidence}</p>
        </div>
      )}
    </div>
  );
}

export default Detect;
