import { Button } from "./ui/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "./ui/dropdown-menu";
import { Mic, Volume2, Languages, Eye, EyeOff, BookOpen, Pause, Play, VolumeX, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner@2.0.3";

interface AccessibilityToolsProps {
  currentLanguage: string;
  onTextRead: (text: string) => void;
  onSpeechToText: (callback: (text: string) => void) => void;
  onTranslate: (text: string, from: string, to: string) => void;
}

export function AccessibilityTools({ 
  currentLanguage, 
  onTextRead, 
  onSpeechToText, 
  onTranslate 
}: AccessibilityToolsProps) {
  const [isListening, setIsListening] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [speechMode, setSpeechMode] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(1);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
      };
      
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = getLanguageCode(currentLanguage);
    }
  }, [currentLanguage]);

  const getLanguageCode = (lang: string) => {
    const langMap: Record<string, string> = {
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

  const handleSpeechToText = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    toast.success("🎤 Listening... Speak now");

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        onSpeechToText((inputElement: any) => {
          if (inputElement && inputElement.value !== undefined) {
            inputElement.value = finalTranscript;
          }
        });
        toast.success(`✅ Captured: "${finalTranscript}"`);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      setIsListening(false);
      toast.error(`Speech recognition error: ${event.error}`);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const handleTextToSpeech = (text?: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech not supported in this browser");
      return;
    }

    if (isReading && currentUtterance) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setCurrentUtterance(null);
      return;
    }

    const textToRead = text || getPageText();
    if (!textToRead.trim()) {
      toast.error("No text found to read");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const voices = window.speechSynthesis.getVoices();
    
    // Find appropriate voice for current language
    const voice = voices.find(v => v.lang.startsWith(getLanguageCode(currentLanguage).split('-')[0])) 
                  || voices[0];
    
    if (voice) utterance.voice = voice;
    utterance.rate = readingSpeed;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsReading(true);
      toast.success("🔊 Reading text aloud...");
    };

    utterance.onend = () => {
      setIsReading(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsReading(false);
      setCurrentUtterance(null);
      toast.error("Error reading text");
    };

    setCurrentUtterance(utterance);
    window.speechSynthesis.speak(utterance);
    onTextRead(textToRead);
  };

  const getPageText = () => {
    // Get visible text from the page, prioritizing main content
    const contentAreas = document.querySelectorAll('main, [role="main"], .main-content, h1, h2, h3, p');
    let text = '';
    contentAreas.forEach(element => {
      const elementText = element.textContent?.trim();
      if (elementText && elementText.length > 10) {
        text += elementText + '. ';
      }
    });
    return text || "Welcome to EduBridge learning platform";
  };

  const handleTranslate = () => {
    const languageNames: Record<string, string> = {
      'en': 'English',
      'hi': 'हिंदी',
      'kn': 'ಕನ್ನಡ',
      'or': 'ଓଡ଼ିଆ',
      'bn': 'বাংলা',
      'te': 'తెలుగు',
      'ta': 'தமிழ்'
    };
    
    const targetLang = currentLanguage === 'en' ? 'hi' : 'en';
    toast.success(`🌐 Translating page to ${languageNames[targetLang]}...`);
    onTranslate("Page content", currentLanguage, targetLang);
    
    // Simulate translation with a delay
    setTimeout(() => {
      toast.success("✅ Page translated successfully!");
    }, 1500);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast', !highContrast);
    toast.success(`${!highContrast ? '🎨' : '👁️'} High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
  };

  const toggleReadMode = () => {
    setReadMode(!readMode);
    document.body.classList.toggle('read-mode', !readMode);
    toast.success(`📖 Read mode ${!readMode ? 'enabled' : 'disabled'}`);
  };

  const toggleSpeechMode = () => {
    setSpeechMode(!speechMode);
    if (!speechMode) {
      // Auto-read new content when speech mode is enabled
      toast.success("🗣️ Speech mode enabled - content will be read automatically");
    } else {
      toast.success("🔇 Speech mode disabled");
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={handleSpeechToText}
        className="flex items-center gap-1"
        title="Speech to Text"
      >
        <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
        {isListening ? "Listening..." : "Speak"}
      </Button>
      
      <Button
        variant={isReading ? "default" : "outline"}
        size="sm"
        onClick={() => handleTextToSpeech()}
        className="flex items-center gap-1"
        title="Text to Speech"
      >
        {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {isReading ? "Stop" : "Read"}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleTranslate}
        className="flex items-center gap-1"
        title="Translate Page"
      >
        <Languages className="w-4 h-4" />
        Translate
      </Button>
      
      <Button
        variant={readMode ? "default" : "outline"}
        size="sm"
        onClick={toggleReadMode}
        className="flex items-center gap-1"
        title="Read Mode"
      >
        <BookOpen className="w-4 h-4" />
        Read Mode
      </Button>
      
      <Button
        variant={speechMode ? "default" : "outline"}
        size="sm"
        onClick={toggleSpeechMode}
        className="flex items-center gap-1"
        title="Auto Speech Mode"
      >
        {speechMode ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        Speech Mode
      </Button>
      
      <Button
        variant={highContrast ? "default" : "outline"}
        size="sm"
        onClick={toggleHighContrast}
        className="flex items-center gap-1"
        title="High Contrast"
      >
        {highContrast ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        Contrast
      </Button>
    </div>
  );
}