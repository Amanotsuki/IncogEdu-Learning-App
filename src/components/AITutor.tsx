import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, User, Send, Lightbulb, BookOpen, Calculator, Mic, Volume2, RefreshCw, Heart, Star } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AITutorProps {
  currentSubject: string;
  currentTopic: string;
  studentProgress: any;
  currentLanguage: string;
}

interface Message {
  id: number;
  sender: 'student' | 'ai';
  content: string;
  timestamp: Date;
  type: 'text' | 'suggestion' | 'resource' | 'interactive';
  reactions?: string[];
  helpful?: boolean;
}

const predefinedResponses = {
  greeting: "Hello! I'm your AI tutor. I'm here to help you learn and clear any doubts you have. What would you like to study today?",
  math: "Great! Mathematics is all about patterns and problem-solving. What specific topic in math are you struggling with?",
  science: "Science is fascinating! It helps us understand the world around us. Which area of science interests you most?",
  doubt: "I understand you're confused. Let me break this down into simpler steps for you.",
  encouragement: "You're doing great! Remember, every expert was once a beginner. Keep practicing!",
  resources: "Here are some additional resources that might help you understand this topic better."
};

export function AITutor({ currentSubject, currentTopic, studentProgress, currentLanguage }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      content: "🌟 Hello! I'm your AI tutor, here to make learning fun and interactive! I can help you with any STEM subject. What would you like to explore today?",
      timestamp: new Date(),
      type: 'text',
      reactions: ['👋', '💡']
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [tutorPersonality, setTutorPersonality] = useState('friendly');
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userDifficulty, setUserDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const getSuggestedQuestions = () => {
    const baseQuestions = [
      "🤔 Explain this concept in simple terms",
      "📚 Give me an example", 
      "✨ What are the key points to remember?",
      "🌍 How is this used in real life?",
      "💪 Can you give me practice problems?",
      "🎯 Help me with my homework"
    ];

    const subjectSpecific = {
      math: [
        "🧮 Solve this step by step",
        "📐 Show me the formula",
        "💡 What's the trick to remember this?",
        "🎲 Give me a word problem"
      ],
      science: [
        "🔬 Show me a fun experiment", 
        "🌟 How does this work in nature?",
        "⚗️ What happens if we change this?",
        "🔍 Why does this phenomenon occur?"
      ],
      technology: [
        "💻 How is this used in apps?",
        "🤖 Show me a coding example",
        "🔧 What tools use this principle?",
        "🌐 How does this work on the internet?"
      ],
      engineering: [
        "🏗️ How do engineers use this?",
        "⚙️ What problems does this solve?",
        "🚀 Show me a cool application",
        "🔨 How would I build something with this?"
      ]
    };

    const subject = currentSubject.toLowerCase();
    const specificQuestions = subjectSpecific[subject] || subjectSpecific.science;
    
    return [...baseQuestions, ...specificQuestions];
  };

  const suggestedQuestions = getSuggestedQuestions();

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }

    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add student message
    const studentMessage: Message = {
      id: Date.now(),
      sender: 'student',
      content: message,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, studentMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Update conversation context
    setConversationContext(prev => [...prev.slice(-5), message.toLowerCase()]);
    
    // Analyze user difficulty level based on questions
    if (message.toLowerCase().includes('basic') || message.toLowerCase().includes('simple') || message.toLowerCase().includes('beginner')) {
      setUserDifficulty('beginner');
    } else if (message.toLowerCase().includes('advanced') || message.toLowerCase().includes('complex') || message.toLowerCase().includes('detailed')) {
      setUserDifficulty('advanced');
    }

    // Simulate AI response with realistic typing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        type: 'text',
        reactions: []
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Auto-speak AI response if speech mode is enabled
      setTimeout(() => speakMessage(aiResponse), 500);
      
      // Add contextual follow-up suggestions based on conversation
      setTimeout(() => {
        const getContextualFollowUp = () => {
          const recentTopics = conversationContext.slice(-3).join(' ');
          
          if (recentTopics.includes('example') || recentTopics.includes('explain')) {
            return [
              "🎯 Would you like a practice problem to test your understanding?",
              "💪 Ready to try applying this concept?",
              "🔄 Need me to explain it differently?",
              "📝 Want to see this in a different context?"
            ];
          } else if (recentTopics.includes('practice') || recentTopics.includes('problem')) {
            return [
              "📚 Should I explain the theory behind this?",
              "🌟 Want to see how this connects to other topics?",
              "⚡ Ready for a more challenging problem?",
              "🎯 Need clarification on any step?"
            ];
          } else if (recentTopics.includes('homework') || recentTopics.includes('assignment')) {
            return [
              "💡 Need help understanding the underlying concept?",
              "🔍 Want me to check your approach?",
              "📖 Should we review related topics?",
              "🎯 Any specific part giving you trouble?"
            ];
          }
          
          return [
            "🎯 Would you like a practice problem to test your understanding?",
            "📚 Should I explain any part in more detail?",
            "🌟 Want to see how this connects to other topics?",
            "💡 Ready for the next concept, or need more practice?"
          ];
        };
        
        const followUpSuggestions = getContextualFollowUp();
        const suggestionMessage: Message = {
          id: Date.now() + 2,
          sender: 'ai',
          content: followUpSuggestions[Math.floor(Math.random() * followUpSuggestions.length)],
          timestamp: new Date(),
          type: 'suggestion'
        };
        setMessages(prev => [...prev, suggestionMessage]);
      }, 1500);
    }, Math.random() * 1000 + 1500); // More realistic response time
  };

  const generateAIResponse = (studentMessage: string): string => {
    const lowerMessage = studentMessage.toLowerCase();
    
    // Enhanced subject-specific responses
    const getSubjectSpecificResponse = (topic: string, subject: string) => {
      const responses: { [key: string]: any } = {
        math: {
          explain: [
            `🔢 Let me break down ${topic} step by step! In mathematics, every concept builds on previous ones. ${topic} is like solving a puzzle - each piece has its place and purpose.`,
            `📐 Great question about ${topic}! Think of it as a mathematical tool that helps us solve real problems. Let me show you the core principles...`,
            `🎯 ${topic} is fascinating! It's all about patterns and relationships. Here's how we can understand it logically...`
          ],
          example: [
            `💰 Here's a practical example: If you're calculating ${topic}, imagine you're managing a budget or measuring something in real life...`,
            `🏗️ Let's use a building analogy for ${topic}: Just like architects use blueprints, mathematicians use formulas...`,
            `🎮 Think of ${topic} like a game strategy - there are rules and optimal moves you can make!`
          ]
        },
        science: {
          explain: [
            `🔬 Excellent question about ${topic}! Science is all about understanding how our world works. ${topic} is a key concept that explains natural phenomena around us.`,
            `🌟 ${topic} is amazing! It's one of those scientific principles that helps us understand everything from tiny atoms to massive galaxies.`,
            `⚡ Let me explain ${topic} by connecting it to things you see every day. Science is everywhere around us!`
          ],
          example: [
            `🌍 Here's how ${topic} works in nature: You can observe this principle when you look at weather patterns, animal behavior, or even cooking!`,
            `🔋 A great example of ${topic} is in technology we use daily - like smartphones, cars, or even LED lights...`,
            `🌱 In biology, ${topic} is like a fundamental rule that living things follow. For instance, plants and animals...`
          ]
        },
        technology: {
          explain: [
            `💻 ${topic} is at the heart of modern technology! It's the principle that makes our digital world possible.`,
            `🚀 Technology concept like ${topic} is what engineers use to create the amazing devices and systems we use every day.`,
            `⚙️ Understanding ${topic} helps us see how technology solves real-world problems efficiently and effectively.`
          ],
          example: [
            `📱 You experience ${topic} every time you use your smartphone, computer, or any digital device...`,
            `🏭 In industry, ${topic} is used to automate processes, improve efficiency, and create better products...`,
            `🌐 The internet itself relies on principles like ${topic} to connect billions of devices worldwide!`
          ]
        },
        engineering: {
          explain: [
            `🔧 ${topic} is a fundamental engineering principle! Engineers use this to design and build everything from bridges to spacecraft.`,
            `🏗️ In engineering, ${topic} helps us solve complex problems by applying scientific principles to real-world challenges.`,
            `⚡ ${topic} is crucial for creating safe, efficient, and innovative solutions that improve people's lives.`
          ],
          example: [
            `🌉 Engineers apply ${topic} when designing bridges, buildings, or vehicles to ensure they're safe and functional...`,
            `🚗 In automotive engineering, ${topic} principles help create more efficient engines, better safety systems...`,
            `🛰️ Space engineers use ${topic} to design rockets and satellites that can survive the harsh conditions of space!`
          ]
        }
      };
      
      const subjectKey = subject.toLowerCase();
      return responses[subjectKey] || responses.science; // Default to science if subject not found
    };

    // Specific math topics
    if (lowerMessage.includes('algebra') || lowerMessage.includes('equation')) {
      return `🧮 Algebra is like learning a new language - the language of mathematics! ${lowerMessage.includes('equation') ? 'Equations are mathematical sentences that tell us two things are equal.' : 'Algebra helps us find unknown values using letters and numbers.'} What specific part would you like me to explain?`;
    }
    
    if (lowerMessage.includes('geometry') || lowerMessage.includes('triangle') || lowerMessage.includes('circle')) {
      return `📐 Geometry is all around us! Every building, artwork, and natural formation uses geometric principles. ${lowerMessage.includes('triangle') ? 'Triangles are the strongest shapes in construction!' : lowerMessage.includes('circle') ? 'Circles represent perfect symmetry and appear everywhere in nature!' : 'Geometry helps us understand shapes, sizes, and spaces.'} What would you like to explore?`;
    }
    
    if (lowerMessage.includes('physics') || lowerMessage.includes('force') || lowerMessage.includes('energy')) {
      return `⚡ Physics explains how everything in the universe works! ${lowerMessage.includes('force') ? 'Forces are pushes and pulls that make things move or change shape.' : lowerMessage.includes('energy') ? 'Energy is the ability to cause change - it\'s what makes everything happen!' : 'Physics connects mathematics to the real world around us.'} Let's dive deeper into this fascinating topic!`;
    }
    
    if (lowerMessage.includes('chemistry') || lowerMessage.includes('atom') || lowerMessage.includes('molecule')) {
      return `🧪 Chemistry is like cooking with atoms! ${lowerMessage.includes('atom') ? 'Atoms are the building blocks of everything - like LEGO pieces of the universe!' : lowerMessage.includes('molecule') ? 'Molecules are groups of atoms that work together, like teams in sports!' : 'Chemistry shows us how different substances interact and transform.'} What chemical mystery shall we solve?`;
    }
    
    if (lowerMessage.includes('biology') || lowerMessage.includes('cell') || lowerMessage.includes('life')) {
      return `🌱 Biology is the study of life itself! ${lowerMessage.includes('cell') ? 'Cells are like tiny factories that keep all living things working!' : 'Every living thing, from bacteria to blue whales, follows the same basic principles of life.'} Life is incredibly diverse and fascinating - what aspect interests you most?`;
    }

    // Enhanced keyword matching with subject context
    const subjectResponses = getSubjectSpecificResponse(currentTopic, currentSubject);
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does')) {
      return subjectResponses.explain[Math.floor(Math.random() * subjectResponses.explain.length)];
    }
    
    if (lowerMessage.includes('example') || lowerMessage.includes('show me')) {
      return subjectResponses.example[Math.floor(Math.random() * subjectResponses.example.length)];
    }
    
    if (lowerMessage.includes('confused') || lowerMessage.includes('don\'t understand') || lowerMessage.includes('help') || lowerMessage.includes('difficult')) {
      return `🤗 No worries at all! ${currentTopic} can seem challenging at first, but that's completely normal. Let me break it down into smaller, easier pieces. Every expert was once a beginner! What specific part is giving you trouble?`;
    }
    
    if (lowerMessage.includes('practice') || lowerMessage.includes('problem') || lowerMessage.includes('exercise') || lowerMessage.includes('quiz')) {
      return `🎯 Excellent! Practice is the best way to master ${currentTopic}. I can create some engaging problems that match your level. Would you like to start with easier problems to build confidence, or jump into more challenging ones?`;
    }
    
    if (lowerMessage.includes('homework') || lowerMessage.includes('assignment')) {
      return `📚 I'd be happy to help you with your homework on ${currentTopic}! Remember, I'm here to guide you to understand the concepts, not just give answers. What specific problem or concept from your assignment can I help explain?`;
    }
    
    if (lowerMessage.includes('test') || lowerMessage.includes('exam') || lowerMessage.includes('preparation')) {
      return `📝 Test preparation is smart planning! For ${currentTopic}, I recommend: 1) Understanding core concepts first, 2) Practicing different problem types, 3) Identifying areas you find challenging. What part of ${currentTopic} would you like to review for your test?`;
    }
    
    if (lowerMessage.includes('real life') || lowerMessage.includes('application') || lowerMessage.includes('use')) {
      return `🌍 Great question! ${currentTopic} has many real-world applications. From technology in your phone to the engineering in buildings around you, this concept is used everywhere. Would you like me to show you specific examples of how ${currentTopic} is used in careers or daily life?`;
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('awesome')) {
      return `🌟 You're very welcome! I love seeing your enthusiasm for learning ${currentTopic}. Your positive attitude will take you far in ${currentSubject}. Is there anything else about ${currentTopic} you'd like to explore?`;
    }
    
    if (lowerMessage.includes('boring') || lowerMessage.includes('hard') || lowerMessage.includes('hate')) {
      return `💪 I understand that ${currentTopic} might seem challenging right now, but I promise it can become interesting and even fun! Sometimes we just need to find the right angle or connection that makes it click. What if we approached ${currentTopic} through something you already enjoy?`;
    }
    
    // Math-specific operations
    if (lowerMessage.includes('solve') || lowerMessage.includes('calculate')) {
      return `🧮 I'd love to help you solve problems with ${currentTopic}! Please share the specific problem you're working on, and I'll guide you through it step by step. Remember, understanding the process is more important than just getting the answer!`;
    }
    
    // Default intelligent response based on context
    return `🎓 That's an interesting question about ${currentTopic}! In ${currentSubject}, this concept connects to many other important ideas. To give you the most helpful explanation, could you tell me more specifically what aspect you'd like to understand? Are you looking for the basic definition, practical applications, or help with a specific problem?`;
  };

  const handleVoiceInput = () => {
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
    toast.success("🎤 Listening... Ask me anything!");

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      toast.success(`Got it: "${transcript}"`);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
      toast.error("Could not understand. Please try again!");
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[🎯💡🌟🔍🎮🌍🤗💪🎉🏆💫]/g, ''));
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
      toast.success("🔊 Reading message aloud...");
    } else {
      toast.error("Text-to-speech not supported");
    }
  };

  const addReaction = (messageId: number, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
    toast.success(`Added reaction: ${reaction}`);
  };

  const markAsHelpful = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, helpful: true }
        : msg
    ));
    toast.success("✅ Marked as helpful! This helps me learn to assist you better.");
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>AI Tutor</CardTitle>
                <CardDescription>
                  Currently helping with: {currentSubject} - {currentTopic}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={userDifficulty === 'beginner' ? 'default' : 'outline'} className="text-xs">
                Beginner
              </Badge>
              <Badge variant={userDifficulty === 'intermediate' ? 'default' : 'outline'} className="text-xs">
                Intermediate
              </Badge>
              <Badge variant={userDifficulty === 'advanced' ? 'default' : 'outline'} className="text-xs">
                Advanced
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ScrollArea className="h-96 p-4 border rounded-lg">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === 'student' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex gap-2 max-w-[80%] ${
                          message.sender === 'student' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div className={`p-2 rounded-full flex-shrink-0 ${
                          message.sender === 'student' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100'
                        }`}>
                          {message.sender === 'student' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === 'student'
                              ? 'bg-blue-500 text-white'
                              : message.type === 'suggestion'
                              ? 'bg-yellow-50 border border-yellow-200'
                              : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.sender === 'ai' && (
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => speakMessage(message.content)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsHelpful(message.id)}
                                  className={`h-6 w-6 p-0 ${message.helpful ? 'text-green-500' : ''}`}
                                >
                                  <Heart className={`w-3 h-3 ${message.helpful ? 'fill-current' : ''}`} />
                                </Button>
                                <div className="flex gap-1">
                                  {['👍', '🎉', '💡', '🤔'].map(emoji => (
                                    <Button
                                      key={emoji}
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => addReaction(message.id, emoji)}
                                      className="h-6 w-6 p-0 text-xs"
                                    >
                                      {emoji}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {message.reactions && message.reactions.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {message.reactions.map((reaction, idx) => (
                                <span key={idx} className="text-xs bg-white bg-opacity-50 rounded px-1">
                                  {reaction}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-xs text-blue-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Type your question or use voice input..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(inputMessage)}
                  className="flex-1"
                />
                <Button
                  variant={isListening ? "default" : "outline"}
                  onClick={handleVoiceInput}
                  className={`${isListening ? 'animate-pulse bg-red-500' : ''}`}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                💡 Tip: Use voice input or type your questions. I'm here to help you learn! 🎯
              </p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Quick Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start text-xs h-auto p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    AI Tutor Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setMessages([{
                      id: Date.now(),
                      sender: 'ai',
                      content: "🔄 Hi again! I'm refreshed and ready to help you learn something new! What shall we explore?",
                      timestamp: new Date(),
                      type: 'text',
                      reactions: []
                    }])}
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Start Fresh Conversation
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="p-2 bg-green-50 rounded">
                      💚 Real-time responses
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      🎤 Voice input enabled
                    </div>
                    <div className="p-2 bg-purple-50 rounded">
                      🔊 Text-to-speech ready
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Smart Study Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-2 bg-green-50 rounded text-xs">
                    💡 Ask specific questions for better answers
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-xs">
                    🎯 Practice problems help retention
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-xs">
                    🔄 Review concepts regularly
                  </div>
                  <div className="p-2 bg-orange-50 rounded text-xs">
                    🤝 Don't hesitate to ask for help!
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}