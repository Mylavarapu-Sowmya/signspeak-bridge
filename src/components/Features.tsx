import { useState } from 'react';
import { Video, MessageSquare, Volume2, Zap, Shield, Globe, X, CheckCircle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface FeatureDetail {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  details: {
    overview: string;
    howItWorks: string[];
    benefits: string[];
    technicalDetails: string[];
  };
}

const features: FeatureDetail[] = [
  {
    icon: Video,
    title: 'Real-time Detection',
    description: 'Webcam-based sign language recognition using advanced ML models',
    gradient: 'from-primary to-cyan-400',
    details: {
      overview: 'Our real-time detection system uses MediaPipe Hands technology to track 21 hand landmarks at 30+ FPS, enabling instant gesture recognition directly in your browser.',
      howItWorks: [
        'Camera captures video frames continuously',
        'MediaPipe processes each frame to detect hands',
        '21 landmark points are extracted per hand',
        'Custom classifier analyzes landmark positions',
        'Gesture is matched against trained patterns',
        'Result is displayed with confidence score',
      ],
      benefits: [
        'No external hardware required - just a webcam',
        'Works offline once loaded',
        'Low latency for natural conversation flow',
        'Supports multiple gesture categories',
      ],
      technicalDetails: [
        'Uses MediaPipe Hands for landmark detection',
        'Custom gesture classification engine',
        'Gesture stabilization to reduce noise',
        'Confidence scoring for accuracy feedback',
      ],
    },
  },
  {
    icon: MessageSquare,
    title: 'Bidirectional Translation',
    description: 'Convert sign language to text and text back to sign animations',
    gradient: 'from-secondary to-pink-400',
    details: {
      overview: 'Two-way translation enables both deaf and hearing users to communicate. Convert gestures to text or type text to see the corresponding sign language representations.',
      howItWorks: [
        'Sign-to-Text: Camera captures gestures → ML recognizes signs → Text output',
        'Text-to-Sign: Type text → System looks up signs → Visual display of hand positions',
        'Common phrases are mapped to single gestures',
        'Unknown words are spelled out letter by letter',
        'Playback controls allow speed adjustment',
      ],
      benefits: [
        'Bridges communication gap between deaf and hearing',
        'Educational tool for learning sign language',
        'Supports both individual letters and phrases',
        'Customizable playback speed',
      ],
      technicalDetails: [
        'Sign database with 26 letters + 20 numbers',
        '50+ common phrases and expressions',
        'Animated sequence playback',
        'Auto-detection of common phrases',
      ],
    },
  },
  {
    icon: Volume2,
    title: 'Voice Output',
    description: 'Text-to-speech capability for audio feedback of translations',
    gradient: 'from-green-500 to-emerald-400',
    details: {
      overview: 'Integrated speech synthesis converts recognized gestures into spoken words, enabling hands-free audio output for seamless communication.',
      howItWorks: [
        'Recognized gesture text is captured',
        'Web Speech API synthesizes audio',
        'Multiple voice options available',
        'Adjustable speaking rate and pitch',
        'Auto-speak mode for continuous output',
      ],
      benefits: [
        'Enables communication with non-signers',
        'Hands-free audio output',
        'Natural-sounding voices',
        'Works with system voice settings',
      ],
      technicalDetails: [
        'Uses Web Speech API (SpeechSynthesis)',
        'Supports multiple languages and accents',
        'Queue management for multiple phrases',
        'Fallback for unsupported browsers',
      ],
    },
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Low-latency processing for seamless communication flow',
    gradient: 'from-yellow-500 to-orange-400',
    details: {
      overview: 'Our optimized pipeline ensures minimal delay between gesture and recognition, making real-time conversation possible without frustrating pauses.',
      howItWorks: [
        'WebGL-accelerated video processing',
        'Efficient landmark extraction algorithms',
        'Optimized classification computations',
        'Frame skipping for consistent performance',
        'Background processing to prevent UI blocking',
      ],
      benefits: [
        'Sub-100ms recognition latency',
        'Smooth video preview without stuttering',
        'Consistent performance across devices',
        'No server round-trips required',
      ],
      technicalDetails: [
        'GPU-accelerated MediaPipe inference',
        'Optimized JavaScript classification',
        'RequestAnimationFrame for smooth rendering',
        'Web Workers for background processing',
      ],
    },
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing done locally in your browser, no data sent to servers',
    gradient: 'from-blue-500 to-indigo-400',
    details: {
      overview: 'Your privacy is our priority. All video processing and gesture recognition happens entirely in your browser - no data ever leaves your device.',
      howItWorks: [
        'Camera stream stays local to your browser',
        'ML models run client-side using WebGL',
        'No video frames sent to any server',
        'No gesture data stored or transmitted',
        'Works completely offline once loaded',
      ],
      benefits: [
        'Complete data privacy guaranteed',
        'No account or login required',
        'GDPR and privacy compliant by design',
        'Secure for sensitive communications',
      ],
      technicalDetails: [
        'Client-side only architecture',
        'No analytics or tracking',
        'Camera permissions fully controlled by user',
        'Open source and auditable',
      ],
    },
  },
  {
    icon: Globe,
    title: 'ASL Support',
    description: 'Comprehensive American Sign Language alphabet and common phrases',
    gradient: 'from-rose-500 to-red-400',
    details: {
      overview: 'Full support for American Sign Language including the complete alphabet (A-Z), numbers (0-20), and over 50 common phrases and expressions.',
      howItWorks: [
        'Complete ASL fingerspelling alphabet',
        'Numbers 0-20 with proper hand shapes',
        'Common phrases like "Hello", "Thank you", "I love you"',
        'Emotion expressions and responses',
        'Question words and family signs',
      ],
      benefits: [
        'Learn the most widely used sign language',
        'Communicate essential phrases immediately',
        'Educational resource for ASL learners',
        'Foundation for more advanced signing',
      ],
      technicalDetails: [
        '26 letter recognitions with variations',
        '21 number gestures supported',
        '50+ phrase and word recognitions',
        'Expandable gesture library',
      ],
    },
  },
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold mb-4">
          Powerful <span className="gradient-text">Features</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bridge the communication gap with our AI-powered sign language translation system.
          Click on any feature to learn more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-primary/30"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedFeature(feature)}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}>
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
            </div>
            
            <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
              {feature.title}
              <Info className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Feature Detail Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto glass-card border-white/10">
          {selectedFeature && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedFeature.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <selectedFeature.icon className="w-7 h-7 text-foreground" />
                    </div>
                  </div>
                  <div>
                    <DialogTitle className="font-display text-2xl">
                      {selectedFeature.title}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      {selectedFeature.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Overview */}
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Overview</h4>
                  <p className="text-muted-foreground">{selectedFeature.details.overview}</p>
                </div>

                {/* How It Works */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">How It Works</h4>
                  <ol className="space-y-2">
                    {selectedFeature.details.howItWorks.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedFeature.details.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Details */}
                <div className="bg-muted/30 rounded-xl p-4">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Technical Details</h4>
                  <ul className="space-y-2">
                    {selectedFeature.details.technicalDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground font-mono">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Features;
