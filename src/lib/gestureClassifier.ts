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

// Get palm orientation
export const getPalmOrientation = (landmarks: NormalizedLandmark[]) => {
  const wrist = landmarks[LANDMARKS.WRIST];
  const middleMcp = landmarks[LANDMARKS.MIDDLE_MCP];
  const indexMcp = landmarks[LANDMARKS.INDEX_MCP];
  const pinkyMcp = landmarks[LANDMARKS.PINKY_MCP];
  
  // Palm facing camera if MCPs have similar z values
  const palmForward = middleMcp.z < wrist.z;
  const palmUp = middleMcp.y < wrist.y;
  const palmRight = indexMcp.x > pinkyMcp.x;
  
  return { palmForward, palmUp, palmRight };
};

// Check if fingers are touching
export const areFingersTouching = (
  landmarks: NormalizedLandmark[],
  tip1Idx: number,
  tip2Idx: number,
  threshold: number = 0.05
): boolean => {
  return distance2D(landmarks[tip1Idx], landmarks[tip2Idx]) < threshold;
};

// Check thumb position relative to palm
export const getThumbPosition = (landmarks: NormalizedLandmark[]) => {
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexMcp = landmarks[LANDMARKS.INDEX_MCP];
  const middleMcp = landmarks[LANDMARKS.MIDDLE_MCP];
  const wrist = landmarks[LANDMARKS.WRIST];
  
  const acrossPalm = thumbTip.x > middleMcp.x;
  const onSide = Math.abs(thumbTip.x - indexMcp.x) < 0.05;
  const tucked = thumbTip.y > indexMcp.y;
  const extended = distance2D(thumbTip, wrist) > distance2D(indexMcp, wrist);
  
  return { acrossPalm, onSide, tucked, extended };
};

// ASL Alphabet Classification - Complete 26 Letters
export const classifyASLLetter = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  const thumbPos = getThumbPosition(landmarks);
  const palm = getPalmOrientation(landmarks);
  
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  const middleTip = landmarks[LANDMARKS.MIDDLE_TIP];
  const ringTip = landmarks[LANDMARKS.RING_TIP];
  const pinkyTip = landmarks[LANDMARKS.PINKY_TIP];
  const wrist = landmarks[LANDMARKS.WRIST];
  
  const indexPip = landmarks[LANDMARKS.INDEX_PIP];
  const middlePip = landmarks[LANDMARKS.MIDDLE_PIP];
  const indexMcp = landmarks[LANDMARKS.INDEX_MCP];
  
  // A - Fist with thumb on side (thumb beside index, not over fingers)
  if (!index && !middle && !ring && !pinky && thumbPos.onSide) {
    return { gesture: 'A', confidence: 90, category: 'letter' };
  }

  // B - Flat hand with fingers together, thumb tucked across palm
  if (index && middle && ring && pinky && !thumb) {
    const fingersTogether = distance2D(indexTip, middleTip) < 0.06 &&
                            distance2D(middleTip, ringTip) < 0.06 &&
                            distance2D(ringTip, pinkyTip) < 0.06;
    if (fingersTogether && palm.palmForward) {
      return { gesture: 'B', confidence: 92, category: 'letter' };
    }
  }

  // C - Curved hand like holding a cup
  if (!index && !middle && !ring && !pinky && thumb) {
    const curvedGap = distance2D(thumbTip, indexTip);
    if (curvedGap > 0.08 && curvedGap < 0.20) {
      return { gesture: 'C', confidence: 85, category: 'letter' };
    }
  }

  // D - Index up, other fingers and thumb form circle
  if (index && !middle && !ring && !pinky) {
    const thumbToMiddle = distance2D(thumbTip, middleTip);
    if (thumbToMiddle < 0.07) {
      return { gesture: 'D', confidence: 88, category: 'letter' };
    }
  }

  // E - All fingers curled, thumb tucked in front
  if (!index && !middle && !ring && !pinky && !thumb) {
    if (thumbTip.y > indexMcp.y) {
      return { gesture: 'E', confidence: 83, category: 'letter' };
    }
  }

  // F - OK sign with three fingers extended
  if (areFingersTouching(landmarks, LANDMARKS.THUMB_TIP, LANDMARKS.INDEX_TIP, 0.05) && 
      middle && ring && pinky) {
    return { gesture: 'F', confidence: 89, category: 'letter' };
  }

  // G - Index and thumb parallel, pointing sideways
  if (thumb && index && !middle && !ring && !pinky) {
    const horizontal = Math.abs(indexTip.y - thumbTip.y) < 0.08;
    const pointing = indexTip.x !== wrist.x;
    if (horizontal && pointing && !palm.palmForward) {
      return { gesture: 'G', confidence: 84, category: 'letter' };
    }
  }

  // H - Index and middle extended, pointing sideways
  if (index && middle && !ring && !pinky && !thumb) {
    const horizontal = indexTip.y > indexMcp.y - 0.05 && middleTip.y > middlePip.y - 0.05;
    if (horizontal) {
      return { gesture: 'H', confidence: 85, category: 'letter' };
    }
  }

  // I - Pinky extended only
  if (!index && !middle && !ring && pinky && !thumb) {
    return { gesture: 'I', confidence: 91, category: 'letter' };
  }

  // J - Like I but traces J shape (static: pinky extended, hand tilted)
  if (!index && !middle && !ring && pinky && !thumb) {
    if (pinkyTip.x < landmarks[LANDMARKS.PINKY_MCP].x) {
      return { gesture: 'J', confidence: 82, category: 'letter' };
    }
  }

  // K - Index and middle up, thumb between them
  if (index && middle && !ring && !pinky) {
    const thumbBetween = thumbTip.x > indexTip.x && thumbTip.x < middleTip.x;
    if (thumbBetween || distance2D(thumbTip, indexPip) < 0.06) {
      return { gesture: 'K', confidence: 86, category: 'letter' };
    }
  }

  // L - L shape with index and thumb
  if (thumb && index && !middle && !ring && !pinky) {
    const thumbIndexAngle = angle(thumbTip, wrist, indexTip);
    if (thumbIndexAngle > 50 && thumbIndexAngle < 130) {
      return { gesture: 'L', confidence: 93, category: 'letter' };
    }
  }

  // M - Thumb under three fingers
  if (!index && !middle && !ring && !pinky) {
    const thumbUnder = thumbTip.y > indexTip.y && thumbTip.y > middleTip.y && thumbTip.y > ringTip.y;
    if (thumbUnder && thumbPos.tucked) {
      return { gesture: 'M', confidence: 80, category: 'letter' };
    }
  }

  // N - Thumb under two fingers
  if (!index && !middle && !ring && !pinky) {
    const thumbUnderTwo = thumbTip.y > indexTip.y && thumbTip.y > middleTip.y;
    if (thumbUnderTwo && !thumbPos.acrossPalm) {
      return { gesture: 'N', confidence: 79, category: 'letter' };
    }
  }

  // O - All fingertips touching thumb to form O
  if (!index && !middle && !ring && !pinky) {
    const allTouchThumb = distance2D(thumbTip, indexTip) < 0.06 &&
                          distance2D(indexTip, middleTip) < 0.06;
    if (allTouchThumb) {
      return { gesture: 'O', confidence: 86, category: 'letter' };
    }
  }

  // P - Like K but pointing down
  if (index && middle && !ring && !pinky) {
    if (indexTip.y > indexMcp.y && middleTip.y > middlePip.y) {
      return { gesture: 'P', confidence: 83, category: 'letter' };
    }
  }

  // Q - Like G but pointing down
  if (thumb && index && !middle && !ring && !pinky) {
    if (indexTip.y > wrist.y && thumbTip.y > wrist.y) {
      return { gesture: 'Q', confidence: 81, category: 'letter' };
    }
  }

  // R - Index and middle crossed
  if (index && middle && !ring && !pinky) {
    const crossed = Math.abs(indexTip.x - middleTip.x) < 0.03;
    if (crossed) {
      return { gesture: 'R', confidence: 84, category: 'letter' };
    }
  }

  // S - Fist with thumb over fingers
  if (!index && !middle && !ring && !pinky && !thumb) {
    if (thumbTip.x > indexMcp.x && thumbTip.y < indexTip.y) {
      return { gesture: 'S', confidence: 82, category: 'letter' };
    }
  }

  // T - Thumb between index and middle (fist)
  if (!index && !middle && !ring && !pinky) {
    const thumbBetween = thumbTip.y < indexTip.y && 
                         distance2D(thumbTip, indexPip) < 0.05;
    if (thumbBetween) {
      return { gesture: 'T', confidence: 80, category: 'letter' };
    }
  }

  // U - Index and middle together, pointing up
  if (index && middle && !ring && !pinky) {
    const together = distance2D(indexTip, middleTip) < 0.04;
    const pointingUp = indexTip.y < indexPip.y && middleTip.y < middlePip.y;
    if (together && pointingUp) {
      return { gesture: 'U', confidence: 88, category: 'letter' };
    }
  }

  // V - Index and middle spread in V
  if (index && middle && !ring && !pinky) {
    const spread = distance2D(indexTip, middleTip) > 0.06;
    if (spread) {
      return { gesture: 'V', confidence: 94, category: 'letter' };
    }
  }

  // W - Index, middle, and ring spread
  if (index && middle && ring && !pinky && !thumb) {
    return { gesture: 'W', confidence: 90, category: 'letter' };
  }

  // X - Index finger hooked/bent
  if (!middle && !ring && !pinky && !thumb) {
    const indexHooked = indexTip.y > indexPip.y && indexPip.y < indexMcp.y;
    if (indexHooked) {
      return { gesture: 'X', confidence: 83, category: 'letter' };
    }
  }

  // Y - Thumb and pinky extended (shaka)
  if (thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'Y', confidence: 92, category: 'letter' };
  }

  // Z - Index finger traces Z (static: index pointing)
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: 'Z', confidence: 78, category: 'letter' };
  }

  return null;
};

// Common Phrases/Words Classification - Enhanced with more gestures
export const classifyPhrase = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  const middleTip = landmarks[LANDMARKS.MIDDLE_TIP];
  const pinkyTip = landmarks[LANDMARKS.PINKY_TIP];
  const wrist = landmarks[LANDMARKS.WRIST];
  const indexMcp = landmarks[LANDMARKS.INDEX_MCP];
  
  // Thumbs Up - thumb extended upward, fist closed
  if (thumb && !index && !middle && !ring && !pinky) {
    if (thumbTip.y < wrist.y - 0.05) {
      return { gesture: 'Thumbs Up', confidence: 94, category: 'phrase' };
    }
    // Thumbs Down - thumb extended downward
    if (thumbTip.y > wrist.y + 0.08) {
      return { gesture: 'Thumbs Down', confidence: 92, category: 'phrase' };
    }
    // Call Me - thumb and pinky near ear position (Y shape detected as phone)
    if (Math.abs(thumbTip.x - pinkyTip.x) > 0.15) {
      return { gesture: 'Call Me', confidence: 85, category: 'phrase' };
    }
  }

  // I Love You (ASL) - thumb, index, and pinky extended
  if (thumb && index && !middle && !ring && pinky) {
    return { gesture: 'I Love You', confidence: 95, category: 'phrase' };
  }

  // Hello / Wave (open palm) - all fingers extended
  if (index && middle && ring && pinky && thumb) {
    const palmForward = landmarks[LANDMARKS.MIDDLE_MCP].z < landmarks[LANDMARKS.MIDDLE_TIP].z;
    if (palmForward) {
      return { gesture: 'Hello', confidence: 90, category: 'phrase' };
    }
    // Goodbye - similar but different orientation
    return { gesture: 'Goodbye', confidence: 85, category: 'phrase' };
  }

  // OK Sign - thumb and index touch, others extended
  if (distance2D(thumbTip, indexTip) < 0.05 && middle && ring && pinky) {
    return { gesture: 'OK', confidence: 93, category: 'phrase' };
  }

  // Stop (open palm facing out, thumb tucked)
  if (index && middle && ring && pinky && !thumb) {
    const palmForward = landmarks[LANDMARKS.MIDDLE_MCP].z < landmarks[LANDMARKS.MIDDLE_TIP].z;
    if (palmForward) {
      return { gesture: 'Stop', confidence: 88, category: 'phrase' };
    }
    // Wait - similar with wiggling implied
    return { gesture: 'Wait', confidence: 82, category: 'phrase' };
  }

  // Peace / Victory - index and middle spread
  if (index && middle && !ring && !pinky && !thumb) {
    const spread = distance2D(indexTip, middleTip) > 0.05;
    if (spread) {
      return { gesture: 'Peace', confidence: 94, category: 'phrase' };
    }
  }

  // Rock On / Metal - index and pinky extended
  if (index && !middle && !ring && pinky && !thumb) {
    return { gesture: 'Rock On', confidence: 91, category: 'phrase' };
  }

  // Point - index only
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: 'Point', confidence: 89, category: 'phrase' };
  }

  // Fist / Power - all fingers closed
  if (!index && !middle && !ring && !pinky && !thumb) {
    if (thumbTip.x > indexMcp.x) {
      return { gesture: 'Fist', confidence: 85, category: 'phrase' };
    }
  }

  // Shaka / Hang Loose - thumb and pinky extended
  if (thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'Shaka', confidence: 90, category: 'phrase' };
  }

  // Three fingers up - could be "W" or number 3
  if (index && middle && ring && !pinky && !thumb) {
    return { gesture: 'Three', confidence: 86, category: 'phrase' };
  }

  // Crossed fingers - luck
  if (index && middle && !ring && !pinky) {
    const crossed = Math.abs(indexTip.x - middleTip.x) < 0.03;
    if (crossed && indexTip.y < middleTip.y) {
      return { gesture: 'Good Luck', confidence: 83, category: 'phrase' };
    }
  }

  return null;
};

// Number Classification - Enhanced with more numbers
export const classifyNumber = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;
  
  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  const middleTip = landmarks[LANDMARKS.MIDDLE_TIP];
  const ringTip = landmarks[LANDMARKS.RING_TIP];
  const pinkyTip = landmarks[LANDMARKS.PINKY_TIP];

  // Zero - O shape (fingers and thumb form circle)
  if (!index && !middle && !ring && !pinky) {
    if (distance2D(thumbTip, indexTip) < 0.08) {
      return { gesture: '0', confidence: 84, category: 'number' };
    }
  }

  // One - Index only
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: '1', confidence: 92, category: 'number' };
  }

  // Two - Index and middle extended (V shape)
  if (index && middle && !ring && !pinky && !thumb) {
    return { gesture: '2', confidence: 90, category: 'number' };
  }

  // Three - Thumb, index, middle extended (ASL style)
  if (thumb && index && middle && !ring && !pinky) {
    return { gesture: '3', confidence: 88, category: 'number' };
  }

  // Four - All fingers except thumb
  if (index && middle && ring && pinky && !thumb) {
    return { gesture: '4', confidence: 89, category: 'number' };
  }

  // Five - All fingers extended
  if (index && middle && ring && pinky && thumb) {
    return { gesture: '5', confidence: 93, category: 'number' };
  }

  // Six - Thumb touches pinky, W shape visible
  if (index && middle && ring && !pinky && thumb) {
    if (distance2D(thumbTip, pinkyTip) < 0.06) {
      return { gesture: '6', confidence: 85, category: 'number' };
    }
  }

  // Seven - Thumb touches ring finger
  if (index && middle && !ring && pinky && thumb) {
    if (distance2D(thumbTip, ringTip) < 0.06) {
      return { gesture: '7', confidence: 84, category: 'number' };
    }
  }

  // Eight - Thumb touches middle finger
  if (index && !middle && ring && pinky && thumb) {
    if (distance2D(thumbTip, middleTip) < 0.06) {
      return { gesture: '8', confidence: 83, category: 'number' };
    }
  }

  // Nine - Thumb touches index finger (like F but different context)
  if (!index && middle && ring && pinky && thumb) {
    if (distance2D(thumbTip, indexTip) < 0.06) {
      return { gesture: '9', confidence: 84, category: 'number' };
    }
  }

  // Ten - Thumb up shaking (static: just thumb extended)
  if (thumb && !index && !middle && !ring && !pinky) {
    if (thumbTip.y < landmarks[LANDMARKS.THUMB_MCP].y) {
      return { gesture: '10', confidence: 82, category: 'number' };
    }
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

// Enhanced Gesture stabilization with confidence tracking
export class GestureStabilizer {
  private history: Array<{ gesture: string; confidence: number }> = [];
  private readonly bufferSize: number;
  private readonly threshold: number;
  private lastStableGesture: string = '';
  private stableCount: number = 0;

  constructor(bufferSize: number = 8, threshold: number = 0.5) {
    this.bufferSize = bufferSize;
    this.threshold = threshold;
  }

  addGesture(gesture: string, confidence: number = 80): { gesture: string; confidence: number; isStable: boolean } {
    this.history.push({ gesture, confidence });
    if (this.history.length > this.bufferSize) {
      this.history.shift();
    }

    // Count occurrences with weighted confidence
    const counts: Record<string, { count: number; totalConfidence: number }> = {};
    for (const entry of this.history) {
      if (!counts[entry.gesture]) {
        counts[entry.gesture] = { count: 0, totalConfidence: 0 };
      }
      counts[entry.gesture].count++;
      counts[entry.gesture].totalConfidence += entry.confidence;
    }

    // Find most common gesture with highest average confidence
    let maxScore = 0;
    let stableGesture = gesture;
    let avgConfidence = confidence;

    for (const [g, data] of Object.entries(counts)) {
      const avgConf = data.totalConfidence / data.count;
      const score = (data.count / this.history.length) * avgConf;
      if (score > maxScore) {
        maxScore = score;
        stableGesture = g;
        avgConfidence = avgConf;
      }
    }

    // Track stability
    const isStable = counts[stableGesture]?.count >= this.bufferSize * this.threshold;
    
    if (stableGesture === this.lastStableGesture) {
      this.stableCount++;
    } else {
      this.stableCount = 1;
      this.lastStableGesture = stableGesture;
    }

    return {
      gesture: isStable ? stableGesture : this.history[this.history.length - 1].gesture,
      confidence: Math.round(avgConfidence),
      isStable: this.stableCount >= 3
    };
  }

  getStabilityScore(): number {
    if (this.history.length === 0) return 0;
    
    const counts: Record<string, number> = {};
    for (const entry of this.history) {
      counts[entry.gesture] = (counts[entry.gesture] || 0) + 1;
    }
    
    const maxCount = Math.max(...Object.values(counts));
    return Math.round((maxCount / this.history.length) * 100);
  }

  reset(): void {
    this.history = [];
    this.lastStableGesture = '';
    this.stableCount = 0;
  }
}
