import { useState, useEffect } from 'react';
import { Send, Play, Pause, SkipForward, SkipBack, RotateCcw, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { aslAlphabet, getSignsForText, SignData } from '@/data/signLanguageData';
import { cn } from '@/lib/utils';

const TextToSign = () => {
  const [inputText, setInputText] = useState('');
  const [signs, setSigns] = useState<SignData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);

  // Auto-play through signs
  useEffect(() => {
    if (!isPlaying || signs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= signs.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, signs.length, playbackSpeed]);

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    const translatedSigns = getSignsForText(inputText);
    setSigns(translatedSigns);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (signs.length === 0) return;
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentIndex < signs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const currentSign = signs[currentIndex];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Text Input Section */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">
          Enter Text
        </h2>

        <div className="glass-card p-6">
          <Textarea
            placeholder="Type your message here... (e.g., 'Hello', 'Thank you', or any word)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] bg-transparent border-white/10 focus:border-secondary/50 resize-none text-lg"
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              {inputText.length} characters
            </span>
            <Button
              variant="gradientSecondary"
              onClick={handleTranslate}
              disabled={!inputText.trim()}
            >
              <Send className="w-4 h-4" />
              Translate to Sign
            </Button>
          </div>
        </div>

        {/* Quick Phrases */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-3">Quick Phrases:</h3>
          <div className="flex flex-wrap gap-2">
            {['Hello', 'Thank you', 'Please', 'Yes', 'No', 'Help', 'Love'].map((phrase) => (
              <button
                key={phrase}
                onClick={() => {
                  setInputText(phrase);
                  setSigns(getSignsForText(phrase));
                  setCurrentIndex(0);
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Speed */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-3">Playback Speed:</h3>
          <div className="flex gap-2">
            {[
              { label: 'Slow', value: 1500 },
              { label: 'Normal', value: 1000 },
              { label: 'Fast', value: 500 },
            ].map((speed) => (
              <button
                key={speed.label}
                onClick={() => setPlaybackSpeed(speed.value)}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg transition-colors',
                  playbackSpeed === speed.value
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                )}
              >
                {speed.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sign Display Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            Sign Language Output
          </h2>
          {signs.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {signs.length}
            </span>
          )}
        </div>

        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          {signs.length > 0 && currentSign ? (
            <>
              {/* Current Sign Display */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 mb-6">
                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-pink-500 opacity-20 pulse-ring"></div>
                  
                  {/* Sign visualization */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-secondary/30 to-pink-500/30 flex items-center justify-center">
                    <div className="text-8xl font-display font-bold gradient-text">
                      {currentSign.letter}
                    </div>
                  </div>
                </div>

                <p className="text-lg font-medium text-center mb-2">
                  {currentSign.letter}
                </p>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  {currentSign.description}
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <Button
                  variant="glass"
                  size="icon"
                  onClick={handleReset}
                  disabled={currentIndex === 0 && !isPlaying}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="glass"
                  size="icon"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>

                <Button
                  variant="gradientSecondary"
                  size="lg"
                  onClick={handlePlayPause}
                  className="w-14 h-14 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>

                <Button
                  variant="glass"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentIndex === signs.length - 1}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex gap-1">
                  {signs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        'flex-1 h-2 rounded-full transition-all duration-300',
                        index === currentIndex
                          ? 'bg-secondary'
                          : index < currentIndex
                          ? 'bg-secondary/50'
                          : 'bg-muted'
                      )}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <Hand className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-center">
                Enter text and click "Translate" to see sign language
              </p>
            </div>
          )}
        </div>

        {/* ASL Alphabet Reference */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-3">ASL Alphabet Reference:</h3>
          <div className="flex flex-wrap gap-1.5">
            {aslAlphabet.map((sign) => (
              <button
                key={sign.letter}
                onClick={() => {
                  setInputText(sign.letter);
                  setSigns([sign]);
                  setCurrentIndex(0);
                }}
                className={cn(
                  'w-8 h-8 text-sm font-medium rounded-lg transition-all duration-200',
                  signs.some((s) => s.letter === sign.letter)
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                )}
              >
                {sign.letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSign;
