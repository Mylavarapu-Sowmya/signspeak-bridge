// ASL & ISL Sign Language Data with hand shape descriptions and emoji representations

export interface SignData {
  letter: string;
  description: string;
  imageUrl: string;
  handShape?: string;
  movement?: string;
  emoji?: string;
}

// Hand shape emoji mapping for visual display
const handEmojis: Record<string, string> = {
  'A': '✊', 'B': '🤚', 'C': '🫲', 'D': '☝️', 'E': '✊', 'F': '👌',
  'G': '🤏', 'H': '🤞', 'I': '🤙', 'J': '🤙', 'K': '✌️', 'L': '🤟',
  'M': '✊', 'N': '✊', 'O': '👌', 'P': '👇', 'Q': '👇', 'R': '🤞',
  'S': '✊', 'T': '✊', 'U': '✌️', 'V': '✌️', 'W': '🤟', 'X': '☝️',
  'Y': '🤙', 'Z': '☝️',
  'HELLO': '👋', 'THANK YOU': '🙏', 'PLEASE': '🙏', 'YES': '👍', 'NO': '👎',
  'LOVE': '🤗', 'HELP': '🆘', 'I LOVE YOU': '🤟', 'GOODBYE': '👋',
  'SORRY': '😔', 'HAPPY': '😊', 'SAD': '😢', 'ANGRY': '😠',
  'STOP': '✋', 'GO': '👉', 'EAT': '🤏', 'DRINK': '🫗', 'SLEEP': '😴',
  'MOTHER': '👩', 'FATHER': '👨', 'FRIEND': '🤝', 'BABY': '👶',
  'NAMASTE': '🙏', 'DHANYAVAAD': '🙏', 'KAISE HO': '🤷',
};

// ASL Alphabet
export const aslAlphabet: SignData[] = [
  { letter: 'A', description: 'Fist with thumb on the side', imageUrl: '/placeholder.svg', handShape: 'Fist, thumb beside index finger', emoji: '✊' },
  { letter: 'B', description: 'Flat hand with fingers together, thumb tucked', imageUrl: '/placeholder.svg', handShape: 'Flat hand, thumb tucked into palm', emoji: '🤚' },
  { letter: 'C', description: 'Curved hand like holding a cup', imageUrl: '/placeholder.svg', handShape: 'Curved C shape, fingers together', emoji: '🫲' },
  { letter: 'D', description: 'Index finger up, other fingers and thumb form circle', imageUrl: '/placeholder.svg', handShape: 'Index up, others form circle with thumb', emoji: '☝️' },
  { letter: 'E', description: 'Fingers curled into palm, thumb tucked', imageUrl: '/placeholder.svg', handShape: 'All fingers curled, thumb under fingers', emoji: '✊' },
  { letter: 'F', description: 'Index and thumb form circle, other fingers spread', imageUrl: '/placeholder.svg', handShape: 'OK sign with 3 fingers extended up', emoji: '👌' },
  { letter: 'G', description: 'Index and thumb parallel, pointing sideways', imageUrl: '/placeholder.svg', handShape: 'Index & thumb horizontal, others closed', emoji: '🤏' },
  { letter: 'H', description: 'Index and middle fingers extended, pointing sideways', imageUrl: '/placeholder.svg', handShape: 'Two fingers horizontal together', emoji: '🤞' },
  { letter: 'I', description: 'Pinky finger extended up, other fingers closed', imageUrl: '/placeholder.svg', handShape: 'Only pinky extended upward', emoji: '🤙' },
  { letter: 'J', description: 'Pinky extended, trace J shape in air', imageUrl: '/placeholder.svg', handShape: 'Pinky traces J curve', movement: 'Draw J in air', emoji: '🤙' },
  { letter: 'K', description: 'Index and middle up, thumb between them', imageUrl: '/placeholder.svg', handShape: 'V shape with thumb between fingers', emoji: '✌️' },
  { letter: 'L', description: 'L shape with index and thumb', imageUrl: '/placeholder.svg', handShape: 'Index up, thumb out at 90°', emoji: '🤟' },
  { letter: 'M', description: 'Thumb under three fingers', imageUrl: '/placeholder.svg', handShape: 'Three fingers drape over thumb', emoji: '✊' },
  { letter: 'N', description: 'Thumb under two fingers', imageUrl: '/placeholder.svg', handShape: 'Two fingers drape over thumb', emoji: '✊' },
  { letter: 'O', description: 'Fingers and thumb form O shape', imageUrl: '/placeholder.svg', handShape: 'All fingertips touch thumb in O', emoji: '👌' },
  { letter: 'P', description: 'Like K but pointing down', imageUrl: '/placeholder.svg', handShape: 'K handshape pointing downward', emoji: '👇' },
  { letter: 'Q', description: 'Like G but pointing down', imageUrl: '/placeholder.svg', handShape: 'G handshape pointing downward', emoji: '👇' },
  { letter: 'R', description: 'Index and middle crossed', imageUrl: '/placeholder.svg', handShape: 'Index and middle fingers crossed', emoji: '🤞' },
  { letter: 'S', description: 'Fist with thumb over fingers', imageUrl: '/placeholder.svg', handShape: 'Tight fist, thumb wraps over fingers', emoji: '✊' },
  { letter: 'T', description: 'Thumb between index and middle', imageUrl: '/placeholder.svg', handShape: 'Thumb peeks between index & middle', emoji: '✊' },
  { letter: 'U', description: 'Index and middle together, pointing up', imageUrl: '/placeholder.svg', handShape: 'Two fingers up pressed together', emoji: '✌️' },
  { letter: 'V', description: 'Index and middle spread in V', imageUrl: '/placeholder.svg', handShape: 'Two fingers spread in V shape', emoji: '✌️' },
  { letter: 'W', description: 'Index, middle, and ring spread', imageUrl: '/placeholder.svg', handShape: 'Three fingers spread wide', emoji: '🤟' },
  { letter: 'X', description: 'Index finger hooked', imageUrl: '/placeholder.svg', handShape: 'Index finger bent like a hook', emoji: '☝️' },
  { letter: 'Y', description: 'Thumb and pinky extended', imageUrl: '/placeholder.svg', handShape: 'Thumb & pinky out, others closed', emoji: '🤙' },
  { letter: 'Z', description: 'Index finger traces Z in air', imageUrl: '/placeholder.svg', handShape: 'Index draws Z pattern', movement: 'Trace Z in air', emoji: '☝️' },
];

// ISL Alphabet
export const islAlphabet: SignData[] = [
  { letter: 'A', description: 'Fist with thumb pointing up, palm facing outward', imageUrl: '/placeholder.svg', handShape: 'Fist, thumb up, palm out', emoji: '👍' },
  { letter: 'B', description: 'Flat hand with fingers together, palm forward', imageUrl: '/placeholder.svg', handShape: 'Flat palm facing forward', emoji: '🤚' },
  { letter: 'C', description: 'Hand curved in C shape, palm facing left', imageUrl: '/placeholder.svg', handShape: 'C curve facing sideways', emoji: '🫲' },
  { letter: 'D', description: 'Index finger up, thumb and others form circle', imageUrl: '/placeholder.svg', handShape: 'Index up, circle below', emoji: '☝️' },
  { letter: 'E', description: 'All fingers curled down, thumb pressed against', imageUrl: '/placeholder.svg', handShape: 'Curled fingers, thumb pressed', emoji: '✊' },
  { letter: 'F', description: 'Thumb and index touch forming circle, three up', imageUrl: '/placeholder.svg', handShape: 'Circle + three fingers up', emoji: '👌' },
  { letter: 'G', description: 'Index and thumb extended horizontally', imageUrl: '/placeholder.svg', handShape: 'Horizontal pinch shape', emoji: '🤏' },
  { letter: 'H', description: 'Index and middle extended horizontally together', imageUrl: '/placeholder.svg', handShape: 'Two fingers horizontal', emoji: '🤞' },
  { letter: 'I', description: 'Pinky finger extended upward, fist', imageUrl: '/placeholder.svg', handShape: 'Pinky up from fist', emoji: '🤙' },
  { letter: 'J', description: 'Pinky extended, draw J curve in air', imageUrl: '/placeholder.svg', handShape: 'Pinky J trace', movement: 'J curve downward', emoji: '🤙' },
  { letter: 'K', description: 'Index and middle spread, thumb touching index', imageUrl: '/placeholder.svg', handShape: 'V with thumb touch', emoji: '✌️' },
  { letter: 'L', description: 'Index and thumb form L shape, palm forward', imageUrl: '/placeholder.svg', handShape: 'L shape forward', emoji: '🤟' },
  { letter: 'M', description: 'Three fingers draped over thumb, pointing down', imageUrl: '/placeholder.svg', handShape: 'Three over thumb', emoji: '✊' },
  { letter: 'N', description: 'Two fingers draped over thumb, pointing down', imageUrl: '/placeholder.svg', handShape: 'Two over thumb', emoji: '✊' },
  { letter: 'O', description: 'All fingertips touch thumb forming O', imageUrl: '/placeholder.svg', handShape: 'O circle shape', emoji: '👌' },
  { letter: 'P', description: 'Inverted K - index down, middle forward', imageUrl: '/placeholder.svg', handShape: 'Inverted K shape', emoji: '👇' },
  { letter: 'Q', description: 'Thumb and index pointing downward', imageUrl: '/placeholder.svg', handShape: 'Downward pinch', emoji: '👇' },
  { letter: 'R', description: 'Index and middle crossed, pointing up', imageUrl: '/placeholder.svg', handShape: 'Crossed fingers up', emoji: '🤞' },
  { letter: 'S', description: 'Fist with thumb wrapped over fingers', imageUrl: '/placeholder.svg', handShape: 'Thumb-over fist', emoji: '✊' },
  { letter: 'T', description: 'Thumb inserted between index and middle', imageUrl: '/placeholder.svg', handShape: 'Thumb between fingers', emoji: '✊' },
  { letter: 'U', description: 'Index and middle together pointing up, palm forward', imageUrl: '/placeholder.svg', handShape: 'Two fingers up, palm out', emoji: '✌️' },
  { letter: 'V', description: 'Index and middle spread V, palm forward', imageUrl: '/placeholder.svg', handShape: 'V spread forward', emoji: '✌️' },
  { letter: 'W', description: 'Index, middle, ring extended and spread', imageUrl: '/placeholder.svg', handShape: 'Three spread forward', emoji: '🤟' },
  { letter: 'X', description: 'Index finger bent at hook, fist', imageUrl: '/placeholder.svg', handShape: 'Hooked index finger', emoji: '☝️' },
  { letter: 'Y', description: 'Thumb and pinky extended outward', imageUrl: '/placeholder.svg', handShape: 'Y/shaka shape', emoji: '🤙' },
  { letter: 'Z', description: 'Index finger traces Z in air', imageUrl: '/placeholder.svg', handShape: 'Index traces Z', movement: 'Z trace in air', emoji: '☝️' },
];

// ASL Common words and phrases
export const aslCommonSigns: Record<string, SignData[]> = {
  'HELLO': [{ letter: 'HELLO', description: 'Wave motion at forehead - open palm salute wave', imageUrl: '/placeholder.svg', handShape: 'Open palm wave from forehead', emoji: '👋' }],
  'GOODBYE': [{ letter: 'GOODBYE', description: 'Open palm wave back and forth', imageUrl: '/placeholder.svg', handShape: 'Open palm waving', emoji: '👋' }],
  'THANK YOU': [{ letter: 'THANK YOU', description: 'Flat hand moves from chin forward', imageUrl: '/placeholder.svg', handShape: 'Flat hand, chin to forward', emoji: '🙏' }],
  'PLEASE': [{ letter: 'PLEASE', description: 'Circular motion on chest with flat hand', imageUrl: '/placeholder.svg', handShape: 'Flat hand circles on chest', emoji: '🙏' }],
  'YES': [{ letter: 'YES', description: 'Fist nodding up and down like head nod', imageUrl: '/placeholder.svg', handShape: 'Fist nodding motion', emoji: '👍' }],
  'NO': [{ letter: 'NO', description: 'Index and middle snap to thumb', imageUrl: '/placeholder.svg', handShape: 'Two fingers snap to thumb', emoji: '👎' }],
  'LOVE': [{ letter: 'LOVE', description: 'Cross arms over chest in embrace', imageUrl: '/placeholder.svg', handShape: 'Arms crossed over chest', emoji: '🤗' }],
  'I LOVE YOU': [{ letter: 'I LOVE YOU', description: 'Thumb, index, and pinky extended', imageUrl: '/placeholder.svg', handShape: 'ILY handshape - thumb, index, pinky out', emoji: '🤟' }],
  'HELP': [{ letter: 'HELP', description: 'Fist placed on flat palm, lift up together', imageUrl: '/placeholder.svg', handShape: 'Fist on open palm, lift', emoji: '🆘' }],
  'SORRY': [{ letter: 'SORRY', description: 'Fist circles on chest', imageUrl: '/placeholder.svg', handShape: 'Fist circular on chest', emoji: '😔' }],
  'GOOD MORNING': [{ letter: 'GOOD MORNING', description: 'Good sign + sun rising motion', imageUrl: '/placeholder.svg', handShape: 'Flat hand to C rising', emoji: '🌅' }],
  'GOOD NIGHT': [{ letter: 'GOOD NIGHT', description: 'Good sign + hand closing down', imageUrl: '/placeholder.svg', handShape: 'Flat hand closing down', emoji: '🌙' }],
  'HOW ARE YOU': [{ letter: 'HOW ARE YOU', description: 'Knuckles roll open + point', imageUrl: '/placeholder.svg', handShape: 'Fists to open + point', emoji: '🤷' }],
  'STOP': [{ letter: 'STOP', description: 'Flat hand chops into palm', imageUrl: '/placeholder.svg', handShape: 'Flat hand chops down on palm', emoji: '✋' }],
  'GO': [{ letter: 'GO', description: 'Index fingers point and move forward', imageUrl: '/placeholder.svg', handShape: 'Index fingers forward', emoji: '👉' }],
  'EAT': [{ letter: 'EAT', description: 'Flat O hand to mouth repeatedly', imageUrl: '/placeholder.svg', handShape: 'Flat O taps mouth', emoji: '🤏' }],
  'DRINK': [{ letter: 'DRINK', description: 'C hand tips to mouth like drinking', imageUrl: '/placeholder.svg', handShape: 'C shape tips to mouth', emoji: '🫗' }],
  'SLEEP': [{ letter: 'SLEEP', description: 'Hand closes over face downward', imageUrl: '/placeholder.svg', handShape: 'Open hand closes over face', emoji: '😴' }],
  'HAPPY': [{ letter: 'HAPPY', description: 'Hands brush up on chest repeatedly', imageUrl: '/placeholder.svg', handShape: 'Flat hands brush upward', emoji: '😊' }],
  'SAD': [{ letter: 'SAD', description: 'Hands slide down in front of face', imageUrl: '/placeholder.svg', handShape: 'Open hands slide down face', emoji: '😢' }],
  'MOTHER': [{ letter: 'MOTHER', description: 'Thumb of open hand taps chin', imageUrl: '/placeholder.svg', handShape: 'Open hand, thumb on chin', emoji: '👩' }],
  'FATHER': [{ letter: 'FATHER', description: 'Thumb of open hand taps forehead', imageUrl: '/placeholder.svg', handShape: 'Open hand, thumb on forehead', emoji: '👨' }],
  'FRIEND': [{ letter: 'FRIEND', description: 'Index fingers hook together', imageUrl: '/placeholder.svg', handShape: 'Hooked index fingers interlock', emoji: '🤝' }],
  'BABY': [{ letter: 'BABY', description: 'Arms cradle and rock side to side', imageUrl: '/placeholder.svg', handShape: 'Cradling arms rocking', emoji: '👶' }],
  'WORK': [{ letter: 'WORK', description: 'Fists tap together repeatedly', imageUrl: '/placeholder.svg', handShape: 'Fists tapping together', emoji: '💪' }],
  'SCHOOL': [{ letter: 'SCHOOL', description: 'Clap hands twice', imageUrl: '/placeholder.svg', handShape: 'Flat hands clapping', emoji: '🏫' }],
  'WAIT': [{ letter: 'WAIT', description: 'Both hands up with wiggling fingers', imageUrl: '/placeholder.svg', handShape: 'Open hands wiggling', emoji: '🖐️' }],
  'COME': [{ letter: 'COME', description: 'Index fingers beckon toward self', imageUrl: '/placeholder.svg', handShape: 'Index beckoning inward', emoji: '👈' }],
};

// ISL Common words and phrases
export const islCommonSigns: Record<string, SignData[]> = {
  'HELLO': [{ letter: 'HELLO', description: 'Open palm wave or Namaste gesture', imageUrl: '/placeholder.svg', handShape: 'Open palm or palms together', emoji: '👋' }],
  'NAMASTE': [{ letter: 'NAMASTE', description: 'Both palms pressed together, slight bow', imageUrl: '/placeholder.svg', handShape: 'Palms together at chest', emoji: '🙏' }],
  'GOODBYE': [{ letter: 'GOODBYE', description: 'Open palm wave away from body', imageUrl: '/placeholder.svg', handShape: 'Open palm waving away', emoji: '👋' }],
  'THANK YOU': [{ letter: 'THANK YOU', description: 'Flat hand touches chin then moves forward', imageUrl: '/placeholder.svg', handShape: 'Flat hand, chin forward', emoji: '🙏' }],
  'DHANYAVAAD': [{ letter: 'DHANYAVAAD', description: 'Both hands pressed together, slight bow', imageUrl: '/placeholder.svg', handShape: 'Palms together, bow', emoji: '🙏' }],
  'PLEASE': [{ letter: 'PLEASE', description: 'Open palm circles on chest area', imageUrl: '/placeholder.svg', handShape: 'Open palm on chest', emoji: '🙏' }],
  'YES': [{ letter: 'YES', description: 'Fist nods up and down', imageUrl: '/placeholder.svg', handShape: 'Fist nodding', emoji: '👍' }],
  'NO': [{ letter: 'NO', description: 'Index finger wags side to side', imageUrl: '/placeholder.svg', handShape: 'Index wagging', emoji: '👎' }],
  'SORRY': [{ letter: 'SORRY', description: 'Fist rotates on chest', imageUrl: '/placeholder.svg', handShape: 'Fist circular on chest', emoji: '😔' }],
  'LOVE': [{ letter: 'LOVE', description: 'Arms cross over chest in embrace', imageUrl: '/placeholder.svg', handShape: 'Arms crossed embrace', emoji: '🤗' }],
  'I LOVE YOU': [{ letter: 'I LOVE YOU', description: 'Thumb, index, and pinky extended', imageUrl: '/placeholder.svg', handShape: 'ILY handshape', emoji: '🤟' }],
  'HELP': [{ letter: 'HELP', description: 'Fist on open palm, lift up together', imageUrl: '/placeholder.svg', handShape: 'Fist on palm lifting', emoji: '🆘' }],
  'GOOD MORNING': [{ letter: 'GOOD MORNING', description: 'Sun rising motion with open hand', imageUrl: '/placeholder.svg', handShape: 'Open hand rising', emoji: '🌅' }],
  'SHUBH PRABHAT': [{ letter: 'SHUBH PRABHAT', description: 'Good morning - sun rising motion', imageUrl: '/placeholder.svg', handShape: 'Open hand rising arc', emoji: '🌅' }],
  'GOOD NIGHT': [{ letter: 'GOOD NIGHT', description: 'Hands closing down like sunset', imageUrl: '/placeholder.svg', handShape: 'Hands closing down', emoji: '🌙' }],
  'HOW ARE YOU': [{ letter: 'HOW ARE YOU', description: 'Point to person, palms up questioning', imageUrl: '/placeholder.svg', handShape: 'Point + open palms', emoji: '🤷' }],
  'KAISE HO': [{ letter: 'KAISE HO', description: 'Point then questioning palms up', imageUrl: '/placeholder.svg', handShape: 'Point + palms questioning', emoji: '🤷' }],
  'THEEK HAI': [{ letter: 'THEEK HAI', description: 'OK sign with nod', imageUrl: '/placeholder.svg', handShape: 'OK shape + nod', emoji: '👌' }],
  'STOP': [{ letter: 'STOP', description: 'Flat hand chops down onto palm', imageUrl: '/placeholder.svg', handShape: 'Chop on palm', emoji: '✋' }],
  'GO': [{ letter: 'GO', description: 'Index fingers point and move forward', imageUrl: '/placeholder.svg', handShape: 'Index fingers forward', emoji: '👉' }],
  'EAT': [{ letter: 'EAT', description: 'Flat O hand taps mouth', imageUrl: '/placeholder.svg', handShape: 'Flat O to mouth', emoji: '🤏' }],
  'DRINK': [{ letter: 'DRINK', description: 'C shape tips toward mouth', imageUrl: '/placeholder.svg', handShape: 'C shape to mouth', emoji: '🫗' }],
  'WATER': [{ letter: 'WATER', description: 'W handshape taps chin twice', imageUrl: '/placeholder.svg', handShape: 'W taps chin', emoji: '💧' }],
  'SLEEP': [{ letter: 'SLEEP', description: 'Hand closes over face downward', imageUrl: '/placeholder.svg', handShape: 'Open to closed over face', emoji: '😴' }],
  'HAPPY': [{ letter: 'HAPPY', description: 'Flat hands brush upward on chest', imageUrl: '/placeholder.svg', handShape: 'Flat hands upward brush', emoji: '😊' }],
  'SAD': [{ letter: 'SAD', description: 'Hands slide down in front of face', imageUrl: '/placeholder.svg', handShape: 'Hands slide down face', emoji: '😢' }],
  'MOTHER': [{ letter: 'MOTHER', description: 'Thumb of open hand taps chin', imageUrl: '/placeholder.svg', handShape: 'Open hand, thumb on chin', emoji: '👩' }],
  'FATHER': [{ letter: 'FATHER', description: 'Thumb of open hand taps forehead', imageUrl: '/placeholder.svg', handShape: 'Open hand, thumb on forehead', emoji: '👨' }],
  'FRIEND': [{ letter: 'FRIEND', description: 'Index fingers hook together and reverse', imageUrl: '/placeholder.svg', handShape: 'Hooked indexes', emoji: '🤝' }],
  'FAMILY': [{ letter: 'FAMILY', description: 'F hands circle outward', imageUrl: '/placeholder.svg', handShape: 'F shapes circling', emoji: '👨‍👩‍👧‍👦' }],
};

// Legacy alias
export const commonSigns = aslCommonSigns;

// Get sign data for text with language support
export const getSignsForText = (text: string, language: 'ASL' | 'ISL' = 'ASL'): SignData[] => {
  const upperText = text.toUpperCase().trim();
  const signs = language === 'ISL' ? islCommonSigns : aslCommonSigns;
  const alphabet = language === 'ISL' ? islAlphabet : aslAlphabet;
  
  // Check for common words/phrases first
  if (signs[upperText]) {
    return signs[upperText];
  }
  
  // Check multi-word phrases
  for (const [key, value] of Object.entries(signs)) {
    if (key === upperText) return value;
  }
  
  // Fall back to spelling out letter by letter
  return upperText
    .split('')
    .filter((char) => /[A-Z]/.test(char))
    .map((char) => alphabet.find((sign) => sign.letter === char)!)
    .filter(Boolean);
};

// Get emoji for a sign
export const getSignEmoji = (letter: string): string => {
  return handEmojis[letter.toUpperCase()] || '🤚';
};

// Simulated gesture recognition results
export const simulatedGestures = [
  'Hello', 'Thank you', 'Please', 'Yes', 'No',
  'Help', 'I love you', 'Good morning', 'How are you',
  'Nice to meet you', 'Sorry', 'Goodbye', 'Happy', 'Sad',
];
