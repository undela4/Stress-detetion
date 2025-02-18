import React, { useRef, useEffect, useState } from 'react';
import '../../../App.css';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { oninfo, onwarning, onerror } from '../../../toast';

export function VideoCapture() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [stressLevel, setStressLevel] = useState(0); 

      useEffect(() => {
      startVideo();
      // sendStressDataToBackend(stressLevel);
  }, [stressLevel]);

  // OPEN WEBCAM
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;

        // Wait for the video to load before starting face detection
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play(); // Ensure video is playing
          loadModels(); // Load models after video is ready
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LOAD FACE-API MODELS
  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);

    faceMyDetect(); // Start face detection after models are loaded
  };

  // DETECT FACES AND EMOTIONS
  const faceMyDetect = () => {
    setInterval(async () => {
      // Check if video is ready
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const detections = await faceapi.detectAllFaces(videoRef.current,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          calculateStress(expressions);
        }
        // DRAW ON CANVAS
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        faceapi.matchDimensions(canvasRef.current, {
          width: 940,
          height: 650
        });

        const resized = faceapi.resizeResults(detections, {
          width: 940,
          height: 650
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      }
    },5000);
  };

  // CALCULATE STRESS BASED ON EMOTIONS
  const calculateStress = (expressions) => {
    const stressFactors = {
      anger: expressions.angry,
      fear: expressions.fearful,
      disgust: expressions.disgusted,
      sadness: expressions.sad
    };


    const points = Object.values(stressFactors);  // Get the emotion values
    var disp = points.reduce((a, b) => a + b, 0); // Sum of emotions (similar to original method)
    disp = disp*100
    const normalizedValue = Math.abs(disp - Math.min(...points)) / Math.abs(Math.max(...points) - Math.min(...points));
    const stressValue = Math.exp(-normalizedValue) * 100;  // Exponential decay
  
    setStressLevel(Math.round(disp));
    if(disp>60){
      onwarning('Take a deep breath! Try the 4-4-4 technique: inhale for 4 seconds, hold for 4, exhale for 4.')

    }
    // Update the stress level
  };
  
  // FUNCTION TO SEND STRESS DATA TO BACKEND
  const sendStressDataToBackend = (stressLevel) => {
    const employeeId = 1; // You can change this to be dynamic for different employees

    axios.post('http://localhost:5000/api/stress', {
      employeeId,
      stressLevel: stressLevel,
      timestamp: new Date().toISOString()
    })
      .then(response => {
        console.log('Stress data sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending stress data:', error);
      });
  };

  return (
    <div className="myapp">
      <h1>Facial Expression Recognition for Stress Detection</h1>
      <h2>Current Stress Level: {stressLevel}%</h2> {/* Display stress level */}
      <video crossOrigin="anonymous" ref={videoRef} autoPlay className="k"></video>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
    </div>
  );
}