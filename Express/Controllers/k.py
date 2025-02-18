import cv2
from deepface import DeepFace
import json
import sys
import os
from collections import defaultdict

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
output_dir = "processed_frames"
os.makedirs(output_dir, exist_ok=True)

# Function to classify emotions linked to stress

def is_stressful_emotion(emotion):
    stress_emotions = ['angry', 'fear', 'sad', 'disgust']
    return emotion in stress_emotions


def analyze_stress_from_video(video_path):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(json.dumps({"error": "Could not open video."}))
        return

    stress_count = 0
    total_frames = 0
    frame_skip = 1  # Analyze every nth frame
    stress_percentage_over_time = []
    time_per_frame = []
    
    # Dictionary to count occurrences of each emotion
    emotion_counts = defaultdict(int)

    fps = cap.get(cv2.CAP_PROP_FPS) 
    # print(fps)
    # Get the frames per second
    

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        total_frames += 1
        
        # Skip frames for performance optimization
        if total_frames % frame_skip != 0:
            continue

        try:
            # Analyze emotions in the current frame
            faces = face_cascade.detectMultiScale(frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
            faces = faces[:1]
            for (x, y, w, h) in faces:
                # Extract the face ROI (Region of Interest)
                face_roi = frame[y:y + h, x:x + w]
                results = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
                dominant_emotion = results[0]['dominant_emotion']
                
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
                cv2.putText(frame, dominant_emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
                
                frame_filename = os.path.join(output_dir, f"frame_{total_frames}.jpg")
                cv2.imwrite(frame_filename, frame) #saving  each frame
                
            if isinstance(results, list) and len(results) > 0:
                dominant_emotion = results[0]['dominant_emotion']

                # Check if the dominant emotion is linked to stress
                if is_stressful_emotion(dominant_emotion):
                    stress_count += 1

                # Update the count for the dominant emotion
                emotion_counts[dominant_emotion] += 1

            

        except Exception as e:
            print(f"Error analyzing frame {total_frames}: {e}")
            continue

    cap.release()

    # Final stress percentage
    final_stress_percentage = (stress_count / total_frames) * 100 if total_frames > 0 else 0

    # Find the most repeated emotion
    most_repeated_emotion = max(emotion_counts, key=emotion_counts.get, default=None)
    most_repeated_count = emotion_counts[most_repeated_emotion] if most_repeated_emotion else 0

    # Return results as JSON
    results = {
        "final_stress_percentage": final_stress_percentage,
        "most_repeated_emotion": most_repeated_emotion,
        "most_repeated_count": most_repeated_count,
        "emotion_counts": dict(emotion_counts)  # Include counts of all emotions
    }
    
    print(json.dumps(results))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python k.py <video_path>"}))
        sys.exit(1)

    video_path = sys.argv[1]
    analyze_stress_from_video(video_path)
