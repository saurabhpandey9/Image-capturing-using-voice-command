import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './App.css'

var flag = 1


// Function to fire image capture button using id

// function capture_image_btn() {
//   document.getElementById("imgcap").click()
// }


const Speech = () => {
  // camera.startCamera();
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }


  // Parshing required string to execute command

  if (transcript.search("start capture")!== -1) {
    console.log("start capture");
    document.getElementById("msg").textContent = "Video Capturing Started";
    document.getElementById("start captureee").click()
    resetTranscript()
  }
  else if (transcript.search("stop capture")!==-1){
    document.getElementById("msg").textContent = "Video Capturing Stopped";
    document.getElementById("start captureee").click()
    console.log("Stopeed capturing");
    resetTranscript()

  }
  else if (transcript.search("download")!==-1){
    document.getElementById("msg").textContent = "Video Downloaded";
    document.getElementById("download").click()
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
      <p className="center">{transcript}</p>
    </div>
  )
}
export default Speech