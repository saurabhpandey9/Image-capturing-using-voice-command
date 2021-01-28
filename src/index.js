import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CameraFeed } from './component/camera-feed';
import WebcamStreamCapture from './Video';


const uploadImage = async file => {
  const formData = new FormData();
  formData.append('file', file);

  // Connect to a seaweedfs instance
};

function CameraCap() {
  return (
    <div className="CameraCap">
      <h1 >Image capture test</h1>
      <p id="msg">Click Spacebar to Start Microphone</p>
      <CameraFeed sendFile={uploadImage} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <div className="center">
      <App />
      <WebcamStreamCapture/>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
