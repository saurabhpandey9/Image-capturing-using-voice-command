import React from 'react';
import Webcam from "react-webcam";
import './App.css';


const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      console.log('Stopped, state = ' + mediaRecorderRef.current.state);
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.log("Video.js line no 36",error);
      }
      
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
       console.log(url)
        a.download = "recorded-video.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);
  
    return (
      <>

      <p id="msg">Click Spacebar to Start Listening</p>
      
        <Webcam audio={true} ref={webcamRef} />
  
        {capturing ? (
          <button id="start captureee" onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button id="start captureee" onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <button id="download" onClick={handleDownload}>Download</button>
        )}
  
  
        
        
        
      </>
    );
  };

  export default WebcamStreamCapture;