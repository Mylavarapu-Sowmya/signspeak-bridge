import { useState, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Volume2, VolumeX, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWebcam } from '@/hooks/useWebcam';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { simulatedGestures } from '@/data/signLanguageData';
import { cn } from '@/lib/utils';

const SignToText = () => {
  const { videoRef, isActive, error, startWebcam, stopWebcam } = useWebcam();
  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [copied, setCopied] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  // Simulate gesture recognition
  const simulateRecognition = useCallback(() => {
    if (!isActive) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const randomGesture = simulatedGestures[Math.floor(Math.random() * simulatedGestures.length)];
      const randomConfidence = 75 + Math.floor(Math.random() * 25);
      
      setTranslatedText(randomGesture);
      setConfidence(randomConfidence);
      setIsProcessing(false);
      
      if (autoSpeak) {
        speak(randomGesture);
      }
    }, 1500);
  }, [isActive, autoSpeak, speak]);

  // Auto-detect gestures every few seconds when camera is active
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      simulateRecognition();
    }, 4000);

    // Initial recognition
    simulateRecognition();

    return () => clearInterval(interval);
  }, [isActive, simulateRecognition]);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCamera = () => {
    if (isActive) {
      stopWebcam();
      setTranslatedText('');
      setConfidence(0);
    } else {
      startWebcam();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Video Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            Camera Input
          </h2>
          <Button
            variant={isActive ? "destructive" : "gradient"}
            size="sm"
            onClick={toggleCamera}
          >
            {isActive ? (
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

        <div className="video-container aspect-video relative">
          {isActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">
                      Analyzing gesture...
                    </p>
                  </div>
                </div>
              )}

              {/* Status Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-foreground">Live</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20 rounded-2xl min-h-[300px]">
              <Camera className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-center">
                {error ? error : 'Click "Start Camera" to begin sign language detection'}
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-2">How to use:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Position your hands clearly in frame</li>
            <li>• Make sign language gestures slowly</li>
            <li>• System will auto-detect and translate</li>
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
                      confidence >= 90 ? "bg-green-500" : 
                      confidence >= 70 ? "bg-primary" : "bg-yellow-500"
                    )}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{confidence}%</span>
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
                  ? 'Waiting for sign language input...'
                  : 'Start the camera to begin translation'
                }
              </p>
            </div>
          )}
        </div>

        {/* Recent Translations */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-sm mb-3">Supported Gestures:</h3>
          <div className="flex flex-wrap gap-2">
            {simulatedGestures.slice(0, 6).map((gesture) => (
              <span 
                key={gesture}
                className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground"
              >
                {gesture}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignToText;
