import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Brain, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Users,
  Volume2,
  VolumeX,
  Mic
} from "lucide-react";
import { STEMSubjects } from "./STEMSubjects";
import { InteractiveGame } from "./InteractiveGame";
import { AITutor } from "./AITutor";
import { AccessibilityTools } from "./AccessibilityTools";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "./translations";
import { toast } from "sonner@2.0.3";


interface StudentDashboardProps {
  studentName: string;
  onLogout: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  voiceControlEnabled?: boolean;
  onVoiceControlToggle?: () => void;
}

interface StudentProgress {
  totalPoints: number;
  level: number;
  completedLessons: number;
  currentStreak: number;
  subjects: {
    math: number;
    science: number;
    technology: number;
    engineering: number;
  };
  grade: number;
}

export function StudentDashboard({ 
  studentName, 
  onLogout, 
  currentLanguage, 
  onLanguageChange,
  voiceControlEnabled = false,
  onVoiceControlToggle
}: StudentDashboardProps) {
  const [selectedGrade, setSelectedGrade] = useState(8);
  const [currentView, setCurrentView] = useState<'dashboard' | 'subjects' | 'game' | 'tutor'>('dashboard');
  const [currentGame, setCurrentGame] = useState<{subject: string; topic: string} | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const t = useTranslation(currentLanguage);

  // Generate grade-specific content
  const getGradeSpecificContent = (grade: number) => {
    const baseProgress = {
      totalPoints: 1000 + (grade - 6) * 500 + Math.floor(Math.random() * 300),
      level: Math.max(1, grade - 4 + Math.floor(Math.random() * 3)),
      completedLessons: 5 + (grade - 6) * 8 + Math.floor(Math.random() * 15),
      currentStreak: Math.floor(Math.random() * 10) + 1,
      subjects: {
        math: 60 + Math.floor(Math.random() * 30) + (grade - 6) * 2,
        science: 55 + Math.floor(Math.random() * 35) + (grade - 6) * 2,
        technology: 50 + Math.floor(Math.random() * 40) + (grade - 6) * 3,
        engineering: 45 + Math.floor(Math.random() * 45) + (grade - 6) * 3
      },
      grade: grade
    };
    return baseProgress;
  };

  const studentProgress: StudentProgress = getGradeSpecificContent(selectedGrade);

  const getGradeSpecificAchievements = (grade: number) => {
    const achievements = {
      6: [
        { title: "Math Beginner", description: "Completed basic arithmetic lessons", date: "2 days ago", icon: "🔢" },
        { title: "Science Curious", description: "Perfect score in simple machines quiz", date: "1 week ago", icon: "🔬" },
        { title: "Young Builder", description: "Built first simple machine model", date: "2 weeks ago", icon: "🔧" }
      ],
      7: [
        { title: "Algebra Explorer", description: "Mastered linear equations", date: "2 days ago", icon: "📐" },
        { title: "Lab Assistant", description: "Perfect score in chemistry basics", date: "1 week ago", icon: "🧪" },
        { title: "Code Starter", description: "Created first computer program", date: "2 weeks ago", icon: "💻" }
      ],
      8: [
        { title: "Geometry Master", description: "Solved complex geometric problems", date: "2 days ago", icon: "📏" },
        { title: "Physics Enthusiast", description: "Perfect score in motion physics", date: "1 week ago", icon: "⚗️" },
        { title: "Tech Innovator", description: "Built interactive web page", date: "2 weeks ago", icon: "🌐" }
      ],
      9: [
        { title: "Advanced Calculator", description: "Mastered quadratic equations", date: "2 days ago", icon: "🧮" },
        { title: "Biology Expert", description: "Perfect understanding of cell biology", date: "1 week ago", icon: "🔬" },
        { title: "App Developer", description: "Created mobile app prototype", date: "2 weeks ago", icon: "📱" }
      ],
      10: [
        { title: "Math Champion", description: "Excelled in trigonometry", date: "2 days ago", icon: "🏆" },
        { title: "Chemistry Wizard", description: "Mastered organic chemistry basics", date: "1 week ago", icon: "⚗️" },
        { title: "AI Enthusiast", description: "Built first machine learning model", date: "2 weeks ago", icon: "🤖" }
      ],
      11: [
        { title: "Calculus Master", description: "Solved complex calculus problems", date: "2 days ago", icon: "∫" },
        { title: "Physics Scholar", description: "Mastered electromagnetic theory", date: "1 week ago", icon: "⚡" },
        { title: "System Designer", description: "Designed complex software system", date: "2 weeks ago", icon: "💾" }
      ],
      12: [
        { title: "Mathematical Genius", description: "Completed advanced calculus", date: "2 days ago", icon: "🧠" },
        { title: "Research Scientist", description: "Conducted independent research", date: "1 week ago", icon: "📊" },
        { title: "Innovation Leader", description: "Led major tech project", date: "2 weeks ago", icon: "🚀" }
      ]
    };
    return achievements[grade as keyof typeof achievements] || achievements[8];
  };

  const getGradeSpecificGoals = (grade: number) => {
    const goals = {
      6: [
        { title: "Complete 3 Basic Math lessons", progress: 70, target: 3, current: 2 },
        { title: "Explore 2 Science topics", progress: 50, target: 2, current: 1 },
        { title: "Try 1 Simple machine project", progress: 100, target: 1, current: 1 }
      ],
      7: [
        { title: "Master 4 Algebra concepts", progress: 75, target: 4, current: 3 },
        { title: "Complete 3 Lab experiments", progress: 67, target: 3, current: 2 },
        { title: "Build 2 Basic programs", progress: 50, target: 2, current: 1 }
      ],
      8: [
        { title: "Complete 5 Geometry problems", progress: 80, target: 5, current: 4 },
        { title: "Practice 3 Physics experiments", progress: 67, target: 3, current: 2 },
        { title: "Create 2 Web projects", progress: 50, target: 2, current: 1 }
      ],
      9: [
        { title: "Solve 6 Advanced Math problems", progress: 83, target: 6, current: 5 },
        { title: "Complete 4 Biology studies", progress: 75, target: 4, current: 3 },
        { title: "Develop 2 Mobile apps", progress: 50, target: 2, current: 1 }
      ],
      10: [
        { title: "Master 5 Trigonometry topics", progress: 80, target: 5, current: 4 },
        { title: "Complete 4 Chemistry labs", progress: 75, target: 4, current: 3 },
        { title: "Build 3 AI projects", progress: 67, target: 3, current: 2 }
      ],
      11: [
        { title: "Complete 6 Calculus modules", progress: 83, target: 6, current: 5 },
        { title: "Master 5 Physics concepts", progress: 80, target: 5, current: 4 },
        { title: "Design 3 Complex systems", progress: 67, target: 3, current: 2 }
      ],
      12: [
        { title: "Advanced 7 Math topics", progress: 86, target: 7, current: 6 },
        { title: "Research 5 Science areas", progress: 80, target: 5, current: 4 },
        { title: "Lead 3 Innovation projects", progress: 67, target: 3, current: 2 }
      ]
    };
    return goals[grade as keyof typeof goals] || goals[8];
  };

  const recentAchievements = getGradeSpecificAchievements(selectedGrade);
  const weeklyGoals = getGradeSpecificGoals(selectedGrade);

  const handleSubjectSelect = (subject: string, topic: string) => {
    setCurrentView('tutor');
  };

  const handleStartGame = (subject: string, topic: string) => {
    setCurrentGame({ subject, topic });
    setCurrentView('game');
  };

  const handleStartAssessment = (subject: string, topic: string) => {
    // This would open an assessment component
    console.log('Starting assessment:', subject, topic);
  };

  const handleGameComplete = (score: number) => {
    // Update student progress
    console.log('Game completed with score:', score);
  };

  const handleAccessibilityFunction = (type: string, data?: any) => {
    console.log(`Accessibility function: ${type}`, data);
  };

  const handleGradeChange = (newGrade: string) => {
    const grade = parseInt(newGrade);
    setSelectedGrade(grade);
    
    // Announce grade change with text-to-speech if auto-speak is enabled
    if (autoSpeak && 'speechSynthesis' in window) {
      const message = `${t.gradeChanged || 'Grade changed to'} ${grade}. ${t.newContentLoaded || 'New content and goals have been loaded for your grade.'}`;
      const utterance = new SpeechSynthesisUtterance(message);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(currentLanguage === 'en' ? 'en' : 'hi')) || voices[0];
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
    
    toast.success(`${t.gradeChanged || 'Grade changed to'} ${grade}!`);
  };

  const toggleAutoSpeak = () => {
    setAutoSpeak(!autoSpeak);
    const message = !autoSpeak ? 
      (t.autoSpeakEnabled || 'Auto-speak enabled. Content will be read automatically.') : 
      (t.autoSpeakDisabled || 'Auto-speak disabled.');
    
    if (!autoSpeak && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(currentLanguage === 'en' ? 'en' : 'hi')) || voices[0];
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
    
    toast.success(message);
  };

  const handleSpeechToText = (callback: (text: string) => void) => {
    // This would integrate with the speech recognition API
    // For now, we'll use a mock implementation
    setTimeout(() => {
      callback("Sample speech input converted to text");
    }, 1000);
  };

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

  if (currentView === 'game' && currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <InteractiveGame
          subject={currentGame.subject}
          topic={currentGame.topic}
          onGameComplete={handleGameComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      </div>
    );
  }

  if (currentView === 'tutor') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
              ← {t.backToDashboard || 'Back to Dashboard'}
            </Button>
            <div className="flex items-center gap-4">
              <AccessibilityTools
                currentLanguage={currentLanguage}
                onTextRead={handleAccessibilityFunction}
                onSpeechToText={handleAccessibilityFunction}
                onTranslate={handleAccessibilityFunction}
              />
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>
          </div>
          <AITutor
            currentSubject="Mathematics"
            currentTopic="Algebra"
            studentProgress={studentProgress}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl">{t.appName}</h1>
                  <p className="text-sm text-muted-foreground">{t.welcome}, {studentName}!</p>
                </div>
              </div>
              
              <Badge variant={isOnline ? "default" : "secondary"} className="ml-4">
                {isOnline ? `🟢 ${t.online}` : `🔴 ${t.offline} ${t.stillWorking || "Still Working"}`}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              {onVoiceControlToggle && (
                <Button
                  variant={voiceControlEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={onVoiceControlToggle}
                  className="flex items-center gap-2"
                >
                  <Mic className={`w-4 h-4 ${voiceControlEnabled ? 'text-white' : 'text-gray-600'}`} />
                  {voiceControlEnabled ? 'Voice On' : 'Voice Off'}
                </Button>
              )}
              <Button
                variant={autoSpeak ? "default" : "outline"}
                size="sm"
                onClick={toggleAutoSpeak}
                className="flex items-center gap-1"
                title={t.autoSpeak || "Auto Speak"}
              >
                {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {autoSpeak ? (t.speakOn || "Speak On") : (t.speakOff || "Speak Off")}
              </Button>
              <AccessibilityTools
                currentLanguage={currentLanguage}
                onTextRead={handleAccessibilityFunction}
                onSpeechToText={handleAccessibilityFunction}
                onTranslate={handleAccessibilityFunction}
              />
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
              <Button variant="outline" onClick={onLogout}>{t.logout || 'Logout'}</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {t.dashboard}
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t.subjects}
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              {t.aiTutor}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {t.totalPoints}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{studentProgress.totalPoints}</div>
                  <p className="text-xs text-muted-foreground">{t.level || 'Level'} {studentProgress.level}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    {t.lessons || 'Lessons'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{studentProgress.completedLessons}</div>
                  <p className="text-xs text-muted-foreground">{t.completed || 'Completed'}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    {t.streak || 'Streak'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{studentProgress.currentStreak}</div>
                  <p className="text-xs text-muted-foreground">{t.days}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-purple-500" />
                    {t.grade || 'Grade'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedGrade.toString()} onValueChange={handleGradeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          {t.grade || 'Grade'} {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.subjectProgress || 'Subject Progress'}</CardTitle>
                  <CardDescription>{t.subjectProgressDesc || 'Your progress in STEM subjects'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(studentProgress.subjects).map(([subject, progress]) => (
                    <div key={subject} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize">{subject}</span>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {t.weeklyGoals || 'Weekly Goals'}
                  </CardTitle>
                  <CardDescription>{t.weeklyGoalsDesc || 'Track your weekly learning targets'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{goal.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  {t.recentAchievements || 'Recent Achievements'}
                </CardTitle>
                <CardDescription>{t.recentAchievementsDesc || 'Your latest accomplishments'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className="text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <STEMSubjects
              selectedGrade={selectedGrade}
              onSubjectSelect={handleSubjectSelect}
              onStartGame={handleStartGame}
              onStartAssessment={handleStartAssessment}
              currentLanguage={currentLanguage}
            />
          </TabsContent>

          <TabsContent value="tutor">
            <AITutor
              currentSubject="Mathematics"
              currentTopic="Algebra"
              studentProgress={studentProgress}
              currentLanguage={currentLanguage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}