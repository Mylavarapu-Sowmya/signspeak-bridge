// ASL Gesture Classifier
// Based on the approach from uzibytes/sign2text using MediaPipe landmarks
// and Random Forest-style classification logic translated to TypeScript

import { NormalizedLandmark } from '@mediapipe/hands';

export interface GestureResult {
  gesture: string;
  confidence: number;
  category: 'letter' | 'word' | 'phrase' | 'number';
}

// Landmark indices for MediaPipe hand model
export const LANDMARKS = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_PIP: 6,
  INDEX_DIP: 7,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_PIP: 10,
  MIDDLE_DIP: 11,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_PIP: 14,
  RING_DIP: 15,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_PIP: 18,
  PINKY_DIP: 19,
  PINKY_TIP: 20,
} as const;

// Calculate distance between two landmarks
export const distance = (p1: NormalizedLandmark, p2: NormalizedLandmark): number => {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2) +
    Math.pow(p1.z - p2.z, 2)
  );
};

// Calculate 2D distance (ignoring z)
export const distance2D = (p1: NormalizedLandmark, p2: NormalizedLandmark): number => {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2)
  );
};

// Check if finger is curled (bent)
export const isFingerCurled = (
  landmarks: NormalizedLandmark[],
  tipIdx: number,
  pipIdx: number,
  mcpIdx: number
): boolean => {
  const tip = landmarks[tipIdx];
  const pip = landmarks[pipIdx];
  const mcp = landmarks[mcpIdx];
  
  // Finger is curled if tip is below PIP (in image coordinates, y increases downward)
  return tip.y > pip.y || distance2D(tip, mcp) < distance2D(pip, mcp) * 0.8;
};

// Check if finger is extended
export const isFingerExtended = (
  landmarks: NormalizedLandmark[],
  tipIdx: number,
  pipIdx: number,
  mcpIdx: number
): boolean => {
  const tip = landmarks[tipIdx];
  const pip = landmarks[pipIdx];
  const mcp = landmarks[mcpIdx];
  
  return tip.y < pip.y && pip.y < mcp.y;
};

// Check if thumb is extended (special case due to orientation)
export const isThumbExtended = (landmarks: NormalizedLandmark[]): boolean => {
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const thumbIp = landmarks[LANDMARKS.THUMB_IP];
  const indexMcp = landmarks[LANDMARKS.INDEX_MCP];
  
  // Thumb is extended if it's significantly away from the palm
  return distance2D(thumbTip, indexMcp) > distance2D(thumbIp, indexMcp) * 1.2;
};

// Get finger states
export const getFingerStates = (landmarks: NormalizedLandmark[]) => {
  return {
    thumb: isThumbExtended(landmarks),
    index: isFingerExtended(landmarks, LANDMARKS.INDEX_TIP, LANDMARKS.INDEX_PIP, LANDMARKS.INDEX_MCP),
    middle: isFingerExtended(landmarks, LANDMARKS.MIDDLE_TIP, LANDMARKS.MIDDLE_PIP, LANDMARKS.MIDDLE_MCP),
    ring: isFingerExtended(landmarks, LANDMARKS.RING_TIP, LANDMARKS.RING_PIP, LANDMARKS.RING_MCP),
    pinky: isFingerExtended(landmarks, LANDMARKS.PINKY_TIP, LANDMARKS.PINKY_PIP, LANDMARKS.PINKY_MCP),
  };
};

// Calculate angle between three points
export const angle = (
  p1: NormalizedLandmark,
  p2: NormalizedLandmark,
  p3: NormalizedLandmark
): number => {
  const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
  
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  
  return Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
};

// ASL Alphabet Classification
export const classifyASLLetter = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  // A - Fist with thumb on side
  if (!index && !middle && !ring && !pinky) {
    const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
    const indexMcp = landmarks[LANDMARKS.INDEX_MCP];
    if (thumbTip.x > indexMcp.x) {
      return { gesture: 'A', confidence: 88, category: 'letter' };
    }
  }

  // B - Flat hand, thumb tucked
  if (index && middle && ring && pinky && !thumb) {
    return { gesture: 'B', confidence: 90, category: 'letter' };
  }

  // C - Curved hand
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  const pinkyTip = landmarks[LANDMARKS.PINKY_TIP];
  
  if (distance2D(thumbTip, indexTip) > 0.1 && distance2D(thumbTip, indexTip) < 0.25) {
    const allFingersCurved = !index && !middle && !ring && !pinky;
    if (allFingersCurved && thumb) {
      return { gesture: 'C', confidence: 82, category: 'letter' };
    }
  }

  // D - Index up, others make circle with thumb
  if (index && !middle && !ring && !pinky) {
    const thumbToMiddle = distance2D(thumbTip, landmarks[LANDMARKS.MIDDLE_TIP]);
    if (thumbToMiddle < 0.08) {
      return { gesture: 'D', confidence: 85, category: 'letter' };
    }
  }

  // E - Fingers curled, thumb across
  if (!index && !middle && !ring && !pinky && !thumb) {
    return { gesture: 'E', confidence: 80, category: 'letter' };
  }

  // F - OK sign but rotated
  if (distance2D(thumbTip, indexTip) < 0.05 && middle && ring && pinky) {
    return { gesture: 'F', confidence: 87, category: 'letter' };
  }

  // I - Pinky extended only
  if (!index && !middle && !ring && pinky && !thumb) {
    return { gesture: 'I', confidence: 89, category: 'letter' };
  }

  // L - L shape with thumb and index
  if (thumb && index && !middle && !ring && !pinky) {
    const thumbIndexAngle = angle(thumbTip, landmarks[LANDMARKS.WRIST], indexTip);
    if (thumbIndexAngle > 60 && thumbIndexAngle < 120) {
      return { gesture: 'L', confidence: 91, category: 'letter' };
    }
  }

  // O - All fingers form O shape
  if (distance2D(thumbTip, indexTip) < 0.06 && 
      !middle && !ring && !pinky) {
    return { gesture: 'O', confidence: 84, category: 'letter' };
  }

  // U - Index and middle extended together
  if (index && middle && !ring && !pinky) {
    const indexMiddleDist = distance2D(indexTip, landmarks[LANDMARKS.MIDDLE_TIP]);
    if (indexMiddleDist < 0.05) {
      return { gesture: 'U', confidence: 86, category: 'letter' };
    }
  }

  // V - Victory/Peace sign
  if (index && middle && !ring && !pinky) {
    return { gesture: 'V', confidence: 92, category: 'letter' };
  }

  // W - Three fingers spread
  if (index && middle && ring && !pinky && !thumb) {
    return { gesture: 'W', confidence: 88, category: 'letter' };
  }

  // Y - Thumb and pinky extended (call me / shaka)
  if (thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'Y', confidence: 90, category: 'letter' };
  }

  return null;
};

// Common Phrases/Words Classification
export const classifyPhrase = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const wrist = landmarks[LANDMARKS.WRIST];
  
  // Thumbs Up
  if (thumb && !index && !middle && !ring && !pinky) {
    if (thumbTip.y < wrist.y) {
      return { gesture: 'Thumbs Up', confidence: 94, category: 'phrase' };
    }
    // Thumbs Down
    if (thumbTip.y > wrist.y + 0.1) {
      return { gesture: 'Thumbs Down', confidence: 92, category: 'phrase' };
    }
  }

  // I Love You (ASL)
  if (thumb && index && !middle && !ring && pinky) {
    return { gesture: 'I Love You', confidence: 93, category: 'phrase' };
  }

  // Hello / Wave (open palm)
  if (index && middle && ring && pinky && thumb) {
    return { gesture: 'Hello', confidence: 88, category: 'phrase' };
  }

  // OK Sign
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  if (distance2D(thumbTip, indexTip) < 0.05 && middle && ring && pinky) {
    return { gesture: 'OK', confidence: 91, category: 'phrase' };
  }

  // Stop (open palm facing out)
  if (index && middle && ring && pinky && !thumb) {
    const palmForward = landmarks[LANDMARKS.MIDDLE_MCP].z < landmarks[LANDMARKS.MIDDLE_TIP].z;
    if (palmForward) {
      return { gesture: 'Stop', confidence: 85, category: 'phrase' };
    }
  }

  // Peace
  if (index && middle && !ring && !pinky) {
    return { gesture: 'Peace', confidence: 92, category: 'phrase' };
  }

  // Rock / Metal
  if (index && !middle && !ring && pinky) {
    return { gesture: 'Rock On', confidence: 89, category: 'phrase' };
  }

  // Point
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: 'Point', confidence: 87, category: 'phrase' };
  }

  return null;
};

// Number Classification
export const classifyNumber = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  const extendedCount = [index, middle, ring, pinky].filter(Boolean).length;

  // Zero - Fist
  if (extendedCount === 0 && !thumb) {
    return { gesture: '0', confidence: 82, category: 'number' };
  }

  // One - Index only
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: '1', confidence: 90, category: 'number' };
  }

  // Two - Index and middle
  if (index && middle && !ring && !pinky && !thumb) {
    return { gesture: '2', confidence: 89, category: 'number' };
  }

  // Three - Index, middle, ring
  if (index && middle && ring && !pinky && !thumb) {
    return { gesture: '3', confidence: 87, category: 'number' };
  }

  // Four - All fingers except thumb
  if (index && middle && ring && pinky && !thumb) {
    return { gesture: '4', confidence: 88, category: 'number' };
  }

  // Five - All fingers including thumb
  if (index && middle && ring && pinky && thumb) {
    return { gesture: '5', confidence: 91, category: 'number' };
  }

  return null;
};

// Main classifier that combines all recognition
export const classifyGesture = (landmarks: NormalizedLandmark[]): GestureResult => {
  if (!landmarks || landmarks.length !== 21) {
    return { gesture: 'No Hand', confidence: 0, category: 'phrase' };
  }

  // Try phrase recognition first (highest priority)
  const phrase = classifyPhrase(landmarks);
  if (phrase && phrase.confidence > 85) {
    return phrase;
  }

  // Try letter recognition
  const letter = classifyASLLetter(landmarks);
  if (letter && letter.confidence > 80) {
    return letter;
  }

  // Try number recognition
  const number = classifyNumber(landmarks);
  if (number && number.confidence > 80) {
    return number;
  }

  // Return phrase with lower confidence if found
  if (phrase) {
    return phrase;
  }

  // Return letter with lower confidence if found
  if (letter) {
    return letter;
  }

  // Return number with lower confidence if found
  if (number) {
    return number;
  }

  return { gesture: 'Unknown', confidence: 50, category: 'phrase' };
};

// Gesture stabilization (reduces jitter)
export class GestureStabilizer {
  private history: string[] = [];
  private readonly bufferSize: number;
  private readonly threshold: number;

  constructor(bufferSize: number = 5, threshold: number = 0.6) {
    this.bufferSize = bufferSize;
    this.threshold = threshold;
  }

  addGesture(gesture: string): string {
    this.history.push(gesture);
    if (this.history.length > this.bufferSize) {
      this.history.shift();
    }

    // Count occurrences
    const counts: Record<string, number> = {};
    for (const g of this.history) {
      counts[g] = (counts[g] || 0) + 1;
    }

    // Find most common gesture
    let maxCount = 0;
    let stableGesture = gesture;
    for (const [g, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        stableGesture = g;
      }
    }

    // Only return if it appears enough times
    if (maxCount / this.history.length >= this.threshold) {
      return stableGesture;
    }

    return this.history[this.history.length - 1];
  }

  reset(): void {
    this.history = [];
  }
}
