import { ExtendedSignData } from './extendedSignData';

// ISL (Indian Sign Language) Alphabet - Two-handed system with unique handshapes
export const islAlphabet: ExtendedSignData[] = [
  { sign: 'A', description: 'Fist with thumb pointing up, palm facing outward', category: 'letter', handShape: 'Fist, thumb up', difficulty: 'beginner' },
  { sign: 'B', description: 'Flat hand with fingers together, thumb tucked, palm forward', category: 'letter', handShape: 'Flat palm forward', difficulty: 'beginner' },
  { sign: 'C', description: 'Hand curved in C shape, palm facing left', category: 'letter', handShape: 'C curve sideways', difficulty: 'beginner' },
  { sign: 'D', description: 'Index finger up, thumb and other fingers form circle touching', category: 'letter', handShape: 'Index up, circle below', difficulty: 'beginner' },
  { sign: 'E', description: 'All fingers curled down, thumb pressed against fingers', category: 'letter', handShape: 'Curled fingers, thumb against', difficulty: 'beginner' },
  { sign: 'F', description: 'Thumb and index touch forming circle, three fingers extended up', category: 'letter', handShape: 'Circle + 3 up', difficulty: 'beginner' },
  { sign: 'G', description: 'Index finger and thumb extended horizontally, other fingers closed', category: 'letter', handShape: 'Horizontal pinch', difficulty: 'intermediate' },
  { sign: 'H', description: 'Index and middle fingers extended horizontally together', category: 'letter', handShape: 'Two fingers horizontal', difficulty: 'intermediate' },
  { sign: 'I', description: 'Pinky finger extended upward, all other fingers in fist', category: 'letter', handShape: 'Pinky up', difficulty: 'beginner' },
  { sign: 'J', description: 'Pinky extended, draw J curve downward in air', category: 'letter', handShape: 'Pinky J trace', movement: 'J curve downward', difficulty: 'intermediate' },
  { sign: 'K', description: 'Index and middle up spread, thumb touching middle of index', category: 'letter', handShape: 'V with thumb touch', difficulty: 'intermediate' },
  { sign: 'L', description: 'Index finger and thumb form L shape, palm forward', category: 'letter', handShape: 'L shape forward', difficulty: 'beginner' },
  { sign: 'M', description: 'Three fingers draped over thumb, fingers pointing down', category: 'letter', handShape: 'Three over thumb', difficulty: 'intermediate' },
  { sign: 'N', description: 'Two fingers draped over thumb, fingers pointing down', category: 'letter', handShape: 'Two over thumb', difficulty: 'intermediate' },
  { sign: 'O', description: 'All fingertips touch thumb forming O circle', category: 'letter', handShape: 'O circle', difficulty: 'beginner' },
  { sign: 'P', description: 'Index pointing down, middle forward, thumb between - like inverted K', category: 'letter', handShape: 'Inverted K', difficulty: 'intermediate' },
  { sign: 'Q', description: 'Thumb and index pointing downward, other fingers closed', category: 'letter', handShape: 'Downward pinch', difficulty: 'intermediate' },
  { sign: 'R', description: 'Index and middle crossed, pointing upward', category: 'letter', handShape: 'Crossed fingers up', difficulty: 'beginner' },
  { sign: 'S', description: 'Fist with thumb wrapped over curled fingers', category: 'letter', handShape: 'Thumb-over fist', difficulty: 'beginner' },
  { sign: 'T', description: 'Thumb inserted between index and middle finger of fist', category: 'letter', handShape: 'Thumb between fingers', difficulty: 'intermediate' },
  { sign: 'U', description: 'Index and middle extended together pointing up, palm forward', category: 'letter', handShape: 'Two fingers up together', difficulty: 'beginner' },
  { sign: 'V', description: 'Index and middle spread apart in V, palm forward', category: 'letter', handShape: 'V spread forward', difficulty: 'beginner' },
  { sign: 'W', description: 'Index, middle, ring extended and spread, palm forward', category: 'letter', handShape: 'Three spread forward', difficulty: 'beginner' },
  { sign: 'X', description: 'Index finger bent at hook, other fingers in fist', category: 'letter', handShape: 'Hooked index', difficulty: 'beginner' },
  { sign: 'Y', description: 'Thumb and pinky extended outward, other fingers in fist', category: 'letter', handShape: 'Y/shaka shape', difficulty: 'beginner' },
  { sign: 'Z', description: 'Index finger traces Z shape in the air', category: 'letter', handShape: 'Index traces Z', movement: 'Z trace in air', difficulty: 'intermediate' },
];

// ISL Numbers 0-20
export const islNumbers: ExtendedSignData[] = [
  { sign: '0', description: 'All fingers and thumb form O shape', category: 'number', handShape: 'O shape', difficulty: 'beginner' },
  { sign: '1', description: 'Index finger extended up, palm facing viewer', category: 'number', handShape: 'Index up, palm out', difficulty: 'beginner' },
  { sign: '2', description: 'Index and middle extended and spread, palm forward', category: 'number', handShape: 'V shape palm out', difficulty: 'beginner' },
  { sign: '3', description: 'Thumb, index, and middle extended, palm forward', category: 'number', handShape: 'Three fingers out', difficulty: 'beginner' },
  { sign: '4', description: 'Four fingers extended apart, thumb tucked in', category: 'number', handShape: 'Four fingers spread', difficulty: 'beginner' },
  { sign: '5', description: 'All five fingers extended and spread apart', category: 'number', handShape: 'Open hand spread', difficulty: 'beginner' },
  { sign: '6', description: 'Thumb and pinky touching, three middle fingers up', category: 'number', handShape: 'Thumb-pinky touch', difficulty: 'beginner' },
  { sign: '7', description: 'Thumb and ring finger touching, others extended', category: 'number', handShape: 'Thumb-ring touch', difficulty: 'beginner' },
  { sign: '8', description: 'Thumb and middle finger touching, others extended', category: 'number', handShape: 'Thumb-middle touch', difficulty: 'beginner' },
  { sign: '9', description: 'Thumb and index touching, others extended', category: 'number', handShape: 'Thumb-index touch', difficulty: 'beginner' },
  { sign: '10', description: 'Open hand shakes or thumb flicks upward from fist', category: 'number', handShape: 'Thumb flick', movement: 'Flick up', difficulty: 'beginner' },
  { sign: '11', description: 'Index finger flicks up twice quickly', category: 'number', handShape: 'Index', movement: 'Double flick', difficulty: 'intermediate' },
  { sign: '12', description: 'Index and middle flick up twice', category: 'number', handShape: 'V shape', movement: 'Double flick', difficulty: 'intermediate' },
  { sign: '13', description: 'Three fingers wiggle or shake', category: 'number', handShape: 'Three shape', movement: 'Wiggle', difficulty: 'intermediate' },
  { sign: '14', description: 'Four fingers wiggle', category: 'number', handShape: 'Four shape', movement: 'Wiggle', difficulty: 'intermediate' },
  { sign: '15', description: 'Five fingers wiggle', category: 'number', handShape: 'Five shape', movement: 'Wiggle', difficulty: 'intermediate' },
  { sign: '16', description: 'Show 10 then 6', category: 'number', handShape: 'Sequential', movement: 'Two-part', difficulty: 'intermediate' },
  { sign: '17', description: 'Show 10 then 7', category: 'number', handShape: 'Sequential', movement: 'Two-part', difficulty: 'intermediate' },
  { sign: '18', description: 'Show 10 then 8', category: 'number', handShape: 'Sequential', movement: 'Two-part', difficulty: 'intermediate' },
  { sign: '19', description: 'Show 10 then 9', category: 'number', handShape: 'Sequential', movement: 'Two-part', difficulty: 'intermediate' },
  { sign: '20', description: 'Index and thumb pinch repeatedly', category: 'number', handShape: 'Pinch shape', movement: 'Repeated pinch', difficulty: 'intermediate' },
];

// ISL Common Phrases and Expressions
export const islPhrases: ExtendedSignData[] = [
  // Greetings
  { sign: 'Namaste', description: 'Both palms pressed together at chest, slight bow', category: 'phrase', handShape: 'Palms together', movement: 'Slight forward bow', difficulty: 'beginner' },
  { sign: 'Hello', description: 'Open palm wave or Namaste gesture', category: 'phrase', handShape: 'Open palm', movement: 'Wave or press', difficulty: 'beginner' },
  { sign: 'Goodbye', description: 'Open palm wave away from body', category: 'phrase', handShape: 'Open palm', movement: 'Wave away', difficulty: 'beginner' },
  { sign: 'Good Morning', description: 'Sign for good + sun rising motion', category: 'phrase', handShape: 'Flat hand rising', movement: 'Upward arc', difficulty: 'intermediate' },
  { sign: 'Good Night', description: 'Sign for good + hands closing down like sunset', category: 'phrase', handShape: 'Hands closing', movement: 'Downward motion', difficulty: 'intermediate' },
  { sign: 'How Are You', description: 'Point to person, then both hands palms up questioning', category: 'phrase', handShape: 'Point + open palms', movement: 'Questioning gesture', difficulty: 'beginner' },
  
  // Common Responses
  { sign: 'Thank You', description: 'Flat hand touches chin then moves forward and down', category: 'phrase', handShape: 'Flat hand', movement: 'Chin to forward', difficulty: 'beginner' },
  { sign: 'Please', description: 'Open palm circles on chest area', category: 'phrase', handShape: 'Open palm', movement: 'Circular on chest', difficulty: 'beginner' },
  { sign: 'Sorry', description: 'Fist rotates in circular motion on chest', category: 'phrase', handShape: 'Fist', movement: 'Circle on chest', difficulty: 'beginner' },
  { sign: 'You\'re Welcome', description: 'Both hands move outward from center in welcoming gesture', category: 'phrase', handShape: 'Open hands', movement: 'Outward spread', difficulty: 'beginner' },
  
  // Yes/No
  { sign: 'Yes', description: 'Fist nods up and down like a head nodding', category: 'phrase', handShape: 'Fist', movement: 'Nodding motion', difficulty: 'beginner' },
  { sign: 'No', description: 'Index finger wags side to side or hand waves no', category: 'phrase', handShape: 'Index finger', movement: 'Side to side wag', difficulty: 'beginner' },
  { sign: 'Maybe', description: 'Both flat hands alternate up and down', category: 'phrase', handShape: 'Flat hands', movement: 'Alternating', difficulty: 'beginner' },
  { sign: 'I Don\'t Know', description: 'Shrug shoulders with open palms facing up', category: 'phrase', handShape: 'Open palms up', movement: 'Shrug', difficulty: 'beginner' },
  
  // Questions
  { sign: 'What', description: 'Open palm shakes side to side, eyebrows raised', category: 'phrase', handShape: 'Open palm', movement: 'Shake side to side', difficulty: 'beginner' },
  { sign: 'Where', description: 'Index finger points around in questioning motion', category: 'phrase', handShape: 'Index point', movement: 'Circular pointing', difficulty: 'beginner' },
  { sign: 'When', description: 'Index finger circles then points forward', category: 'phrase', handShape: 'Index circle', movement: 'Circle + point', difficulty: 'intermediate' },
  { sign: 'Why', description: 'Fingertips touch forehead then pull away into Y shape', category: 'phrase', handShape: 'Touch to Y', movement: 'Forehead pull', difficulty: 'intermediate' },
  { sign: 'Who', description: 'Index finger circles near mouth area', category: 'phrase', handShape: 'Index', movement: 'Circle at mouth', difficulty: 'beginner' },
  { sign: 'How', description: 'Both fists knuckles together, then roll open outward', category: 'phrase', handShape: 'Fists to open', movement: 'Roll outward', difficulty: 'beginner' },
  
  // Emotions
  { sign: 'Happy', description: 'Both flat hands brush upward repeatedly on chest', category: 'expression', handShape: 'Flat hands', movement: 'Upward brush', difficulty: 'beginner' },
  { sign: 'Sad', description: 'Both hands slide down in front of face', category: 'expression', handShape: 'Open hands', movement: 'Downward slide', difficulty: 'beginner' },
  { sign: 'Angry', description: 'Claw hands pull away from face intensely', category: 'expression', handShape: 'Claw hands', movement: 'Pull from face', difficulty: 'beginner' },
  { sign: 'Scared', description: 'Both hands shake trembling near chest', category: 'expression', handShape: 'Open hands', movement: 'Trembling', difficulty: 'beginner' },
  { sign: 'Love', description: 'Both arms cross over chest in embracing gesture', category: 'expression', handShape: 'Arms crossed', movement: 'Embrace', difficulty: 'beginner' },
  { sign: 'I Love You', description: 'Thumb, index, and pinky extended (universal gesture)', category: 'expression', handShape: 'ILY handshape', movement: 'Static hold', difficulty: 'beginner' },
  
  // Common Words
  { sign: 'Help', description: 'One fist placed on open palm, both hands lift up together', category: 'word', handShape: 'Fist on palm', movement: 'Lift up', difficulty: 'beginner' },
  { sign: 'Stop', description: 'Flat hand chops down onto other open palm', category: 'word', handShape: 'Chop on palm', movement: 'Downward chop', difficulty: 'beginner' },
  { sign: 'Go', description: 'Both index fingers point and move forward together', category: 'word', handShape: 'Index fingers', movement: 'Forward motion', difficulty: 'beginner' },
  { sign: 'Come', description: 'Index finger beckons toward self', category: 'word', handShape: 'Index beckon', movement: 'Toward self', difficulty: 'beginner' },
  { sign: 'Wait', description: 'Both hands held up with wiggling fingers', category: 'word', handShape: 'Open hands', movement: 'Wiggle fingers', difficulty: 'beginner' },
  { sign: 'Eat', description: 'Flat O hand taps mouth repeatedly', category: 'word', handShape: 'Flat O', movement: 'Tap mouth', difficulty: 'beginner' },
  { sign: 'Drink', description: 'C shape hand tips toward mouth like drinking', category: 'word', handShape: 'C shape', movement: 'Tip to mouth', difficulty: 'beginner' },
  { sign: 'Water', description: 'W handshape taps chin twice', category: 'word', handShape: 'W shape', movement: 'Tap chin', difficulty: 'beginner' },
  { sign: 'Food', description: 'Flat O hand taps mouth, similar to eat', category: 'word', handShape: 'Flat O', movement: 'Tap mouth', difficulty: 'beginner' },
  { sign: 'Sleep', description: 'Open hand closes over face moving downward', category: 'word', handShape: 'Open to closed', movement: 'Down over face', difficulty: 'beginner' },
  { sign: 'Work', description: 'Both fists tap together alternately', category: 'word', handShape: 'Fists', movement: 'Alternating tap', difficulty: 'beginner' },
  { sign: 'School', description: 'Clap hands twice or teacher sign + building', category: 'word', handShape: 'Flat hands', movement: 'Double clap', difficulty: 'beginner' },
  { sign: 'Home', description: 'Flat O hand touches cheek then jaw', category: 'word', handShape: 'Flat O', movement: 'Cheek to jaw', difficulty: 'beginner' },
  { sign: 'Learn', description: 'Hand grasps knowledge from palm to forehead', category: 'word', handShape: 'Grasp shape', movement: 'Palm to forehead', difficulty: 'intermediate' },
  { sign: 'Understand', description: 'Index finger flicks upward near forehead', category: 'word', handShape: 'Fist to index', movement: 'Flick up', difficulty: 'beginner' },
  
  // Family
  { sign: 'Mother', description: 'Thumb of open hand taps chin area', category: 'word', handShape: 'Open hand', movement: 'Thumb taps chin', difficulty: 'beginner' },
  { sign: 'Father', description: 'Thumb of open hand taps forehead area', category: 'word', handShape: 'Open hand', movement: 'Thumb taps forehead', difficulty: 'beginner' },
  { sign: 'Sister', description: 'Sign for female + same/together', category: 'word', handShape: 'Compound sign', movement: 'Two-part', difficulty: 'intermediate' },
  { sign: 'Brother', description: 'Sign for male + same/together', category: 'word', handShape: 'Compound sign', movement: 'Two-part', difficulty: 'intermediate' },
  { sign: 'Friend', description: 'Both index fingers hook together and reverse', category: 'word', handShape: 'Hooked indexes', movement: 'Hook and swap', difficulty: 'beginner' },
  { sign: 'Family', description: 'Both hands F shape circle outward from each other', category: 'word', handShape: 'F shapes', movement: 'Outward circle', difficulty: 'beginner' },
  
  // Time
  { sign: 'Today', description: 'Both Y hands drop in front of body', category: 'word', handShape: 'Y hands', movement: 'Drop down', difficulty: 'beginner' },
  { sign: 'Tomorrow', description: 'Thumb on cheek arcs forward', category: 'word', handShape: 'A shape', movement: 'Forward arc', difficulty: 'beginner' },
  { sign: 'Yesterday', description: 'Thumb touches cheek then moves backward', category: 'word', handShape: 'A to Y', movement: 'Backward arc', difficulty: 'beginner' },
  { sign: 'Now', description: 'Both Y hands drop sharply downward', category: 'word', handShape: 'Y hands', movement: 'Sharp drop', difficulty: 'beginner' },
  
  // Common Gestures (same as ASL - universal)
  { sign: 'OK', description: 'Thumb and index form circle, other fingers extended', category: 'phrase', handShape: 'OK circle', movement: 'Static or slight shake', difficulty: 'beginner' },
  { sign: 'Thumbs Up', description: 'Closed fist with thumb pointing upward', category: 'phrase', handShape: 'Thumbs up', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Thumbs Down', description: 'Closed fist with thumb pointing downward', category: 'phrase', handShape: 'Thumbs down', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Peace', description: 'Index and middle fingers in V shape', category: 'phrase', handShape: 'V shape', movement: 'Static hold', difficulty: 'beginner' },
  { sign: 'Point', description: 'Index finger extended forward pointing', category: 'phrase', handShape: 'Index point', movement: 'Pointing', difficulty: 'beginner' },

  // Indian-specific
  { sign: 'Dhanyavaad', description: 'Both hands pressed together, slight bow - formal thanks', category: 'phrase', handShape: 'Palms together', movement: 'Bow gesture', difficulty: 'beginner' },
  { sign: 'Shubh Prabhat', description: 'Good morning - sun rising motion with open hand', category: 'phrase', handShape: 'Open hand', movement: 'Rising arc', difficulty: 'intermediate' },
  { sign: 'Kaise Ho', description: 'How are you - point then questioning palms up gesture', category: 'phrase', handShape: 'Point + palms', movement: 'Questioning', difficulty: 'intermediate' },
  { sign: 'Theek Hai', description: 'OK - thumb and index circle with nod', category: 'phrase', handShape: 'OK shape', movement: 'Nod', difficulty: 'beginner' },
];

// Get all ISL signs
export const getAllISLSigns = (): ExtendedSignData[] => {
  return [...islAlphabet, ...islNumbers, ...islPhrases];
};

// Search ISL signs
export const searchISLSigns = (query: string): ExtendedSignData[] => {
  const lowerQuery = query.toLowerCase();
  return getAllISLSigns().filter(sign =>
    sign.sign.toLowerCase().includes(lowerQuery) ||
    sign.description.toLowerCase().includes(lowerQuery) ||
    sign.handShape.toLowerCase().includes(lowerQuery)
  );
};
