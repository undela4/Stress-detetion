import React, { useState, useRef } from 'react';
import {uploadVideoToServer} from './methods.js'

const Video_Capture = () => {


  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const videoChunksRef = useRef([]);
  const videoRef = useRef(null);
  
  
  const startRecording = async () => {
    
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      
        // Optionally: Clear video chunks after recording is stopped
        videoChunksRef.current = [];
      
        await uploadVideoToServer(blob);
        
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Could not access media devices. Please check permissions.');
      console.error(err);
    }

  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <div>

      <h2>Video Recorder</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video ref={videoRef} autoPlay muted style={{ width: '400px', height: '300px' }}></video>
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      {videoURL && (
        <div>
          <h3>Recorded Video</h3>
          <video src={videoURL} controls style={{ width: '400px', height: '300px' }}></video>
          <a href={videoURL} download="recorded-video.webm">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default Video_Capture;


