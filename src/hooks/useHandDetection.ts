import { useRef, useCallback, useState, useEffect } from 'react';
import { Hands, Results, NormalizedLandmark } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { classifyGesture } from '@/lib/gestureClassifier';

export interface HandLandmarks {
  landmarks: NormalizedLandmark[];
  handedness: 'Left' | 'Right';
}

export interface DetectionResult {
  hands: HandLandmarks[];
  gesture: string | null;
  confidence: number;
  category: 'letter' | 'word' | 'phrase' | 'number' | null;
}

export const useHandDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult>({
    hands: [],
    gesture: null,
    confidence: 0,
    category: null,
  });

  // Process hand detection results
  const onResults = useCallback((results: Results) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !videoRef.current) return;

    // Set canvas dimensions
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Draw the video frame
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    // Draw hand landmarks and connections
    if (results.multiHandLandmarks && results.multiHandedness) {
      const hands: HandLandmarks[] = [];
      let primaryGesture = { gesture: '', confidence: 0, category: 'phrase' as 'letter' | 'word' | 'phrase' | 'number' };

      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        const landmarks = results.multiHandLandmarks[i];
        const handedness = results.multiHandedness[i];

        hands.push({
          landmarks: landmarks as NormalizedLandmark[],
          handedness: handedness.label as 'Left' | 'Right',
        });

        // Draw connections
        drawConnectors(ctx, landmarks, [
          [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
          [0, 5], [5, 6], [6, 7], [7, 8], // Index
          [0, 9], [9, 10], [10, 11], [11, 12], // Middle
          [0, 13], [13, 14], [14, 15], [15, 16], // Ring
          [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
          [5, 9], [9, 13], [13, 17], // Palm
        ], { color: '#00FFFF', lineWidth: 3 });

        // Draw landmarks
        drawLandmarks(ctx, landmarks, {
          color: '#FF00FF',
          lineWidth: 1,
          radius: 4,
        });

        // Classify gesture for the first detected hand
        if (i === 0) {
          primaryGesture = classifyGesture(landmarks as NormalizedLandmark[]);
        }
      }

      setDetectionResult({
        hands,
        gesture: primaryGesture.gesture || null,
        confidence: primaryGesture.confidence,
        category: primaryGesture.category || null,
      });
    } else {
      setDetectionResult({
        hands: [],
        gesture: null,
        confidence: 0,
        category: null,
      });
    }

    ctx.restore();
  }, []);

  // Initialize MediaPipe Hands
  const initializeHands = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);

      handsRef.current = hands;

      return hands;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize hand detection';
      setError(message);
      throw err;
    }
  }, [onResults]);

  // Start hand detection
  const startDetection = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize MediaPipe if not already done
      if (!handsRef.current) {
        await initializeHands();
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Start camera feed processing
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (handsRef.current && videoRef.current) {
              await handsRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        cameraRef.current = camera;
        await camera.start();
        setIsActive(true);
      }

      setIsLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start hand detection';
      setError(message);
      setIsLoading(false);
    }
  }, [initializeHands]);

  // Stop hand detection
  const stopDetection = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
    setDetectionResult({
      hands: [],
      gesture: null,
      confidence: 0,
      category: null,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [stopDetection]);

  return {
    videoRef,
    canvasRef,
    isActive,
    isLoading,
    error,
    detectionResult,
    startDetection,
    stopDetection,
  };
};
