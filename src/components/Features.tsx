import { Video, MessageSquare, Volume2, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'Real-time Detection',
    description: 'Webcam-based sign language recognition using advanced ML models',
    gradient: 'from-primary to-cyan-400',
  },
  {
    icon: MessageSquare,
    title: 'Bidirectional Translation',
    description: 'Convert sign language to text and text back to sign animations',
    gradient: 'from-secondary to-pink-400',
  },
  {
    icon: Volume2,
    title: 'Voice Output',
    description: 'Text-to-speech capability for audio feedback of translations',
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Low-latency processing for seamless communication flow',
    gradient: 'from-yellow-500 to-orange-400',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing done locally in your browser, no data sent to servers',
    gradient: 'from-blue-500 to-indigo-400',
  },
  {
    icon: Globe,
    title: 'ASL Support',
    description: 'Comprehensive American Sign Language alphabet and common phrases',
    gradient: 'from-rose-500 to-red-400',
  },
];

const Features = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold mb-4">
          Powerful <span className="gradient-text">Features</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bridge the communication gap with our AI-powered sign language translation system
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}>
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
            </div>
            
            <h3 className="font-display font-semibold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
