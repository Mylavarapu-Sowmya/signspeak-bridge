import { useRef, useCallback, useState, useEffect } from 'react';
import { Hands, Results, NormalizedLandmark } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

export interface HandLandmarks {
  landmarks: NormalizedLandmark[];
  handedness: 'Left' | 'Right';
}

export interface DetectionResult {
  hands: HandLandmarks[];
  gesture: string | null;
  confidence: number;
}

// Gesture classification based on landmark positions
// Similar approach to uzibytes/sign2text using landmark analysis
const classifyGesture = (landmarks: NormalizedLandmark[]): { gesture: string; confidence: number } => {
  if (landmarks.length !== 21) {
    return { gesture: '', confidence: 0 };
  }

  // Key landmark indices (MediaPipe hand model)
  const WRIST = 0;
  const THUMB_TIP = 4;
  const INDEX_TIP = 8;
  const MIDDLE_TIP = 12;
  const RING_TIP = 16;
  const PINKY_TIP = 20;
  
  const THUMB_IP = 3;
  const INDEX_PIP = 6;
  const MIDDLE_PIP = 10;
  const RING_PIP = 14;
  const PINKY_PIP = 18;

  const INDEX_MCP = 5;
  const MIDDLE_MCP = 9;
  const RING_MCP = 13;
  const PINKY_MCP = 17;

  // Helper: check if finger is extended
  const isFingerExtended = (tipIdx: number, pipIdx: number, mcpIdx: number): boolean => {
    return landmarks[tipIdx].y < landmarks[pipIdx].y && landmarks[pipIdx].y < landmarks[mcpIdx].y;
  };

  // Helper: check if thumb is extended (horizontal check for thumb)
  const isThumbExtended = (): boolean => {
    return Math.abs(landmarks[THUMB_TIP].x - landmarks[WRIST].x) > 
           Math.abs(landmarks[INDEX_MCP].x - landmarks[WRIST].x) * 0.5;
  };

  const indexExtended = isFingerExtended(INDEX_TIP, INDEX_PIP, INDEX_MCP);
  const middleExtended = isFingerExtended(MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP);
  const ringExtended = isFingerExtended(RING_TIP, RING_PIP, RING_MCP);
  const pinkyExtended = isFingerExtended(PINKY_TIP, PINKY_PIP, PINKY_MCP);
  const thumbExtended = isThumbExtended();

  // Count extended fingers
  const extendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;

  // ASL Gesture Recognition (based on sign2text approach)
  
  // Thumbs Up - only thumb extended, fist closed
  if (thumbExtended && extendedCount === 0 && landmarks[THUMB_TIP].y < landmarks[INDEX_MCP].y) {
    return { gesture: 'Thumbs Up', confidence: 92 };
  }

  // Thumbs Down - only thumb extended, pointing down
  if (thumbExtended && extendedCount === 0 && landmarks[THUMB_TIP].y > landmarks[WRIST].y) {
    return { gesture: 'Thumbs Down', confidence: 88 };
  }

  // Victory/Peace Sign - index and middle extended, others closed
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    return { gesture: 'Peace', confidence: 94 };
  }

  // OK Sign - thumb and index form circle, others extended
  const thumbIndexDist = Math.hypot(
    landmarks[THUMB_TIP].x - landmarks[INDEX_TIP].x,
    landmarks[THUMB_TIP].y - landmarks[INDEX_TIP].y
  );
  if (thumbIndexDist < 0.05 && middleExtended && ringExtended && pinkyExtended) {
    return { gesture: 'OK', confidence: 90 };
  }

  // I Love You (ASL) - thumb, index, and pinky extended
  if (thumbExtended && indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
    return { gesture: 'I Love You', confidence: 91 };
  }

  // Open Palm / Hello - all fingers extended
  if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
    return { gesture: 'Hello', confidence: 89 };
  }

  // Fist / A - all fingers closed
  if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && !thumbExtended) {
    return { gesture: 'A', confidence: 85 };
  }

  // Pointing / Index - only index extended
  if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    return { gesture: 'Point', confidence: 88 };
  }

  // Three - index, middle, ring extended
  if (indexExtended && middleExtended && ringExtended && !pinkyExtended) {
    return { gesture: 'Three', confidence: 86 };
  }

  // Four - all except thumb
  if (indexExtended && middleExtended && ringExtended && pinkyExtended && !thumbExtended) {
    return { gesture: 'Four', confidence: 87 };
  }

  // L shape - thumb and index extended at angle
  if (thumbExtended && indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
    return { gesture: 'L', confidence: 84 };
  }

  // Rock / Horns - index and pinky extended
  if (indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
    return { gesture: 'Rock', confidence: 85 };
  }

  // Call me / Phone - thumb and pinky extended
  if (thumbExtended && !indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
    return { gesture: 'Call Me', confidence: 83 };
  }

  return { gesture: 'Unknown', confidence: 50 };
};

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
      let primaryGesture: { gesture: string; confidence: number } = { gesture: '', confidence: 0 };

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
      });
    } else {
      setDetectionResult({
        hands: [],
        gesture: null,
        confidence: 0,
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
