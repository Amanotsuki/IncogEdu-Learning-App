import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Award, 
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  FileText,
  Upload,
  Plus,
  Send,
  Wifi,
  WifiOff,
  PieChart,
  Calendar,
  Target,
  Mic
} from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { AccessibilityTools } from "./AccessibilityTools";
import { toast } from "sonner@2.0.3";


interface TeacherDashboardProps {
  teacherName: string;
  onLogout: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  voiceControlEnabled?: boolean;
  onVoiceControlToggle?: () => void;
}

interface Student {
  id: string;
  name: string;
  grade: number;
  totalPoints: number;
  completedLessons: number;
  currentStreak: number;
  lastActive: string;
  subjectProgress: {
    math: number;
    science: number;
    technology: number;
    engineering: number;
  };
  recentPerformance: 'improving' | 'declining' | 'stable';
  attentionNeeded: boolean;
}

export function TeacherDashboard({ 
  teacherName, 
  onLogout, 
  currentLanguage, 
  onLanguageChange,
  voiceControlEnabled = false,
  onVoiceControlToggle
}: TeacherDashboardProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [postType, setPostType] = useState<'comment' | 'test'>('comment');
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [posts, setPosts] = useState([
    {
      id: "1",
      type: "comment",
      title: "Great progress in Mathematics!",
      content: "Keep up the excellent work on quadratic equations.",
      author: teacherName,
      timestamp: "2 hours ago",
      targetStudents: ["1", "4"]
    },
    {
      id: "2",
      type: "test",
      title: "Physics Chapter 5 Quiz",
      content: "Complete the quiz on Newton's Laws by Friday.",
      author: teacherName,
      timestamp: "1 day ago",
      targetStudents: ["all"]
    }
  ]);

  const students: Student[] = [
    {
      id: "1",
      name: "Aarav Sharma",
      grade: 8,
      totalPoints: 2450,
      completedLessons: 34,
      currentStreak: 7,
      lastActive: "2 hours ago",
      subjectProgress: { math: 85, science: 72, technology: 68, engineering: 79 },
      recentPerformance: 'improving',
      attentionNeeded: false
    },
    {
      id: "2",
      name: "Priya Patel",
      grade: 9,
      totalPoints: 1890,
      completedLessons: 28,
      currentStreak: 3,
      lastActive: "1 day ago",
      subjectProgress: { math: 67, science: 89, technology: 73, engineering: 82 },
      recentPerformance: 'stable',
      attentionNeeded: false
    },
    {
      id: "3",
      name: "Ravi Kumar",
      grade: 7,
      totalPoints: 1230,
      completedLessons: 15,
      currentStreak: 1,
      lastActive: "3 days ago",
      subjectProgress: { math: 45, science: 52, technology: 38, engineering: 41 },
      recentPerformance: 'declining',
      attentionNeeded: true
    },
    {
      id: "4",
      name: "Sneha Reddy",
      grade: 10,
      totalPoints: 3120,
      completedLessons: 45,
      currentStreak: 12,
      lastActive: "30 minutes ago",
      subjectProgress: { math: 92, science: 87, technology: 85, engineering: 90 },
      recentPerformance: 'improving',
      attentionNeeded: false
    },
    {
      id: "5",
      name: "Arjun Singh",
      grade: 8,
      totalPoints: 2100,
      completedLessons: 31,
      currentStreak: 5,
      lastActive: "1 hour ago",
      subjectProgress: { math: 78, science: 71, technology: 82, engineering: 75 },
      recentPerformance: 'stable',
      attentionNeeded: false
    },
    {
      id: "6",
      name: "Kavya Menon",
      grade: 11,
      totalPoints: 2890,
      completedLessons: 42,
      currentStreak: 9,
      lastActive: "45 minutes ago",
      subjectProgress: { math: 88, science: 91, technology: 79, engineering: 85 },
      recentPerformance: 'improving',
      attentionNeeded: false
    },
    {
      id: "7",
      name: "Rohit Gupta",
      grade: 6,
      totalPoints: 1450,
      completedLessons: 22,
      currentStreak: 4,
      lastActive: "6 hours ago",
      subjectProgress: { math: 62, science: 58, technology: 65, engineering: 60 },
      recentPerformance: 'stable',
      attentionNeeded: false
    },
    {
      id: "8",
      name: "Ananya Das",
      grade: 12,
      totalPoints: 3450,
      completedLessons: 52,
      currentStreak: 15,
      lastActive: "20 minutes ago",
      subjectProgress: { math: 95, science: 93, technology: 88, engineering: 92 },
      recentPerformance: 'improving',
      attentionNeeded: false
    },
    {
      id: "9",
      name: "Vikram Joshi",
      grade: 9,
      totalPoints: 980,
      completedLessons: 12,
      currentStreak: 0,
      lastActive: "5 days ago",
      subjectProgress: { math: 35, science: 42, technology: 28, engineering: 31 },
      recentPerformance: 'declining',
      attentionNeeded: true
    },
    {
      id: "10",
      name: "Meera Krishnan",
      grade: 7,
      totalPoints: 1890,
      completedLessons: 29,
      currentStreak: 6,
      lastActive: "3 hours ago",
      subjectProgress: { math: 74, science: 79, technology: 71, engineering: 76 },
      recentPerformance: 'improving',
      attentionNeeded: false
    },
    {
      id: "11",
      name: "Aditi Verma",
      grade: 10,
      totalPoints: 2650,
      completedLessons: 38,
      currentStreak: 8,
      lastActive: "1 hour ago",
      subjectProgress: { math: 83, science: 86, technology: 81, engineering: 84 },
      recentPerformance: 'stable',
      attentionNeeded: false
    },
    {
      id: "12",
      name: "Karan Malhotra",
      grade: 8,
      totalPoints: 1120,
      completedLessons: 18,
      currentStreak: 2,
      lastActive: "2 days ago",
      subjectProgress: { math: 48, science: 55, technology: 42, engineering: 46 },
      recentPerformance: 'declining',
      attentionNeeded: true
    },
    {
      id: "13",
      name: "Ishita Agarwal",
      grade: 11,
      totalPoints: 2980,
      completedLessons: 44,
      currentStreak: 11,
      lastActive: "15 minutes ago",
      subjectProgress: { math: 89, science: 87, technology: 92, engineering: 91 },
      recentPerformance: 'improving',
      attentionNeeded: false
    },
    {
      id: "14",
      name: "Deepak Yadav",
      grade: 6,
      totalPoints: 1650,
      completedLessons: 26,
      currentStreak: 5,
      lastActive: "4 hours ago",
      subjectProgress: { math: 68, science: 71, technology: 64, engineering: 67 },
      recentPerformance: 'stable',
      attentionNeeded: false
    },
    {
      id: "15",
      name: "Tanvi Shah",
      grade: 12,
      totalPoints: 3890,
      completedLessons: 58,
      currentStreak: 18,
      lastActive: "10 minutes ago",
      subjectProgress: { math: 97, science: 96, technology: 94, engineering: 95 },
      recentPerformance: 'improving',
      attentionNeeded: false
    }
  ];

  const classStatistics = {
    totalStudents: students.length,
    activeToday: students.filter(s => s.lastActive.includes('hour') || s.lastActive.includes('minutes')).length,
    averageProgress: Math.round(students.reduce((acc, student) => {
      const avgProgress = Object.values(student.subjectProgress).reduce((a, b) => a + b, 0) / 4;
      return acc + avgProgress;
    }, 0) / students.length),
    needingAttention: students.filter(s => s.attentionNeeded).length
  };

  const subjectPerformance = {
    math: Math.round(students.reduce((acc, s) => acc + s.subjectProgress.math, 0) / students.length),
    science: Math.round(students.reduce((acc, s) => acc + s.subjectProgress.science, 0) / students.length),
    technology: Math.round(students.reduce((acc, s) => acc + s.subjectProgress.technology, 0) / students.length),
    engineering: Math.round(students.reduce((acc, s) => acc + s.subjectProgress.engineering, 0) / students.length)
  };

  const filteredStudents = students.filter(student => {
    const matchesGrade = selectedGrade === "all" || student.grade.toString() === selectedGrade;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const handleAccessibilityFunction = (type: string, data?: any) => {
    console.log(`Accessibility function: ${type}`, data);
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

  const exportData = () => {
    toast.success("📊 Preparing data export...");
    
    // Generate CSV data
    const csvData = [
      ['Student Name', 'Grade', 'Total Points', 'Completed Lessons', 'Current Streak', 'Math %', 'Science %', 'Technology %', 'Engineering %', 'Performance', 'Last Active'],
      ...filteredStudents.map(student => [
        student.name,
        student.grade,
        student.totalPoints,
        student.completedLessons,
        student.currentStreak,
        student.subjectProgress.math,
        student.subjectProgress.science,
        student.subjectProgress.technology,
        student.subjectProgress.engineering,
        student.recentPerformance,
        student.lastActive
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edubridge-student-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setTimeout(() => {
      toast.success("✅ Student data exported successfully!");
    }, 1000);
  };

  const handlePostSubmit = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      type: postType,
      title: postTitle,
      content: postContent,
      author: teacherName,
      timestamp: "Just now",
      targetStudents: selectedStudents.length > 0 ? selectedStudents : ["all"]
    };

    setPosts([newPost, ...posts]);
    setPostTitle("");
    setPostContent("");
    setSelectedStudents([]);
    setShowPostDialog(false);
    
    toast.success(`📝 ${postType === 'comment' ? 'Comment' : 'Test'} posted successfully!`);
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl">EduBridge Teacher</h1>
                  <p className="text-sm text-muted-foreground">Welcome, {teacherName}!</p>
                </div>
              </div>
              
              <Badge variant={isOnline ? "default" : "secondary"} className="ml-4 animate-pulse">
                {isOnline ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Online - Real-time sync
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 mr-2" />
                    Offline - Still working
                  </>
                )}
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
              <Button variant="outline" onClick={onLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Class Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-500" />
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{classStatistics.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Across all grades</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Active Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{classStatistics.activeToday}</div>
                  <p className="text-xs text-muted-foreground">Students online</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    Avg Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{classStatistics.averageProgress}%</div>
                  <p className="text-xs text-muted-foreground">Class average</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Need Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{classStatistics.needingAttention}</div>
                  <p className="text-xs text-muted-foreground">Students</p>
                </CardContent>
              </Card>
            </div>

            {/* Subject Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Overview</CardTitle>
                <CardDescription>Average class performance across STEM subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(subjectPerformance).map(([subject, performance]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize">{subject}</span>
                      <span className="text-sm text-muted-foreground">{performance}%</span>
                    </div>
                    <Progress value={performance} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Sneha completed Math lesson on Quadratic Equations</span>
                    <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Aarav achieved 90% in Science quiz</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-orange-50 rounded">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Ravi needs help with Engineering concepts</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {students
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .slice(0, 3)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 text-white rounded-full text-xs">
                            {index + 1}
                          </div>
                          <span className="text-sm">{student.name}</span>
                        </div>
                        <span className="text-sm">{student.totalPoints} pts</span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Button onClick={exportData} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>

            {/* Student Table */}
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Detailed view of individual student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Lessons</TableHead>
                      <TableHead>Streak</TableHead>
                      <TableHead>Math</TableHead>
                      <TableHead>Science</TableHead>
                      <TableHead>Technology</TableHead>
                      <TableHead>Engineering</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-sm">{student.name}</div>
                              {student.attentionNeeded && (
                                <Badge variant="outline" className="text-xs text-orange-600">
                                  Needs attention
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.totalPoints}</TableCell>
                        <TableCell>{student.completedLessons}</TableCell>
                        <TableCell>{student.currentStreak} days</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${student.subjectProgress.math}%` }}
                              />
                            </div>
                            <span className="text-xs">{student.subjectProgress.math}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${student.subjectProgress.science}%` }}
                              />
                            </div>
                            <span className="text-xs">{student.subjectProgress.science}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${student.subjectProgress.technology}%` }}
                              />
                            </div>
                            <span className="text-xs">{student.subjectProgress.technology}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-orange-500 rounded-full"
                                style={{ width: `${student.subjectProgress.engineering}%` }}
                              />
                            </div>
                            <span className="text-xs">{student.subjectProgress.engineering}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getPerformanceIcon(student.recentPerformance)}
                            <span className="text-xs capitalize">{student.recentPerformance}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {student.lastActive}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Performance Trends */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Grade Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[6, 7, 8, 9, 10, 11, 12].map(grade => {
                      const count = students.filter(s => s.grade === grade).length;
                      const percentage = (count / students.length) * 100;
                      return (
                        <div key={grade} className="flex items-center justify-between">
                          <span className="text-sm">Grade {grade}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={percentage} className="w-20 h-2" />
                            <span className="text-xs w-8">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const activity = Math.floor(Math.random() * 100);
                      return (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm">{day}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={activity} className="w-20 h-2" />
                            <span className="text-xs w-8">{activity}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Math Completion</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Science Projects</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engineering Tasks</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">✅ Strong Areas</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Class shows excellent progress in Science and Engineering subjects
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="text-sm font-medium text-orange-800">⚠️ Areas for Improvement</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        3 students need additional support in Mathematics
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">📈 Trending Up</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Technology subject engagement increased by 15% this week
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Peak Learning Hours</span>
                      <span className="text-sm font-medium">2:00 PM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Average Session Time</span>
                      <span className="text-sm font-medium">45 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-medium">73%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">Most Popular Subject</span>
                      <span className="text-sm font-medium">Science</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            {/* Content Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here or click to browse
                    </p>
                    <Button size="sm">Choose Files</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">📄 Documents</Button>
                    <Button variant="outline" size="sm">🎥 Videos</Button>
                    <Button variant="outline" size="sm">🖼️ Images</Button>
                    <Button variant="outline" size="sm">📊 Presentations</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Math Chapter 5.pdf</span>
                      </div>
                      <Badge variant="outline">2.1 MB</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Science Lab Guide.docx</span>
                      </div>
                      <Badge variant="outline">1.8 MB</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">Engineering Projects.pptx</span>
                      </div>
                      <Badge variant="outline">5.2 MB</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">Technology Trends.mp4</span>
                      </div>
                      <Badge variant="outline">15.7 MB</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Curriculum Management */}
            <Card>
              <CardHeader>
                <CardTitle>Curriculum Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <h4 className="text-sm font-medium mb-2">Mathematics</h4>
                    <p className="text-xs text-muted-foreground mb-3">45 lessons available</p>
                    <Progress value={78} className="h-2 mb-2" />
                    <p className="text-xs">78% completed by class</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="text-sm font-medium mb-2">Science</h4>
                    <p className="text-xs text-muted-foreground mb-3">38 lessons available</p>
                    <Progress value={85} className="h-2 mb-2" />
                    <p className="text-xs">85% completed by class</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="text-sm font-medium mb-2">Technology</h4>
                    <p className="text-xs text-muted-foreground mb-3">32 lessons available</p>
                    <Progress value={62} className="h-2 mb-2" />
                    <p className="text-xs">62% completed by class</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="text-sm font-medium mb-2">Engineering</h4>
                    <p className="text-xs text-muted-foreground mb-3">41 lessons available</p>
                    <Progress value={71} className="h-2 mb-2" />
                    <p className="text-xs">71% completed by class</p>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Offline Content Management */}
            <Card>
              <CardHeader>
                <CardTitle>Offline Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Content Packages</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Grade 6-8 Math Package</span>
                        <Badge variant="outline">Downloaded</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Science Experiments Bundle</span>
                        <Badge variant="outline">Downloaded</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Engineering Basics</span>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Storage Status</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Used Storage</span>
                          <span>2.1 GB / 5 GB</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Storage optimized for low-bandwidth environments
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            {/* Post Creation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Communication Portal
                  <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button
                            variant={postType === 'comment' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPostType('comment')}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Comment
                          </Button>
                          <Button
                            variant={postType === 'test' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPostType('test')}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Test/Assignment
                          </Button>
                        </div>
                        
                        <Input
                          placeholder={postType === 'comment' ? 'Comment title...' : 'Test/Assignment title...'}
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                        />
                        
                        <Textarea
                          placeholder={postType === 'comment' ? 'Write your comment...' : 'Test instructions and details...'}
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          rows={4}
                        />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Target Students</h4>
                          <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                            <Button
                              variant={selectedStudents.length === 0 ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedStudents([])}
                            >
                              All Students
                            </Button>
                            {students.slice(0, 8).map(student => (
                              <Button
                                key={student.id}
                                variant={selectedStudents.includes(student.id) ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleStudentSelect(student.id)}
                                className="text-xs"
                              >
                                {student.name.split(' ')[0]}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowPostDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handlePostSubmit} className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Post
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {post.type === 'comment' ? (
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                          ) : (
                            <FileText className="w-4 h-4 text-green-500" />
                          )}
                          <h4 className="font-medium">{post.title}</h4>
                          <Badge variant={post.type === 'comment' ? 'default' : 'secondary'}>
                            {post.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Target: {post.targetStudents.includes('all') ? 'All Students' : `${post.targetStudents.length} students`}
                        </span>
                        <span className="text-xs text-muted-foreground">By: {post.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Students Needing Attention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Students Needing Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.filter(s => s.attentionNeeded).map(student => (
                    <div key={student.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">{student.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Grade {student.grade} • Last active: {student.lastActive}
                          </p>
                          <p className="text-xs text-orange-700 mt-1">
                            Performance declining • Low engagement in multiple subjects
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            Action Plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {students.filter(s => s.attentionNeeded).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p>All students are performing well!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}