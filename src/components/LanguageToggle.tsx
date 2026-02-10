import { cn } from '@/lib/utils';

export type SignLanguageType = 'ASL' | 'ISL';

interface LanguageToggleProps {
  language: SignLanguageType;
  onLanguageChange: (lang: SignLanguageType) => void;
}

const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground mr-2">Sign Language:</span>
      <div className="flex rounded-xl bg-muted/30 p-1 border border-border">
        <button
          onClick={() => onLanguageChange('ASL')}
          className={cn(
            'px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
            language === 'ASL'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          🇺🇸 ASL
        </button>
        <button
          onClick={() => onLanguageChange('ISL')}
          className={cn(
            'px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
            language === 'ISL'
              ? 'bg-secondary text-secondary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          🇮🇳 ISL
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
