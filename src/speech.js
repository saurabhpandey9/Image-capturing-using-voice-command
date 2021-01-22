import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './App.css'

var flag = 1


// Function to fire image capture button using id

function capture_image_btn() {
  document.getElementById("imgcap").click()
}


const Speech = () => {
  // camera.startCamera();
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }


  // Parshing required string to execute command

  const n = transcript.search("capture image");
  if (n !== -1) {
    console.log("captured command matched");
    document.getElementById("capture-image").click()
    resetTranscript()
  }


  // For getting response from spacebar to activate Microphone

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      if (flag === 1) {
        console.log("Start Listening");
        document.getElementById("msg").textContent = "Started Listening";
        resetTranscript()
        SpeechRecognition.startListening({ continuous: true })
        flag = 0
      }

      else if (flag === 0) {
        console.log("Stop Listening");
        document.getElementById("msg").textContent = "Stopped Listening";
        SpeechRecognition.stopListening()
        flag = 1
      }
    }

  }

  return (
    <div>
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <p className="center">{transcript}</p>
      <button id="capture-image" onClick={capture_image_btn}> Capture Image</button>
    </div>
  )
}
export default Speech