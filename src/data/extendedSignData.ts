// Extended ASL Dataset - Based on Kaggle ASL datasets and common sign language patterns
// Includes comprehensive phrases, words, numbers, and expressions

export interface ExtendedSignData {
  sign: string;
  description: string;
  category: 'letter' | 'number' | 'phrase' | 'word' | 'expression';
  handShape: string;
  movement?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Extended Phrases and Common Expressions
export const extendedPhrases: ExtendedSignData[] = [
  // Greetings
  { sign: 'Hello', description: 'Wave motion at forehead', category: 'phrase', handShape: 'Open palm', movement: 'Wave away from forehead', difficulty: 'beginner' },
  { sign: 'Goodbye', description: 'Open palm wave', category: 'phrase', handShape: 'Open palm', movement: 'Wave back and forth', difficulty: 'beginner' },
  { sign: 'Good Morning', description: 'Good + morning signs combined', category: 'phrase', handShape: 'Flat hand to C shape', movement: 'Rising motion', difficulty: 'intermediate' },
  { sign: 'Good Night', description: 'Good + night signs combined', category: 'phrase', handShape: 'Flat hand closing', movement: 'Descending motion', difficulty: 'intermediate' },
  { sign: 'How Are You', description: 'How + you combined', category: 'phrase', handShape: 'Bent hands to pointing', movement: 'Outward motion', difficulty: 'beginner' },
  { sign: 'Nice To Meet You', description: 'Pleasure meeting gesture', category: 'phrase', handShape: 'Index fingers', movement: 'Coming together', difficulty: 'intermediate' },
  
  // Common Responses
  { sign: 'Thank You', description: 'Flat hand from chin forward', category: 'phrase', handShape: 'Flat hand', movement: 'Forward from chin', difficulty: 'beginner' },
  { sign: 'Please', description: 'Circular motion on chest', category: 'phrase', handShape: 'Flat hand', movement: 'Circular on chest', difficulty: 'beginner' },
  { sign: 'Sorry', description: 'Fist circles on chest', category: 'phrase', handShape: 'Fist', movement: 'Circular on chest', difficulty: 'beginner' },
  { sign: 'Excuse Me', description: 'Fingers brush across palm', category: 'phrase', handShape: 'Bent fingers', movement: 'Brushing motion', difficulty: 'beginner' },
  { sign: 'You\'re Welcome', description: 'Hand moves down from chin', category: 'phrase', handShape: 'Flat hand', movement: 'Downward arc', difficulty: 'beginner' },
  
  // Yes/No Responses
  { sign: 'Yes', description: 'Fist nodding motion', category: 'phrase', handShape: 'Fist', movement: 'Nodding up and down', difficulty: 'beginner' },
  { sign: 'No', description: 'Index and middle snap to thumb', category: 'phrase', handShape: 'Two fingers to thumb', movement: 'Snapping closed', difficulty: 'beginner' },
  { sign: 'Maybe', description: 'Alternating hands up and down', category: 'phrase', handShape: 'Flat hands', movement: 'Alternating up/down', difficulty: 'beginner' },
  { sign: 'I Don\'t Know', description: 'Fingers tap forehead, then open', category: 'phrase', handShape: 'Fingers together', movement: 'Tap and open outward', difficulty: 'intermediate' },
  
  // Questions
  { sign: 'What', description: 'Open palms, eyebrows furrowed', category: 'phrase', handShape: 'Open palms down', movement: 'Side to side', difficulty: 'beginner' },
  { sign: 'Where', description: 'Index finger waves side to side', category: 'phrase', handShape: 'Index pointing', movement: 'Waving motion', difficulty: 'beginner' },
  { sign: 'When', description: 'Index circles then points', category: 'phrase', handShape: 'Index pointing', movement: 'Circular then point', difficulty: 'intermediate' },
  { sign: 'Why', description: 'Fingers on forehead, pull to Y', category: 'phrase', handShape: 'Fingers to Y shape', movement: 'Pull from forehead', difficulty: 'intermediate' },
  { sign: 'Who', description: 'Index circles around mouth', category: 'phrase', handShape: 'Index pointing', movement: 'Circular at mouth', difficulty: 'beginner' },
  { sign: 'How', description: 'Knuckles together, roll open', category: 'phrase', handShape: 'Fists to open', movement: 'Rolling outward', difficulty: 'beginner' },
  
  // Emotions
  { sign: 'Happy', description: 'Hands brush up on chest', category: 'expression', handShape: 'Flat hands', movement: 'Upward brushing', difficulty: 'beginner' },
  { sign: 'Sad', description: 'Hands move down face', category: 'expression', handShape: 'Open hands', movement: 'Downward on face', difficulty: 'beginner' },
  { sign: 'Angry', description: 'Claw hands at face, pull away', category: 'expression', handShape: 'Claw shape', movement: 'Pull from face', difficulty: 'beginner' },
  { sign: 'Scared', description: 'Hands shake near chest', category: 'expression', handShape: 'Open hands', movement: 'Shaking/trembling', difficulty: 'beginner' },
  { sign: 'Excited', description: 'Fingers flutter on chest alternating', category: 'expression', handShape: 'Bent fingers', movement: 'Alternating flutter', difficulty: 'intermediate' },
  { sign: 'Tired', description: 'Bent hands drop from chest', category: 'expression', handShape: 'Bent hands', movement: 'Dropping motion', difficulty: 'beginner' },
  { sign: 'Love', description: 'Cross arms over chest', category: 'expression', handShape: 'Crossed arms', movement: 'Embrace motion', difficulty: 'beginner' },
  { sign: 'I Love You', description: 'Thumb, index, and pinky extended', category: 'expression', handShape: 'ILY handshape', movement: 'Static hold', difficulty: 'beginner' },
  
  // Common Words
  { sign: 'Help', description: 'Fist on flat palm, lift up', category: 'word', handShape: 'Fist on palm', movement: 'Lifting upward', difficulty: 'beginner' },
  { sign: 'Stop', description: 'Flat hand chops into palm', category: 'word', handShape: 'Flat hands', movement: 'Chopping down', difficulty: 'beginner' },
  { sign: 'Go', description: 'Index fingers point and move forward', category: 'word', handShape: 'Index fingers', movement: 'Forward motion', difficulty: 'beginner' },
  { sign: 'Come', description: 'Index fingers beckon toward self', category: 'word', handShape: 'Index fingers', movement: 'Beckoning inward', difficulty: 'beginner' },
  { sign: 'Wait', description: 'Wiggling fingers held up', category: 'word', handShape: 'Open hands', movement: 'Wiggling fingers', difficulty: 'beginner' },
  { sign: 'Eat', description: 'Fingers to mouth repeatedly', category: 'word', handShape: 'Flat O shape', movement: 'To mouth', difficulty: 'beginner' },
  { sign: 'Drink', description: 'C hand tips to mouth', category: 'word', handShape: 'C shape', movement: 'Tipping to mouth', difficulty: 'beginner' },
  { sign: 'Sleep', description: 'Hand closes over face downward', category: 'word', handShape: 'Open to closed', movement: 'Down over face', difficulty: 'beginner' },
  { sign: 'Work', description: 'Fists tap together', category: 'word', handShape: 'Fists', movement: 'Tapping together', difficulty: 'beginner' },
  { sign: 'Play', description: 'Y hands shake', category: 'word', handShape: 'Y shape', movement: 'Shaking', difficulty: 'beginner' },
  { sign: 'Learn', description: 'Fingers pull from palm to forehead', category: 'word', handShape: 'Flat to closed', movement: 'Palm to forehead', difficulty: 'intermediate' },
  { sign: 'Teach', description: 'Flat O hands move forward from forehead', category: 'word', handShape: 'Flat O', movement: 'Forward from temples', difficulty: 'intermediate' },
  { sign: 'Understand', description: 'Index flicks up near forehead', category: 'word', handShape: 'Fist to index', movement: 'Flick upward', difficulty: 'beginner' },
  
  // Family
  { sign: 'Mother', description: 'Thumb on chin, open hand', category: 'word', handShape: 'Open hand', movement: 'Thumb taps chin', difficulty: 'beginner' },
  { sign: 'Father', description: 'Thumb on forehead, open hand', category: 'word', handShape: 'Open hand', movement: 'Thumb taps forehead', difficulty: 'beginner' },
  { sign: 'Sister', description: 'A hand from chin + flat hands together', category: 'word', handShape: 'A to flat', movement: 'Chin then together', difficulty: 'intermediate' },
  { sign: 'Brother', description: 'A hand from forehead + flat hands together', category: 'word', handShape: 'A to flat', movement: 'Forehead then together', difficulty: 'intermediate' },
  { sign: 'Baby', description: 'Arms cradle and rock', category: 'word', handShape: 'Cradling arms', movement: 'Rocking motion', difficulty: 'beginner' },
  { sign: 'Friend', description: 'Index fingers hook together', category: 'word', handShape: 'Hooked indexes', movement: 'Hook and reverse', difficulty: 'beginner' },
  
  // Time
  { sign: 'Today', description: 'Y hands drop in front of body', category: 'word', handShape: 'Y shape', movement: 'Dropping down', difficulty: 'beginner' },
  { sign: 'Tomorrow', description: 'Thumb on cheek moves forward', category: 'word', handShape: 'A shape', movement: 'Forward arc', difficulty: 'beginner' },
  { sign: 'Yesterday', description: 'Thumb touches cheek then moves back', category: 'word', handShape: 'A to Y shape', movement: 'Backward motion', difficulty: 'beginner' },
  { sign: 'Now', description: 'Y hands drop sharply', category: 'word', handShape: 'Y shape', movement: 'Sharp drop', difficulty: 'beginner' },
  { sign: 'Later', description: 'L hand rotates forward', category: 'word', handShape: 'L shape', movement: 'Forward rotation', difficulty: 'beginner' },
  
  // Common Gestures
  { sign: 'OK', description: 'Thumb and index form circle', category: 'phrase', handShape: 'OK shape', movement: 'Static or slight movement', difficulty: 'beginner' },
  { sign: 'Thumbs Up', description: 'Fist with thumb extended up', category: 'phrase', handShape: 'Thumbs up', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Thumbs Down', description: 'Fist with thumb extended down', category: 'phrase', handShape: 'Thumbs down', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Peace', description: 'Index and middle fingers form V', category: 'phrase', handShape: 'V shape', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Rock On', description: 'Index and pinky extended', category: 'phrase', handShape: 'Rock shape', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Call Me', description: 'Thumb and pinky extended, shake at ear', category: 'phrase', handShape: 'Y shape', movement: 'Shake at ear', difficulty: 'beginner' },
  { sign: 'Point', description: 'Index finger extended forward', category: 'phrase', handShape: 'Index pointing', movement: 'Pointing motion', difficulty: 'beginner' },
];

// Numbers 0-20
export const extendedNumbers: ExtendedSignData[] = [
  { sign: '0', description: 'Closed fist (O shape)', category: 'number', handShape: 'O shape', difficulty: 'beginner' },
  { sign: '1', description: 'Index finger extended', category: 'number', handShape: 'Index up', difficulty: 'beginner' },
  { sign: '2', description: 'Index and middle extended', category: 'number', handShape: 'V shape', difficulty: 'beginner' },
  { sign: '3', description: 'Thumb, index, middle extended', category: 'number', handShape: 'Three fingers', difficulty: 'beginner' },
  { sign: '4', description: 'Four fingers extended, thumb tucked (removed from detection)', category: 'number', handShape: 'Four fingers', difficulty: 'beginner' },
  { sign: '5', description: 'All fingers extended (removed from detection)', category: 'number', handShape: 'Open hand', difficulty: 'beginner' },
  { sign: '6', description: 'Thumb touches pinky, others extended', category: 'number', handShape: 'W + thumb-pinky', difficulty: 'beginner' },
  { sign: '7', description: 'Thumb touches ring, others extended', category: 'number', handShape: 'Specific finger combo', difficulty: 'beginner' },
  { sign: '8', description: 'Thumb touches middle, others extended', category: 'number', handShape: 'Specific finger combo', difficulty: 'beginner' },
  { sign: '9', description: 'Thumb touches index, others extended', category: 'number', handShape: 'Specific finger combo', difficulty: 'beginner' },
  { sign: '10', description: 'Thumb extended, shake', category: 'number', handShape: 'A shape', movement: 'Shake', difficulty: 'beginner' },
  { sign: '11', description: 'Flick index finger up twice', category: 'number', handShape: 'Index', movement: 'Double flick', difficulty: 'intermediate' },
  { sign: '12', description: 'Flick index and middle up twice', category: 'number', handShape: 'V shape', movement: 'Double flick', difficulty: 'intermediate' },
  { sign: '13', description: '3 handshape, wiggle fingers', category: 'number', handShape: 'Three shape', movement: 'Wiggle', difficulty: 'intermediate' },
  { sign: '14', description: '4 handshape, wiggle fingers', category: 'number', handShape: 'Four shape', movement: 'Wiggle', difficulty: 'intermediate' },
  { sign: '15', description: '5 handshape, wiggle fingers', category: 'number', handShape: 'Five shape', movement: 'Wiggle', difficulty: 'intermediate' },
  { sign: '16', description: '10 + 6 combined', category: 'number', handShape: 'A to 6', movement: 'Transition', difficulty: 'intermediate' },
  { sign: '17', description: '10 + 7 combined', category: 'number', handShape: 'A to 7', movement: 'Transition', difficulty: 'intermediate' },
  { sign: '18', description: '10 + 8 combined', category: 'number', handShape: 'A to 8', movement: 'Transition', difficulty: 'intermediate' },
  { sign: '19', description: '10 + 9 combined', category: 'number', handShape: 'A to 9', movement: 'Transition', difficulty: 'intermediate' },
  { sign: '20', description: 'Thumb and index pinch repeatedly', category: 'number', handShape: 'G shape', movement: 'Pinching', difficulty: 'intermediate' },
];

// ASL Alphabet with detailed descriptions
export const aslAlphabetDetailed: ExtendedSignData[] = [
  { sign: 'A', description: 'Fist with thumb on the side', category: 'letter', handShape: 'Fist, thumb beside index', difficulty: 'beginner' },
  { sign: 'B', description: 'Flat hand with fingers together, thumb tucked', category: 'letter', handShape: 'Flat hand, thumb in palm', difficulty: 'beginner' },
  { sign: 'C', description: 'Curved hand like holding a cup', category: 'letter', handShape: 'Curved C shape', difficulty: 'beginner' },
  { sign: 'D', description: 'Index finger up, other fingers and thumb form circle', category: 'letter', handShape: 'Index up, O with others', difficulty: 'beginner' },
  { sign: 'E', description: 'Fingers curled into palm, thumb tucked', category: 'letter', handShape: 'Bent fingers, thumb under', difficulty: 'beginner' },
  { sign: 'F', description: 'Index and thumb form circle, other fingers spread', category: 'letter', handShape: 'OK with 3 fingers up', difficulty: 'beginner' },
  { sign: 'G', description: 'Index and thumb parallel, pointing sideways', category: 'letter', handShape: 'Pointing sideways', difficulty: 'intermediate' },
  { sign: 'H', description: 'Index and middle fingers extended, pointing sideways', category: 'letter', handShape: 'Two fingers sideways', difficulty: 'intermediate' },
  { sign: 'I', description: 'Pinky finger extended up, other fingers closed', category: 'letter', handShape: 'Pinky up only', difficulty: 'beginner' },
  { sign: 'J', description: 'Pinky extended, trace J shape in air', category: 'letter', handShape: 'Pinky traces J', movement: 'Draw J motion', difficulty: 'intermediate' },
  { sign: 'K', description: 'Index and middle up, thumb between them', category: 'letter', handShape: 'V with thumb between', difficulty: 'intermediate' },
  { sign: 'L', description: 'L shape with index and thumb at 90 degrees', category: 'letter', handShape: 'L shape', difficulty: 'beginner' },
  { sign: 'M', description: 'Thumb under three fingers', category: 'letter', handShape: 'Three fingers over thumb', difficulty: 'intermediate' },
  { sign: 'N', description: 'Thumb under two fingers', category: 'letter', handShape: 'Two fingers over thumb', difficulty: 'intermediate' },
  { sign: 'O', description: 'Fingers and thumb form O shape', category: 'letter', handShape: 'O circle', difficulty: 'beginner' },
  { sign: 'P', description: 'Like K but pointing down', category: 'letter', handShape: 'K pointing down', difficulty: 'intermediate' },
  { sign: 'Q', description: 'Like G but pointing down', category: 'letter', handShape: 'G pointing down', difficulty: 'intermediate' },
  { sign: 'R', description: 'Index and middle crossed', category: 'letter', handShape: 'Crossed fingers', difficulty: 'beginner' },
  { sign: 'S', description: 'Fist with thumb over fingers', category: 'letter', handShape: 'Fist, thumb over', difficulty: 'beginner' },
  { sign: 'T', description: 'Thumb between index and middle finger', category: 'letter', handShape: 'Thumb peeks through', difficulty: 'intermediate' },
  { sign: 'U', description: 'Index and middle together, pointing up', category: 'letter', handShape: 'Two fingers up together', difficulty: 'beginner' },
  { sign: 'V', description: 'Index and middle spread in V shape', category: 'letter', handShape: 'V shape spread', difficulty: 'beginner' },
  { sign: 'W', description: 'Index, middle, and ring spread', category: 'letter', handShape: 'Three fingers spread', difficulty: 'beginner' },
  { sign: 'X', description: 'Index finger hooked/bent', category: 'letter', handShape: 'Hooked index', difficulty: 'beginner' },
  { sign: 'Y', description: 'Thumb and pinky extended (shaka)', category: 'letter', handShape: 'Y/shaka shape', difficulty: 'beginner' },
  { sign: 'Z', description: 'Index finger traces Z in air', category: 'letter', handShape: 'Index draws Z', movement: 'Draw Z motion', difficulty: 'intermediate' },
];

// Language/Sign System Information
export interface SignLanguageInfo {
  code: string;
  name: string;
  region: string;
  description: string;
  users: string;
  features: string[];
  supported: boolean;
}

export const signLanguages: SignLanguageInfo[] = [
  {
    code: 'ASL',
    name: 'American Sign Language',
    region: 'United States, Canada',
    description: 'The primary sign language used in the United States and English-speaking parts of Canada. Uses a manual alphabet and has its own grammar structure.',
    users: '250,000 - 500,000',
    features: ['One-handed alphabet', 'Topic-comment structure', 'Facial expressions integral'],
    supported: true,
  },
  {
    code: 'BSL',
    name: 'British Sign Language',
    region: 'United Kingdom',
    description: 'The sign language used in the United Kingdom. Uses a two-handed alphabet and is not mutually intelligible with ASL.',
    users: '150,000+',
    features: ['Two-handed alphabet', 'Different grammar from English', 'Regional variations'],
    supported: false,
  },
  {
    code: 'LSF',
    name: 'French Sign Language',
    region: 'France',
    description: 'The sign language of the French Deaf community. Historically significant as the ancestor of many sign languages including ASL.',
    users: '100,000+',
    features: ['One-handed alphabet', 'Historical significance', 'European sign language family'],
    supported: false,
  },
  {
    code: 'DGS',
    name: 'German Sign Language',
    region: 'Germany',
    description: 'The sign language of the German Deaf community with regional dialects.',
    users: '200,000+',
    features: ['Mixed alphabet system', 'Strong facial grammar', 'Regional dialects'],
    supported: false,
  },
  {
    code: 'JSL',
    name: 'Japanese Sign Language',
    region: 'Japan',
    description: 'The sign language used by the Deaf community in Japan. Uses a fingerspelling system based on Japanese writing.',
    users: '320,000+',
    features: ['Unique fingerspelling', 'Influenced by Japanese grammar', 'Distinct from other Asian SL'],
    supported: false,
  },
  {
    code: 'Auslan',
    name: 'Australian Sign Language',
    region: 'Australia',
    description: 'The sign language of the Australian Deaf community, derived from BSL.',
    users: '10,000+',
    features: ['Two-handed alphabet', 'BSL derivative', 'Australian signs'],
    supported: false,
  },
  {
    code: 'ISL',
    name: 'Indian Sign Language',
    region: 'India',
    description: 'The sign language predominantly used in South Asia. Has regional variations across India.',
    users: '2.7 million+',
    features: ['Growing standardization', 'Regional variations', 'Unique grammar'],
    supported: true,
  },
  {
    code: 'CSL',
    name: 'Chinese Sign Language',
    region: 'China',
    description: 'The sign language used by the Deaf community in China. Has northern and southern dialects.',
    users: '20 million+',
    features: ['Multiple dialects', 'Character-based elements', 'Government standardization'],
    supported: false,
  },
];

// Get all signs by category
export const getAllSigns = (): ExtendedSignData[] => {
  return [...aslAlphabetDetailed, ...extendedNumbers, ...extendedPhrases];
};

// Get signs by category
export const getSignsByCategory = (category: ExtendedSignData['category']): ExtendedSignData[] => {
  return getAllSigns().filter(sign => sign.category === category);
};

// Get signs by difficulty
export const getSignsByDifficulty = (difficulty: ExtendedSignData['difficulty']): ExtendedSignData[] => {
  return getAllSigns().filter(sign => sign.difficulty === difficulty);
};

// Search signs
export const searchSigns = (query: string): ExtendedSignData[] => {
  const lowerQuery = query.toLowerCase();
  return getAllSigns().filter(sign => 
    sign.sign.toLowerCase().includes(lowerQuery) ||
    sign.description.toLowerCase().includes(lowerQuery) ||
    sign.handShape.toLowerCase().includes(lowerQuery)
  );
};
