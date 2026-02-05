import { Hand, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl">
                <Hand className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold gradient-text">
                SignBridge
              </h1>
              <p className="text-xs text-muted-foreground">
                Two-Way Sign Language Translator
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-white/5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-Powered Translation
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
