import { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, CameraOff, Volume2, VolumeX, Copy, Check, Loader2, Hand, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHandDetection } from '@/hooks/useHandDetection';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { GestureStabilizer } from '@/lib/gestureClassifier';
import { cn } from '@/lib/utils';

const SignToText = () => {
  const { 
    videoRef, 
    canvasRef, 
    isActive, 
    isLoading, 
    error, 
    detectionResult,
    startDetection, 
    stopDetection 
  } = useHandDetection();
  
  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const stabilizerRef = useRef(new GestureStabilizer(8, 0.5));
  const lastSpokenRef = useRef<string>('');

  // Process gesture detection results
  useEffect(() => {
    if (!isActive || !detectionResult.gesture) return;

    const stabilized = stabilizerRef.current.addGesture(detectionResult.gesture, detectionResult.confidence);
    
    if (stabilized.gesture && stabilized.gesture !== 'Unknown' && stabilized.gesture !== 'No Hand') {
      setTranslatedText(stabilized.gesture);
      
      // Add to history if it's a new gesture and stable
      if (stabilized.isStable && stabilized.gesture !== history[0]) {
        setHistory(prev => [stabilized.gesture, ...prev.slice(0, 9)]);
        
        // Auto-speak new gestures
        if (autoSpeak && stabilized.gesture !== lastSpokenRef.current) {
          lastSpokenRef.current = stabilized.gesture;
          speak(stabilized.gesture);
        }
      }
    }
  }, [isActive, detectionResult, autoSpeak, speak, history]);

  // Reset stabilizer when camera stops
  useEffect(() => {
    if (!isActive) {
      stabilizerRef.current.reset();
      lastSpokenRef.current = '';
    }
  }, [isActive]);

  const handleCopy = useCallback(() => {
    const textToCopy = history.length > 0 ? history.join(' ') : translatedText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [history, translatedText]);

  const toggleCamera = useCallback(() => {
    if (isActive) {
      stopDetection();
      setTranslatedText('');
    } else {
      startDetection();
    }
  }, [isActive, startDetection, stopDetection]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setTranslatedText('');
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Video Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <Hand className="w-5 h-5 text-primary" />
            Camera Input
          </h2>
          <Button
            variant={isActive ? "destructive" : "gradient"}
            size="sm"
            onClick={toggleCamera}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading ML Model...
              </>
            ) : isActive ? (
              <>
                <CameraOff className="w-4 h-4" />
                Stop Camera
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                Start Camera
              </>
            )}
          </Button>
        </div>

        <div className="video-container aspect-video relative overflow-hidden rounded-2xl">
          {/* Hidden video element for MediaPipe processing */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover opacity-0"
          />
          
          {/* Canvas shows video with hand landmarks overlay */}
          <canvas
            ref={canvasRef}
            className={cn(
              "w-full h-full object-cover rounded-2xl transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-0"
            )}
          />

          {!isActive && (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-muted/20 rounded-2xl">
              <Camera className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-center px-4">
                {error ? error : 'Click "Start Camera" to begin sign language detection'}
              </p>
              {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Loading MediaPipe AI Model...</span>
                </div>
              )}
            </div>
          )}

          {/* Live Status Indicator */}
          {isActive && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-foreground">Live Detection</span>
            </div>
          )}

          {/* Hand Detection Indicator */}
          {isActive && detectionResult.hands.length > 0 && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm">
              <Zap className="w-3 h-3 text-primary-foreground" />
              <span className="text-xs text-primary-foreground font-medium">
                {detectionResult.hands.length} Hand{detectionResult.hands.length > 1 ? 's' : ''} Detected
              </span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Powered by MediaPipe AI
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Uses the same technology as the sign2text project</li>
            <li>• Real-time hand landmark detection (21 points)</li>
            <li>• Position your hands clearly in frame</li>
            <li>• Make slow, distinct gestures for best results</li>
          </ul>
        </div>
      </div>

      {/* Translation Output Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            Translation Output
          </h2>
          <Button
            variant="glass"
            size="sm"
            onClick={() => setAutoSpeak(!autoSpeak)}
          >
            {autoSpeak ? (
              <>
                <Volume2 className="w-4 h-4" />
                Auto-Speak On
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                Auto-Speak Off
              </>
            )}
          </Button>
        </div>

        <div className="glass-card p-6 min-h-[300px] flex flex-col">
          {translatedText ? (
            <div className="flex-1 flex flex-col">
              {/* Confidence Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500 rounded-full",
                      detectionResult.confidence >= 90 ? "bg-accent" : 
                      detectionResult.confidence >= 70 ? "bg-primary" : "bg-secondary"
                    )}
                    style={{ width: `${detectionResult.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{detectionResult.confidence}%</span>
              </div>

              {/* Translated Text */}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-4xl font-display font-bold text-center gradient-text animate-fade-in">
                  {translatedText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => speak(translatedText)}
                  disabled={isSpeaking}
                >
                  {isSpeaking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Speaking...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      Speak
                    </>
                  )}
                </Button>
                
                <Button
                  variant="glass"
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>

                {isSpeaking && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={stop}
                  >
                    Stop
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <div className="typing-indicator mb-4">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="text-center">
                {isActive 
                  ? 'Waiting for hand gestures...'
                  : 'Start the camera to begin translation'
                }
              </p>
            </div>
          )}
        </div>

        {/* Recognition History */}
        {history.length > 0 && (
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Recognition History</h3>
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                Clear
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((gesture, index) => (
                <span 
                  key={index}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:bg-accent/20",
                    index === 0 ? "bg-accent/20 text-accent-foreground font-medium" : "bg-muted/50 text-muted-foreground"
                  )}
                  onClick={() => speak(gesture)}
                >
                  {gesture}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supported Gestures */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-3">Supported Gestures (Complete ASL Alphabet):</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Phrases:</span> Hello, Peace, OK, I Love You, Thumbs Up/Down, Stop, Point, Rock On
            </div>
            <div>
              <span className="font-medium text-foreground">Letters:</span> A-Z (Full ASL Alphabet)
            </div>
            <div>
              <span className="font-medium text-foreground">Numbers:</span> 0-5
            </div>
            <div>
              <span className="font-medium text-foreground">Detection:</span> 21-point hand tracking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignToText;
