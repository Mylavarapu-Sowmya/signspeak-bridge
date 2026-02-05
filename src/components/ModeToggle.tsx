import { Video, Type, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  mode: 'sign-to-text' | 'text-to-sign';
  onModeChange: (mode: 'sign-to-text' | 'text-to-sign') => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={() => onModeChange('sign-to-text')}
        className={cn(
          'flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300',
          mode === 'sign-to-text'
            ? 'glass-card glow-primary border-primary/50'
            : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
        )}
      >
        <div className={cn(
          'p-2 rounded-lg',
          mode === 'sign-to-text' ? 'bg-primary/20' : 'bg-muted'
        )}>
          <Video className={cn(
            'w-5 h-5',
            mode === 'sign-to-text' ? 'text-primary' : 'text-muted-foreground'
          )} />
        </div>
        <div className="text-left">
          <p className={cn(
            'font-semibold',
            mode === 'sign-to-text' ? 'text-foreground' : 'text-muted-foreground'
          )}>
            Sign → Text
          </p>
          <p className="text-xs text-muted-foreground">
            Translate gestures to text
          </p>
        </div>
      </button>

      <div className="p-3 rounded-full bg-muted/30">
        <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
      </div>

      <button
        onClick={() => onModeChange('text-to-sign')}
        className={cn(
          'flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300',
          mode === 'text-to-sign'
            ? 'glass-card glow-secondary border-secondary/50'
            : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
        )}
      >
        <div className={cn(
          'p-2 rounded-lg',
          mode === 'text-to-sign' ? 'bg-secondary/20' : 'bg-muted'
        )}>
          <Type className={cn(
            'w-5 h-5',
            mode === 'text-to-sign' ? 'text-secondary' : 'text-muted-foreground'
          )} />
        </div>
        <div className="text-left">
          <p className={cn(
            'font-semibold',
            mode === 'text-to-sign' ? 'text-foreground' : 'text-muted-foreground'
          )}>
            Text → Sign
          </p>
          <p className="text-xs text-muted-foreground">
            Convert text to signs
          </p>
        </div>
      </button>
    </div>
  );
};

export default ModeToggle;
