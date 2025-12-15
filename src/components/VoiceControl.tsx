import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mic, MicOff, Volume2, VolumeX, X } from "lucide-react";
import { useTranslation } from "./translations";
import { toast } from "sonner@2.0.3";

interface VoiceControlProps {
  currentLanguage: string;
  onCommand: (command: string, params?: any) => void;
  isEnabled?: boolean;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function VoiceControl({ currentLanguage, onCommand, isEnabled = true }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [lastCommand, setLastCommand] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [isProcessingCommand, setIsProcessingCommand] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  const t = useTranslation(currentLanguage);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition && 'speechSynthesis' in window) {
      setIsSupported(true);
      synthRef.current = window.speechSynthesis;
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(currentLanguage);
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        // Only restart if still enabled and user hasn't manually stopped
        if (voiceEnabled && isEnabled && recognitionRef.current) {
          setTimeout(() => {
            try {
              if (recognitionRef.current && voiceEnabled && isEnabled) {
                recognitionRef.current.start();
              }
            } catch (error) {
              console.log('Recognition restart failed:', error);
            }
          }, 1000);
        }
      };
      
      recognition.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast.error("Microphone access needed for voice commands");
        }
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(interimTranscript || finalTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      console.warn('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage]);

  // Start listening when enabled state changes from off to on
  useEffect(() => {
    if (isSupported && voiceEnabled && isEnabled && !isListening) {
      setTimeout(() => {
        startListening();
      }, 500);
    } else if (!isEnabled && isListening) {
      stopListening();
    }
  }, [voiceEnabled, isEnabled]);

  const getLanguageCode = (lang: string): string => {
    const langMap: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'kn': 'kn-IN',
      'or': 'or-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'ta': 'ta-IN'
    };
    return langMap[lang] || 'en-US';
  };

  const speak = (text: string) => {
    if (!speechEnabled || !synthRef.current || isSpeaking) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(currentLanguage);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const processVoiceCommand = (command: string) => {
    setLastCommand(command);
    setIsProcessingCommand(true);
    
    // Show brief visual feedback when processing a command
    setTimeout(() => setIsProcessingCommand(false), 2000);
    
    // Basic commands that work in any language (English keywords)
    const commands = {
      // Login commands
      'start': () => {
        speak("Starting login process. Say 'student login' or 'teacher login'.");
        onCommand('start_login');
      },
      'student login': () => {
        speak("Switching to student login. Please say your name.");
        onCommand('student_login');
      },
      'teacher login': () => {
        speak("Switching to teacher login. Please say your name.");
        onCommand('teacher_login');
      },
      'login': () => {
        speak("Please specify student login or teacher login.");
      },
      
      // Navigation commands
      'dashboard': () => {
        speak("Opening dashboard.");
        onCommand('dashboard');
      },
      'home': () => {
        speak("Going to home page.");
        onCommand('home');
      },
      'features': () => {
        speak("Showing features.");
        onCommand('features');
      },
      
      // Language commands
      'change language': () => {
        speak("Language options: English, Hindi, Kannada, Odia, Bengali, Telugu, Tamil.");
        onCommand('language_selector');
      },
      'english': () => changeLanguage('en', 'English'),
      'hindi': () => changeLanguage('hi', 'Hindi'),
      'kannada': () => changeLanguage('kn', 'Kannada'),
      'odia': () => changeLanguage('or', 'Odia'),
      'bengali': () => changeLanguage('bn', 'Bengali'),
      'telugu': () => changeLanguage('te', 'Telugu'),
      'tamil': () => changeLanguage('ta', 'Tamil'),
      
      // App control commands
      'help': () => {
        speak("Available commands: start, student login, teacher login, dashboard, change language, show voice panel, or say the name of any language to switch.");
        onCommand('help');
      },
      'show voice panel': () => {
        setShowPanel(true);
        speak("Voice control panel opened.");
      },
      'hide voice panel': () => {
        setShowPanel(false);
        speak("Voice control panel hidden.");
      },
      'mute voice': () => {
        setSpeechEnabled(false);
        speak("Voice feedback muted.");
      },
      'unmute voice': () => {
        setSpeechEnabled(true);
        speak("Voice feedback activated.");
      },
      
      // Accessibility commands
      'read mode': () => {
        speak("Activating read mode for better readability.");
        onCommand('read_mode', true);
      },
      'normal mode': () => {
        speak("Switching to normal mode.");
        onCommand('read_mode', false);
      },
      'high contrast': () => {
        speak("Activating high contrast mode.");
        onCommand('high_contrast', true);
      },
      'normal contrast': () => {
        speak("Switching to normal contrast.");
        onCommand('high_contrast', false);
      }
    };

    // Check for exact matches first
    if (commands[command]) {
      commands[command]();
      return;
    }

    // Check for partial matches or contains
    const partialMatches = Object.keys(commands).filter(key => 
      command.includes(key) || key.includes(command)
    );

    if (partialMatches.length > 0) {
      commands[partialMatches[0]]();
      return;
    }

    // Check if it's a name for login
    if (command.length > 2 && !command.includes('login') && !command.includes('change')) {
      speak(`Hello ${command}. Please specify if this is for student login or teacher login.`);
      onCommand('set_name', command);
      return;
    }

    // Fallback
    speak("I didn't understand that command. Say 'help' for available commands.");
    toast.error("Command not recognized. Say 'help' for available commands.");
  };

  const changeLanguage = (langCode: string, langName: string) => {
    speak(`Switching to ${langName}.`);
    onCommand('change_language', langCode);
  };

  const startListening = () => {
    if (!isSupported || !voiceEnabled) {
      toast.error("Voice commands not supported in this browser");
      return;
    }

    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        speak("Error starting voice recognition. Please try again.");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (!speechEnabled) {
      speak("Voice feedback activated.");
    }
  };

  if (!isEnabled || !isSupported) {
    return null;
  }

  return (
    <>
      {/* Minimal floating indicator */}
      <div className="fixed bottom-6 left-6 z-40">
        {/* Voice status indicator */}
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
          !isEnabled ? 'bg-red-400' : isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
        }`} title={
          !isEnabled ? "Voice commands disabled" : 
          isListening ? "Voice commands active" : "Voice commands inactive"
        } />
        
        {/* Command processing indicator */}
        {isProcessingCommand && (
          <div className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full animate-fade-in">
            Processing...
          </div>
        )}
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="mt-2 flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            <Volume2 className="w-3 h-3 animate-pulse" />
            Speaking
          </div>
        )}
      </div>

      {/* Full panel - only show when explicitly requested */}
      {showPanel && (
        <Card className="fixed bottom-20 right-6 w-80 z-40 bg-white/95 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Mic className="w-4 h-4" />
              Voice Control
              <Badge variant={isListening ? "default" : "secondary"} className="ml-auto">
                {isListening ? "Listening" : "Inactive"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPanel(false)}
                className="ml-2 p-1 h-auto"
              >
                <X className="w-3 h-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant={speechEnabled ? "default" : "outline"}
                size="sm"
                onClick={toggleSpeech}
                className="flex-1"
              >
                {speechEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {speechEnabled ? "Mute" : "Unmute"}
              </Button>
            </div>
            
            {transcript && (
              <div className="text-xs p-2 bg-gray-100 rounded">
                <div className="text-gray-600">Transcript:</div>
                <div>{transcript}</div>
              </div>
            )}
            
            {lastCommand && (
              <div className="text-xs p-2 bg-blue-50 rounded">
                <div className="text-blue-600">Last Command:</div>
                <div>"{lastCommand}"</div>
              </div>
            )}
            
            <div className="text-xs text-gray-500 space-y-1">
              <div>Voice commands are always active.</div>
              <div>Try: "start", "student login", "help"</div>
              <div>Say "hide voice panel" to close this.</div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}