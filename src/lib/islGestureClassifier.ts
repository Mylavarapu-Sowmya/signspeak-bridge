// ISL (Indian Sign Language) Gesture Classifier
// Based on ISL handshape patterns - shares many static gestures with ASL
// but has distinct differences in orientation, movement, and cultural gestures

import { NormalizedLandmark } from '@mediapipe/hands';
import {
  GestureResult,
  LANDMARKS,
  distance2D,
  isFingerExtended,
  isThumbExtended,
  getFingerStates,
  angle,
  getPalmOrientation,
  areFingersTouching,
  getThumbPosition,
} from './gestureClassifier';

// ISL Letter Classification
// ISL alphabet is largely similar to ASL fingerspelling but with orientation differences
export const classifyISLLetter = (landmarks: NormalizedLandmark[]): GestureResult | null => {
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

  // A - Fist with thumb pointing up (ISL: thumb more prominently up, palm outward)
  if (!index && !middle && !ring && !pinky && thumb) {
    if (thumbTip.y < wrist.y - 0.03 && thumbPos.extended) {
      return { gesture: 'A', confidence: 88, category: 'letter' };
    }
  }

  // B - Flat hand, palm forward, fingers together
  if (index && middle && ring && pinky && !thumb) {
    const together = distance2D(indexTip, middleTip) < 0.06 &&
                     distance2D(middleTip, ringTip) < 0.06 &&
                     distance2D(ringTip, pinkyTip) < 0.06;
    if (together) {
      return { gesture: 'B', confidence: 91, category: 'letter' };
    }
  }

  // C - Curved C shape
  if (!index && !middle && !ring && !pinky && thumb) {
    const gap = distance2D(thumbTip, indexTip);
    if (gap > 0.08 && gap < 0.22) {
      return { gesture: 'C', confidence: 84, category: 'letter' };
    }
  }

  // D - Index up, circle below
  if (index && !middle && !ring && !pinky) {
    const thumbToMiddle = distance2D(thumbTip, middleTip);
    if (thumbToMiddle < 0.07) {
      return { gesture: 'D', confidence: 87, category: 'letter' };
    }
  }

  // E - All curled, thumb against
  if (!index && !middle && !ring && !pinky && !thumb) {
    if (thumbTip.y > indexMcp.y) {
      return { gesture: 'E', confidence: 82, category: 'letter' };
    }
  }

  // F - Circle + 3 up
  if (areFingersTouching(landmarks, LANDMARKS.THUMB_TIP, LANDMARKS.INDEX_TIP, 0.05) &&
      middle && ring && pinky) {
    return { gesture: 'F', confidence: 88, category: 'letter' };
  }

  // G - Horizontal pinch
  if (thumb && index && !middle && !ring && !pinky) {
    const horizontal = Math.abs(indexTip.y - thumbTip.y) < 0.08;
    if (horizontal && !palm.palmForward) {
      return { gesture: 'G', confidence: 83, category: 'letter' };
    }
  }

  // H - Two fingers horizontal
  if (index && middle && !ring && !pinky && !thumb) {
    const horizontal = indexTip.y > indexMcp.y - 0.05;
    if (horizontal) {
      return { gesture: 'H', confidence: 84, category: 'letter' };
    }
  }

  // I - Pinky up only
  if (!index && !middle && !ring && pinky && !thumb) {
    return { gesture: 'I', confidence: 90, category: 'letter' };
  }

  // J - Pinky traces J (static: pinky with tilt)
  if (!index && !middle && !ring && pinky && !thumb) {
    if (pinkyTip.x < landmarks[LANDMARKS.PINKY_MCP].x) {
      return { gesture: 'J', confidence: 81, category: 'letter' };
    }
  }

  // K - V with thumb touch
  if (index && middle && !ring && !pinky) {
    const thumbBetween = distance2D(thumbTip, indexPip) < 0.06;
    if (thumbBetween) {
      return { gesture: 'K', confidence: 85, category: 'letter' };
    }
  }

  // L - L shape forward
  if (thumb && index && !middle && !ring && !pinky) {
    const thumbIndexAngle = angle(thumbTip, wrist, indexTip);
    if (thumbIndexAngle > 50 && thumbIndexAngle < 130) {
      return { gesture: 'L', confidence: 92, category: 'letter' };
    }
  }

  // M - Three over thumb
  if (!index && !middle && !ring && !pinky) {
    const thumbUnder = thumbTip.y > indexTip.y && thumbTip.y > middleTip.y && thumbTip.y > ringTip.y;
    if (thumbUnder && thumbPos.tucked) {
      return { gesture: 'M', confidence: 79, category: 'letter' };
    }
  }

  // N - Two over thumb
  if (!index && !middle && !ring && !pinky) {
    const thumbUnderTwo = thumbTip.y > indexTip.y && thumbTip.y > middleTip.y;
    if (thumbUnderTwo && !thumbPos.acrossPalm) {
      return { gesture: 'N', confidence: 78, category: 'letter' };
    }
  }

  // O - O circle
  if (!index && !middle && !ring && !pinky) {
    const allTouch = distance2D(thumbTip, indexTip) < 0.06 &&
                     distance2D(indexTip, middleTip) < 0.06;
    if (allTouch) {
      return { gesture: 'O', confidence: 85, category: 'letter' };
    }
  }

  // P - Inverted K (pointing down)
  if (index && middle && !ring && !pinky) {
    if (indexTip.y > indexMcp.y && middleTip.y > middlePip.y) {
      return { gesture: 'P', confidence: 82, category: 'letter' };
    }
  }

  // Q - Downward pinch
  if (thumb && index && !middle && !ring && !pinky) {
    if (indexTip.y > wrist.y && thumbTip.y > wrist.y) {
      return { gesture: 'Q', confidence: 80, category: 'letter' };
    }
  }

  // R - Crossed fingers up
  if (index && middle && !ring && !pinky) {
    const crossed = Math.abs(indexTip.x - middleTip.x) < 0.03;
    if (crossed) {
      return { gesture: 'R', confidence: 83, category: 'letter' };
    }
  }

  // S - Thumb-over fist
  if (!index && !middle && !ring && !pinky && !thumb) {
    if (thumbTip.x > indexMcp.x && thumbTip.y < indexTip.y) {
      return { gesture: 'S', confidence: 81, category: 'letter' };
    }
  }

  // T - Thumb between fingers
  if (!index && !middle && !ring && !pinky) {
    const thumbBetween = thumbTip.y < indexTip.y && distance2D(thumbTip, indexPip) < 0.05;
    if (thumbBetween) {
      return { gesture: 'T', confidence: 79, category: 'letter' };
    }
  }

  // U - Two fingers up together
  if (index && middle && !ring && !pinky) {
    const together = distance2D(indexTip, middleTip) < 0.04;
    const up = indexTip.y < indexPip.y && middleTip.y < middlePip.y;
    if (together && up) {
      return { gesture: 'U', confidence: 87, category: 'letter' };
    }
  }

  // V - V spread forward
  if (index && middle && !ring && !pinky) {
    const spread = distance2D(indexTip, middleTip) > 0.06;
    if (spread) {
      return { gesture: 'V', confidence: 93, category: 'letter' };
    }
  }

  // W - Three spread forward
  if (index && middle && ring && !pinky && !thumb) {
    return { gesture: 'W', confidence: 89, category: 'letter' };
  }

  // X - Hooked index
  if (!middle && !ring && !pinky && !thumb) {
    const hooked = indexTip.y > indexPip.y && indexPip.y < indexMcp.y;
    if (hooked) {
      return { gesture: 'X', confidence: 82, category: 'letter' };
    }
  }

  // Y - Y/shaka shape
  if (thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'Y', confidence: 91, category: 'letter' };
  }

  // Z - Index traces Z (static)
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: 'Z', confidence: 77, category: 'letter' };
  }

  return null;
};

// ISL Phrase Classification - includes Indian-specific gestures
export const classifyISLPhrase = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;

  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  const middleTip = landmarks[LANDMARKS.MIDDLE_TIP];
  const pinkyTip = landmarks[LANDMARKS.PINKY_TIP];
  const wrist = landmarks[LANDMARKS.WRIST];
  const indexMcp = landmarks[LANDMARKS.INDEX_MCP];

  // Namaste / Hello - all fingers extended, palms together implied
  if (index && middle && ring && pinky && thumb) {
    const palmForward = landmarks[LANDMARKS.MIDDLE_MCP].z < landmarks[LANDMARKS.MIDDLE_TIP].z;
    const fingersSpread = distance2D(landmarks[LANDMARKS.INDEX_TIP], pinkyTip) > 0.12;
    if (palmForward && fingersSpread) {
      return { gesture: 'Namaste', confidence: 93, category: 'phrase' };
    }
    // Good Morning
    if (palmForward && thumbTip.y < wrist.y - 0.15) {
      return { gesture: 'Good Morning', confidence: 87, category: 'phrase' };
    }
    // Good Night
    if (!palmForward && landmarks[LANDMARKS.MIDDLE_TIP].y > landmarks[LANDMARKS.MIDDLE_MCP].y) {
      return { gesture: 'Good Night', confidence: 85, category: 'phrase' };
    }
    if (palmForward) {
      return { gesture: 'Namaste', confidence: 91, category: 'phrase' };
    }
    return { gesture: 'Goodbye', confidence: 84, category: 'phrase' };
  }

  // Thumbs Up
  if (thumb && !index && !middle && !ring && !pinky) {
    if (thumbTip.y < wrist.y - 0.05) {
      return { gesture: 'Thumbs Up', confidence: 93, category: 'phrase' };
    }
    if (thumbTip.y > wrist.y + 0.08) {
      return { gesture: 'Thumbs Down', confidence: 91, category: 'phrase' };
    }
  }

  // I Love You
  if (thumb && index && !middle && !ring && pinky) {
    return { gesture: 'I Love You', confidence: 94, category: 'phrase' };
  }

  // OK / Theek Hai
  if (distance2D(thumbTip, indexTip) < 0.05 && middle && ring && pinky) {
    return { gesture: 'Theek Hai', confidence: 92, category: 'phrase' };
  }

  // Stop
  if (index && middle && ring && pinky && !thumb) {
    const palmForward = landmarks[LANDMARKS.MIDDLE_MCP].z < landmarks[LANDMARKS.MIDDLE_TIP].z;
    if (palmForward) {
      return { gesture: 'Stop', confidence: 87, category: 'phrase' };
    }
    return { gesture: 'Wait', confidence: 81, category: 'phrase' };
  }

  // Peace
  if (index && middle && !ring && !pinky && !thumb) {
    const spread = distance2D(indexTip, middleTip) > 0.05;
    if (spread) {
      return { gesture: 'Peace', confidence: 93, category: 'phrase' };
    }
  }

  // Rock On
  if (index && !middle && !ring && pinky && !thumb) {
    return { gesture: 'Rock On', confidence: 90, category: 'phrase' };
  }

  // Point
  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: 'Point', confidence: 88, category: 'phrase' };
  }

  // Fist
  if (!index && !middle && !ring && !pinky && !thumb) {
    if (thumbTip.x > indexMcp.x) {
      return { gesture: 'Fist', confidence: 84, category: 'phrase' };
    }
  }

  // Shaka
  if (thumb && !index && !middle && !ring && pinky) {
    return { gesture: 'Shaka', confidence: 89, category: 'phrase' };
  }

  return null;
};

// ISL Number Classification (same hand shapes as ASL numbers)
export const classifyISLNumber = (landmarks: NormalizedLandmark[]): GestureResult | null => {
  const fingers = getFingerStates(landmarks);
  const { thumb, index, middle, ring, pinky } = fingers;

  const thumbTip = landmarks[LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[LANDMARKS.INDEX_TIP];
  const middleTip = landmarks[LANDMARKS.MIDDLE_TIP];
  const ringTip = landmarks[LANDMARKS.RING_TIP];
  const pinkyTip = landmarks[LANDMARKS.PINKY_TIP];

  if (!index && !middle && !ring && !pinky) {
    if (distance2D(thumbTip, indexTip) < 0.08) {
      return { gesture: '0', confidence: 83, category: 'number' };
    }
  }

  if (index && !middle && !ring && !pinky && !thumb) {
    return { gesture: '1', confidence: 91, category: 'number' };
  }

  if (index && middle && !ring && !pinky && !thumb) {
    return { gesture: '2', confidence: 89, category: 'number' };
  }

  if (thumb && index && middle && !ring && !pinky) {
    return { gesture: '3', confidence: 87, category: 'number' };
  }

  if (index && middle && ring && pinky && !thumb) {
    const thumbTucked = distance2D(thumbTip, landmarks[LANDMARKS.INDEX_MCP]) < 0.08;
    if (thumbTucked) {
      return { gesture: '4', confidence: 90, category: 'number' };
    }
    return { gesture: '4', confidence: 88, category: 'number' };
  }

  if (index && middle && ring && pinky && thumb) {
    const allSpread = distance2D(thumbTip, pinkyTip) > 0.12;
    if (allSpread) {
      return { gesture: '5', confidence: 94, category: 'number' };
    }
    return { gesture: '5', confidence: 92, category: 'number' };
  }

  if (index && middle && ring && !pinky && thumb) {
    if (distance2D(thumbTip, pinkyTip) < 0.06) {
      return { gesture: '6', confidence: 84, category: 'number' };
    }
  }

  if (index && middle && !ring && pinky && thumb) {
    if (distance2D(thumbTip, ringTip) < 0.06) {
      return { gesture: '7', confidence: 83, category: 'number' };
    }
  }

  if (index && !middle && ring && pinky && thumb) {
    if (distance2D(thumbTip, middleTip) < 0.06) {
      return { gesture: '8', confidence: 82, category: 'number' };
    }
  }

  if (!index && middle && ring && pinky && thumb) {
    if (distance2D(thumbTip, indexTip) < 0.06) {
      return { gesture: '9', confidence: 83, category: 'number' };
    }
  }

  if (thumb && !index && !middle && !ring && !pinky) {
    if (thumbTip.y < landmarks[LANDMARKS.THUMB_MCP].y) {
      return { gesture: '10', confidence: 81, category: 'number' };
    }
  }

  return null;
};

// Main ISL classifier
export const classifyISLGesture = (landmarks: NormalizedLandmark[]): GestureResult => {
  if (!landmarks || landmarks.length !== 21) {
    return { gesture: 'No Hand', confidence: 0, category: 'phrase' };
  }

  const phrase = classifyISLPhrase(landmarks);
  if (phrase && phrase.confidence > 85) return phrase;

  const letter = classifyISLLetter(landmarks);
  if (letter && letter.confidence > 80) return letter;

  const number = classifyISLNumber(landmarks);
  if (number && number.confidence > 80) return number;

  if (phrase) return phrase;
  if (letter) return letter;
  if (number) return number;

  return { gesture: 'Unknown', confidence: 50, category: 'phrase' };
};
