// ASL Alphabet and common words data
// Using placeholder images - in production, these would be actual sign language images/GIFs

export interface SignData {
  letter: string;
  description: string;
  imageUrl: string;
}

// ASL Alphabet
export const aslAlphabet: SignData[] = [
  { letter: 'A', description: 'Fist with thumb on the side', imageUrl: '/placeholder.svg' },
  { letter: 'B', description: 'Flat hand with fingers together, thumb tucked', imageUrl: '/placeholder.svg' },
  { letter: 'C', description: 'Curved hand like holding a cup', imageUrl: '/placeholder.svg' },
  { letter: 'D', description: 'Index finger up, other fingers and thumb form circle', imageUrl: '/placeholder.svg' },
  { letter: 'E', description: 'Fingers curled into palm, thumb tucked', imageUrl: '/placeholder.svg' },
  { letter: 'F', description: 'Index and thumb form circle, other fingers spread', imageUrl: '/placeholder.svg' },
  { letter: 'G', description: 'Index and thumb parallel, pointing sideways', imageUrl: '/placeholder.svg' },
  { letter: 'H', description: 'Index and middle fingers extended, pointing sideways', imageUrl: '/placeholder.svg' },
  { letter: 'I', description: 'Pinky finger extended up, other fingers closed', imageUrl: '/placeholder.svg' },
  { letter: 'J', description: 'Pinky extended, trace J shape in air', imageUrl: '/placeholder.svg' },
  { letter: 'K', description: 'Index and middle up, thumb between them', imageUrl: '/placeholder.svg' },
  { letter: 'L', description: 'L shape with index and thumb', imageUrl: '/placeholder.svg' },
  { letter: 'M', description: 'Thumb under three fingers', imageUrl: '/placeholder.svg' },
  { letter: 'N', description: 'Thumb under two fingers', imageUrl: '/placeholder.svg' },
  { letter: 'O', description: 'Fingers and thumb form O shape', imageUrl: '/placeholder.svg' },
  { letter: 'P', description: 'Like K but pointing down', imageUrl: '/placeholder.svg' },
  { letter: 'Q', description: 'Like G but pointing down', imageUrl: '/placeholder.svg' },
  { letter: 'R', description: 'Index and middle crossed', imageUrl: '/placeholder.svg' },
  { letter: 'S', description: 'Fist with thumb over fingers', imageUrl: '/placeholder.svg' },
  { letter: 'T', description: 'Thumb between index and middle', imageUrl: '/placeholder.svg' },
  { letter: 'U', description: 'Index and middle together, pointing up', imageUrl: '/placeholder.svg' },
  { letter: 'V', description: 'Index and middle spread in V', imageUrl: '/placeholder.svg' },
  { letter: 'W', description: 'Index, middle, and ring spread', imageUrl: '/placeholder.svg' },
  { letter: 'X', description: 'Index finger hooked', imageUrl: '/placeholder.svg' },
  { letter: 'Y', description: 'Thumb and pinky extended', imageUrl: '/placeholder.svg' },
  { letter: 'Z', description: 'Index finger traces Z in air', imageUrl: '/placeholder.svg' },
];

// Common words and phrases
export const commonSigns: Record<string, SignData[]> = {
  'HELLO': [
    { letter: 'HELLO', description: 'Wave motion at forehead', imageUrl: '/placeholder.svg' }
  ],
  'THANK YOU': [
    { letter: 'THANK YOU', description: 'Hand from chin forward', imageUrl: '/placeholder.svg' }
  ],
  'PLEASE': [
    { letter: 'PLEASE', description: 'Circular motion on chest', imageUrl: '/placeholder.svg' }
  ],
  'YES': [
    { letter: 'YES', description: 'Fist nodding motion', imageUrl: '/placeholder.svg' }
  ],
  'NO': [
    { letter: 'NO', description: 'Index and middle snap to thumb', imageUrl: '/placeholder.svg' }
  ],
  'LOVE': [
    { letter: 'LOVE', description: 'Cross arms over chest', imageUrl: '/placeholder.svg' }
  ],
  'HELP': [
    { letter: 'HELP', description: 'Fist on flat palm, lift up', imageUrl: '/placeholder.svg' }
  ],
};

// Get sign data for text
export const getSignsForText = (text: string): SignData[] => {
  const upperText = text.toUpperCase().trim();
  
  // Check for common words first
  if (commonSigns[upperText]) {
    return commonSigns[upperText];
  }
  
  // Fall back to spelling out letter by letter
  return upperText
    .split('')
    .filter((char) => /[A-Z]/.test(char))
    .map((char) => aslAlphabet.find((sign) => sign.letter === char)!)
    .filter(Boolean);
};

// Simulated gesture recognition results
export const simulatedGestures = [
  'Hello',
  'Thank you',
  'Please',
  'Yes',
  'No',
  'Help',
  'I love you',
  'Good morning',
  'How are you',
  'Nice to meet you',
];
