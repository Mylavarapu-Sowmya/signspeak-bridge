import { useState } from 'react';
import Header from '@/components/Header';
import LanguageToggle, { type SignLanguageType } from '@/components/LanguageToggle';
import ModeToggle from '@/components/ModeToggle';
import SignToText from '@/components/SignToText';
import TextToSign from '@/components/TextToSign';
import Features from '@/components/Features';
import SignLibrary from '@/components/SignLibrary';
import LanguageSection from '@/components/LanguageSection';

const Index = () => {
  const [mode, setMode] = useState<'sign-to-text' | 'text-to-sign'>('sign-to-text');
  const [language, setLanguage] = useState<SignLanguageType>('ASL');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        ></div>
      </div>

      <Header />

      <main className="container mx-auto px-6 pt-28 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16 slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm text-primary">AI-Powered Translation</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Two-Way <span className="gradient-text">Sign Language</span>
            <br />
            Translator
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Break communication barriers with real-time sign language translation.
            Convert gestures to text with voice output, or translate text into sign language animations.
          </p>
        </section>

        {/* Language Toggle */}
        <LanguageToggle language={language} onLanguageChange={setLanguage} />

        {/* Mode Toggle */}
        <ModeToggle mode={mode} onModeChange={setMode} />

        {/* Main Content */}
        <section className="mb-16">
          {mode === 'sign-to-text' ? <SignToText language={language} /> : <TextToSign />}
        </section>

        {/* Features Section */}
        <Features />

        {/* Sign Library Section */}
        <SignLibrary language={language} />

        {/* Language Section */}
        <LanguageSection />

        {/* Footer */}
        <footer className="text-center pt-16 border-t border-white/5">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for accessibility • Powered by browser-based ML
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Demo project - For production use, integrate with trained ML models
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
