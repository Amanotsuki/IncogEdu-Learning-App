import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Globe, 
  Accessibility, 
  Wifi, 
  WifiOff,
  Eye,
  Mic,
  Volume2,
  Languages,
  Brain,
  MessageCircle,
  Bell,
  X
} from "lucide-react";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { LanguageSelector } from "./components/LanguageSelector";
import { AITutor } from "./components/AITutor";
import { VoiceControl } from "./components/VoiceControl";
import { useTranslation } from "./components/translations";
import { toast, Toaster } from "sonner@2.0.3";

type UserRole = 'student' | 'teacher' | null;

interface User {
  name: string;
  role: UserRole;
  id: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Welcome to EduBridge!", message: "Your learning journey starts now", time: "2 min ago", unread: true },
    { id: 2, title: "New STEM Content Available", message: "Check out the latest Physics lessons", time: "1 hour ago", unread: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loginForm, setLoginForm] = useState({
    name: '',
    role: '' as UserRole,
    userId: ''
  });
  
  // Voice control states
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [pendingName, setPendingName] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  // Get translation for current language
  const t = useTranslation(currentLanguage);

  // Mock offline data indicator
  const offlineDataSize = "250 MB";
  const lastSync = "2 hours ago";

  // Apply language class to document body for font changes
  useEffect(() => {
    // Remove all existing language classes
    const languageCodes = ['en', 'hi', 'kn', 'or', 'bn', 'te', 'ta'];
    languageCodes.forEach(code => {
      document.body.classList.remove(`lang-${code}`);
    });
    
    // Add current language class
    document.body.classList.add(`lang-${currentLanguage}`);
  }, [currentLanguage]);

  // Apply accessibility classes to document body
  useEffect(() => {
    document.body.classList.toggle('read-mode', readMode);
    document.body.classList.toggle('high-contrast', highContrast);
  }, [readMode, highContrast]);

  const handleLogin = () => {
    if (!loginForm.name || !loginForm.role) {
      toast.error("Please fill in all fields");
      return;
    }

    const user: User = {
      name: loginForm.name,
      role: loginForm.role,
      id: loginForm.userId || Math.random().toString(36).substr(2, 9)
    };

    setCurrentUser(user);
    toast.success(`Welcome ${user.name}! You are logged in as ${user.role}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginForm({ name: '', role: null, userId: '' });
    toast.success("Successfully logged out");
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    const languageNames = {
      'en': 'English',
      'hi': 'हिंदी',
      'kn': 'ಕನ್ನಡ',
      'or': 'ଓଡ଼ିଆ',
      'bn': 'বাংলা',
      'te': 'తెలుగు',
      'ta': 'தமிழ்'
    };
    toast.success(`Language changed to ${languageNames[language] || language}`);
  };

  const toggleOfflineMode = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? "Switched to offline mode" : "Connected to internet");
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
    toast.success("All notifications cleared");
  };

  // Voice command handler
  const handleVoiceCommand = (command: string, params?: any) => {
    switch (command) {
      case 'start_login':
        setActiveTab('login');
        break;
        
      case 'student_login':
        setLoginForm({ ...loginForm, role: 'student' });
        setActiveTab('login');
        break;
        
      case 'teacher_login':
        setLoginForm({ ...loginForm, role: 'teacher' });
        setActiveTab('login');
        break;
        
      case 'set_name':
        if (params && typeof params === 'string') {
          setPendingName(params);
          setLoginForm({ ...loginForm, name: params });
          toast.success(`Name set to ${params}. Please specify student or teacher login.`);
        }
        break;
        
      case 'dashboard':
        if (currentUser) {
          // Already on dashboard, no action needed
          toast.success("Already on dashboard");
        } else {
          toast.error("Please login first");
        }
        break;
        
      case 'home':
        setActiveTab('login');
        break;
        
      case 'features':
        setActiveTab('features');
        break;
        
      case 'language_selector':
        // Trigger language selector focus or visibility
        toast.success("Use voice commands: say 'English', 'Hindi', 'Kannada', etc.");
        break;
        
      case 'change_language':
        if (params) {
          handleLanguageChange(params);
        }
        break;
        
      case 'read_mode':
        setReadMode(params);
        document.body.classList.toggle('read-mode', params);
        toast.success(params ? "Read mode activated" : "Read mode deactivated");
        break;
        
      case 'high_contrast':
        setHighContrast(params);
        document.body.classList.toggle('high-contrast', params);
        toast.success(params ? "High contrast activated" : "High contrast deactivated");
        break;
        
      case 'help':
        // Help is handled by the VoiceControl component
        break;
        
      case 'logout':
        if (currentUser) {
          handleLogout();
        } else {
          toast.error("You are not logged in");
        }
        break;
        
      case 'login_with_pending_name':
        if (pendingName && loginForm.role) {
          handleLogin();
          setPendingName('');
        }
        break;
        
      default:
        console.log('Unhandled voice command:', command, params);
    }
  };

  // Auto-login if we have a pending name and role selected via voice
  useEffect(() => {
    if (pendingName && loginForm.role && loginForm.name === pendingName && !currentUser) {
      handleLogin();
      setPendingName('');
    }
  }, [pendingName, loginForm.role, loginForm.name, currentUser]);

  // If user is logged in, show their dashboard
  if (currentUser) {
    if (currentUser.role === 'student') {
      return (
        <div>
          <StudentDashboard
            studentName={currentUser.name}
            onLogout={handleLogout}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            voiceControlEnabled={voiceControlEnabled}
            onVoiceControlToggle={() => {
              setVoiceControlEnabled(!voiceControlEnabled);
              toast.success(voiceControlEnabled ? "Voice commands disabled" : "Voice commands enabled");
            }}
          />
          <VoiceControl
            currentLanguage={currentLanguage}
            onCommand={handleVoiceCommand}
            isEnabled={voiceControlEnabled}
          />
          <Toaster />
        </div>
      );
    } else if (currentUser.role === 'teacher') {
      return (
        <div>
          <TeacherDashboard
            teacherName={currentUser.name}
            onLogout={handleLogout}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            voiceControlEnabled={voiceControlEnabled}
            onVoiceControlToggle={() => {
              setVoiceControlEnabled(!voiceControlEnabled);
              toast.success(voiceControlEnabled ? "Voice commands disabled" : "Voice commands enabled");
            }}
          />
          <VoiceControl
            currentLanguage={currentLanguage}
            onCommand={handleVoiceCommand}
            isEnabled={voiceControlEnabled}
          />
          <Toaster />
        </div>
      );
    }
  }

  // Login/Welcome screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl">{t.appName}</h1>
                <p className="text-sm text-muted-foreground">{t.appDescription}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Voice Control Toggle */}
              <Button
                variant={voiceControlEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setVoiceControlEnabled(!voiceControlEnabled);
                  toast.success(voiceControlEnabled ? "Voice commands disabled" : "Voice commands enabled");
                }}
                className="flex items-center gap-2"
              >
                <Mic className={`w-4 h-4 ${voiceControlEnabled ? 'text-white' : 'text-gray-600'}`} />
                {voiceControlEnabled ? 'Voice On' : 'Voice Off'}
              </Button>

              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />

              {/* Notifications */}
              <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative"
                  >
                    <Bell className="w-4 h-4" />
                    {notifications.filter(n => n.unread).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      Notifications
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllNotifications}
                        disabled={notifications.length === 0}
                      >
                        Clear All
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-4">
                    {notifications.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No notifications</p>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${
                            notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleOfflineMode}
                className="flex items-center gap-2"
              >
                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                {isOnline ? t.online : t.offline}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1596496555041-9e0f141ca4b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNobm9sb2d5JTIwc3R1ZGVudHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTc2MDEwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students using educational technology"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t.heroDescription}
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <Brain className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm">{t.aiTutoring}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <Globe className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-sm">{t.multilingual}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <WifiOff className="w-8 h-8 text-purple-500 mb-2" />
              <span className="text-sm">{t.offlineReady}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <Accessibility className="w-8 h-8 text-orange-500 mb-2" />
              <span className="text-sm">{t.accessible}</span>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {t.getStarted}
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t.features}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Student Login */}
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                  <CardHeader className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>{t.studentPortal}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">{t.studentName}</Label>
                      <Input
                        id="student-name"
                        placeholder={t.enterYourName}
                        value={loginForm.role === 'student' ? loginForm.name : ''}
                        onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value, role: 'student' })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-id">{t.studentId} ({t.optional})</Label>
                      <Input
                        id="student-id"
                        placeholder={`${t.enterYourName.replace('name', 'student ID')}`}
                        value={loginForm.role === 'student' ? loginForm.userId : ''}
                        onChange={(e) => setLoginForm({ ...loginForm, userId: e.target.value })}
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
                      onClick={handleLogin}
                      disabled={!loginForm.name || loginForm.role !== 'student'}
                    >
                      {t.startLearning}
                    </Button>
                    <div className="text-xs text-muted-foreground text-center">
                      {t.gradesAndFocus}
                    </div>
                  </CardContent>
                </Card>

                {/* Teacher Login */}
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>
                  <CardHeader className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle>{t.teacherPortal}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-name">{t.teacherName}</Label>
                      <Input
                        id="teacher-name"
                        placeholder={t.enterYourName}
                        value={loginForm.role === 'teacher' ? loginForm.name : ''}
                        onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value, role: 'teacher' })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacher-id">{t.teacherId} ({t.optional})</Label>
                      <Input
                        id="teacher-id"
                        placeholder={`Enter your teacher ID`}
                        value={loginForm.role === 'teacher' ? loginForm.userId : ''}
                        onChange={(e) => setLoginForm({ ...loginForm, userId: e.target.value })}
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                      onClick={handleLogin}
                      disabled={!loginForm.name || loginForm.role !== 'teacher'}
                    >
                      {t.accessDashboard}
                    </Button>
                    <div className="text-xs text-muted-foreground text-center">
                      {t.analyticsAndTracking}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Voice Commands Help */}
              <Card className="mt-6 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 transition-all ${
                      voiceControlEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        🎤 Voice Commands {voiceControlEnabled ? 'Active' : 'Available'}
                      </h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {!voiceControlEnabled && (
                          <p className="text-blue-600 font-medium mb-2">
                            Click "Voice On" button above to enable voice commands
                          </p>
                        )}
                        <p>• Say <strong>"start"</strong> to begin login process</p>
                        <p>• Say <strong>"student login"</strong> or <strong>"teacher login"</strong></p>
                        <p>• Say your name, then specify your role</p>
                        <p>• Say <strong>"help"</strong> for more commands</p>
                        <p>• Say <strong>"show voice panel"</strong> to see controls</p>
                        <p>• Language names: "English", "Hindi", "Kannada", etc.</p>
                        {voiceControlEnabled ? (
                          <p className="text-green-600 font-medium">Voice recognition is active</p>
                        ) : (
                          <p className="text-gray-600">Enable voice commands to use these features</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Offline Status */}
              {!isOnline && (
                <Card className="mt-6 border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <WifiOff className="w-5 h-5 text-orange-600" />
                      <div>
                        <h4 className="text-sm">Offline Mode Active</h4>
                        <p className="text-xs text-muted-foreground">
                          Using cached content ({offlineDataSize}) • Last sync: {lastSync}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* STEM Education */}
                <Card>
                  <CardHeader>
                    <div className="p-2 bg-blue-100 rounded-lg w-fit mb-2">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">STEM Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Interactive lessons for Grades 6-12</li>
                      <li>• Hands-on experiments and projects</li>
                      <li>• Real-world problem solving</li>
                      <li>• Progressive skill building</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AI Tutoring */}
                <Card>
                  <CardHeader>
                    <div className="p-2 bg-purple-100 rounded-lg w-fit mb-2">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">AI Tutoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• 24/7 doubt clearing assistance</li>
                      <li>• Personalized learning paths</li>
                      <li>• Instant feedback and explanations</li>
                      <li>• Progress tracking and recommendations</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Accessibility */}
                <Card>
                  <CardHeader>
                    <div className="p-2 bg-green-100 rounded-lg w-fit mb-2">
                      <Accessibility className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mic className="w-4 h-4 text-blue-500" />
                        Speech-to-text input
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Volume2 className="w-4 h-4 text-green-500" />
                        Text-to-speech output
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Languages className="w-4 h-4 text-purple-500" />
                        Real-time translation
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4 text-orange-500" />
                        High contrast mode
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Multilingual Support */}
                <Card>
                  <CardHeader>
                    <div className="p-2 bg-orange-100 rounded-lg w-fit mb-2">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Multilingual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">English</Badge>
                      <Badge variant="outline">हिंदी</Badge>
                      <Badge variant="outline">ಕನ್ನಡ</Badge>
                      <Badge variant="outline">ଓଡ଼ିଆ</Badge>
                      <Badge variant="outline">বাংলা</Badge>
                      <Badge variant="outline">తెలుగు</Badge>
                      <Badge variant="outline">தமிழ்</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Seamless language switching with preserved progress
                    </p>
                  </CardContent>
                </Card>

                {/* Offline Capability */}
                <Card>
                  <CardHeader>
                    <div className="p-2 bg-red-100 rounded-lg w-fit mb-2">
                      <WifiOff className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">Offline Ready</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Pre-loaded content packages</li>
                      <li>• Offline progress tracking</li>
                      <li>• Sync when connected</li>
                      <li>• Works on low-cost devices</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Gamification */}
                <Card>
                  <CardHeader>
                    <div className="p-2 bg-yellow-100 rounded-lg w-fit mb-2">
                      <GraduationCap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <CardTitle className="text-lg">Gamified Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Points and achievement system</li>
                      <li>• Interactive learning games</li>
                      <li>• Progress streaks and rewards</li>
                      <li>• Competitive challenges</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <Separator className="my-12" />
        <div className="text-center text-sm text-muted-foreground">
          <p>EduBridge • Empowering Rural Education Through Technology</p>
          <p className="mt-2">Designed for grades 6-12 • Supporting 15%+ improvement in learning outcomes</p>
        </div>
      </div>

      {/* Floating AI Tutor Chatbot */}
      <Sheet open={showChatbot} onOpenChange={setShowChatbot}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            size="icon"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[600px] p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              AI Tutor
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatbot(false)}
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          <div className="h-full p-6 pt-0">
            <AITutor
              currentSubject="General"
              currentTopic="Welcome"
              studentProgress={{}}
              currentLanguage={currentLanguage}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Voice Control */}
      <VoiceControl
        currentLanguage={currentLanguage}
        onCommand={handleVoiceCommand}
        isEnabled={voiceControlEnabled}
      />

      <Toaster />
    </div>
  );
}