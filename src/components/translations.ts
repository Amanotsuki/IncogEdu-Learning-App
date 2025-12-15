export interface Translation {
  // Header and Navigation
  appName: string;
  appDescription: string;
  online: string;
  offline: string;
  
  // Welcome/Login Screen
  heroTitle: string;
  heroDescription: string;
  
  // Feature highlights
  aiTutoring: string;
  multilingual: string;
  offlineReady: string;
  accessible: string;
  
  // Login tabs
  getStarted: string;
  features: string;
  
  // Student Portal
  studentPortal: string;
  studentPortalDesc: string;
  studentName: string;
  studentId: string;
  startLearning: string;
  gradesAndFocus: string;
  
  // Teacher Portal
  teacherPortal: string;
  teacherPortalDesc: string;
  teacherName: string;
  teacherId: string;
  accessDashboard: string;
  analyticsAndTracking: string;
  
  // Offline status
  offlineModeActive: string;
  usingCachedContent: string;
  lastSync: string;
  
  // Features section
  stemEducation: string;
  stemEducationDesc: string;
  interactiveLessons: string;
  handsOnExperiments: string;
  realWorldProblems: string;
  progressiveSkills: string;
  
  aiTutoringTitle: string;
  aiTutoringDesc: string;
  doubtClearing: string;
  personalizedPaths: string;
  instantFeedback: string;
  progressTracking: string;
  
  accessibilityTitle: string;
  accessibilityDesc: string;
  speechToText: string;
  textToSpeech: string;
  realTimeTranslation: string;
  highContrast: string;
  
  multilingualTitle: string;
  multilingualDesc: string;
  seamlessLanguageSwitch: string;
  
  offlineCapability: string;
  offlineCapabilityDesc: string;
  preloadedContent: string;
  offlineProgress: string;
  syncWhenConnected: string;
  lowCostDevices: string;
  
  gamifiedLearning: string;
  gamifiedLearningDesc: string;
  pointsAchievements: string;
  interactiveLearningGames: string;
  progressStreaks: string;
  competitiveChallenges: string;
  
  // Student Dashboard
  dashboard: string;
  myProgress: string;
  subjects: string;
  games: string;
  aiTutor: string;
  accessibility: string;
  settings: string;
  logout: string;
  
  // Progress stats
  totalPoints: string;
  currentLevel: string;
  completedLessons: string;
  learningStreak: string;
  days: string;
  
  // Subjects
  mathematics: string;
  science: string;
  technology: string;
  engineering: string;
  
  // AI Tutor
  askQuestion: string;
  typeYourQuestion: string;
  askAI: string;
  
  // Footer
  footerTagline: string;
  footerDescription: string;
  
  // Common
  welcome: string;
  loading: string;
  error: string;
  success: string;
  close: string;
  save: string;
  cancel: string;
  
  // Placeholders
  enterYourName: string;
  optional: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Header and Navigation
    appName: "EduBridge",
    appDescription: "Gamified Learning for Rural Students",
    online: "Online",
    offline: "Offline",
    
    // Welcome/Login Screen
    heroTitle: "EduBridge",
    heroDescription: "A gamified, multilingual learning platform designed for rural students (Grades 6–12) focusing on STEM education with AI tutoring and offline accessibility",
    
    // Feature highlights
    aiTutoring: "AI Tutoring",
    multilingual: "Multilingual",
    offlineReady: "Offline Ready",
    accessible: "Accessible",
    
    // Login tabs
    getStarted: "Get Started",
    features: "Features",
    
    // Student Portal
    studentPortal: "Student Portal",
    studentPortalDesc: "Access interactive STEM learning",
    studentName: "Student Name",
    studentId: "Student ID",
    startLearning: "Start Learning",
    gradesAndFocus: "Grades 6-12 • STEM Focused • Gamified Learning",
    
    // Teacher Portal
    teacherPortal: "Teacher Portal",
    teacherPortalDesc: "Monitor student progress & analytics",
    teacherName: "Teacher Name",
    teacherId: "Teacher ID",
    accessDashboard: "Access Dashboard",
    analyticsAndTracking: "Analytics • Progress Tracking • Content Management",
    
    // Offline status
    offlineModeActive: "Offline Mode Active",
    usingCachedContent: "Using cached content",
    lastSync: "Last sync",
    
    // Features section
    stemEducation: "STEM Education",
    stemEducationDesc: "Comprehensive coverage of Science, Technology, Engineering, and Mathematics",
    interactiveLessons: "• Interactive lessons for Grades 6-12",
    handsOnExperiments: "• Hands-on experiments and projects",
    realWorldProblems: "• Real-world problem solving",
    progressiveSkills: "• Progressive skill building",
    
    aiTutoringTitle: "AI Tutoring",
    aiTutoringDesc: "Adaptive AI assistant for personalized learning support",
    doubtClearing: "• 24/7 doubt clearing assistance",
    personalizedPaths: "• Personalized learning paths",
    instantFeedback: "• Instant feedback and explanations",
    progressTracking: "• Progress tracking and recommendations",
    
    accessibilityTitle: "Accessibility",
    accessibilityDesc: "Inclusive features for students with diverse needs",
    speechToText: "Speech-to-text input",
    textToSpeech: "Text-to-speech output",
    realTimeTranslation: "Real-time translation",
    highContrast: "High contrast mode",
    
    multilingualTitle: "Multilingual",
    multilingualDesc: "Content available in multiple Indian languages",
    seamlessLanguageSwitch: "Seamless language switching with preserved progress",
    
    offlineCapability: "Offline Ready",
    offlineCapabilityDesc: "Learn without internet connectivity",
    preloadedContent: "• Pre-loaded content packages",
    offlineProgress: "• Offline progress tracking",
    syncWhenConnected: "• Sync when connected",
    lowCostDevices: "• Works on low-cost devices",
    
    gamifiedLearning: "Gamified Learning",
    gamifiedLearningDesc: "Engaging game-based education system",
    pointsAchievements: "• Points and achievement system",
    interactiveLearningGames: "• Interactive learning games",
    progressStreaks: "• Progress streaks and rewards",
    competitiveChallenges: "• Competitive challenges",
    
    // Student Dashboard
    dashboard: "Dashboard",
    myProgress: "My Progress",
    subjects: "Subjects",
    games: "Games",
    aiTutor: "AI Tutor",
    accessibility: "Accessibility",
    settings: "Settings",
    logout: "Logout",
    
    // Progress stats
    totalPoints: "Total Points",
    currentLevel: "Current Level",
    completedLessons: "Completed Lessons",
    learningStreak: "Learning Streak",
    days: "days",
    
    // Subjects
    mathematics: "Mathematics",
    science: "Science",
    technology: "Technology",
    engineering: "Engineering",
    
    // AI Tutor
    askQuestion: "Ask a Question",
    typeYourQuestion: "Type your question here...",
    askAI: "Ask AI",
    
    // Footer
    footerTagline: "EduBridge • Empowering Rural Education Through Technology",
    footerDescription: "Designed for grades 6-12 • Supporting 15%+ improvement in learning outcomes",
    
    // Common
    welcome: "Welcome",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    
    // Placeholders
    enterYourName: "Enter your name",
    optional: "Optional"
  },
  
  hi: {
    // Header and Navigation
    appName: "एडुब्रिज",
    appDescription: "ग्रामीण छात्रों के लिए गेमिफाइड लर्निंग",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    
    // Welcome/Login Screen
    heroTitle: "एडुब्रिज",
    heroDescription: "एक गेमिफाइड, बहुभाषी शिक्षा मंच जो ग्रामीण छात्रों (कक्षा 6-12) के लिए डिज़ाइन किया गया है, एआई ट्यूटरिंग और ऑफलाइन पहुंच के साथ STEM शिक्षा पर केंद्रित है",
    
    // Feature highlights
    aiTutoring: "एआई ट्यूटरिंग",
    multilingual: "बहुभाषी",
    offlineReady: "ऑफलाइन तैयार",
    accessible: "सुलभ",
    
    // Login tabs
    getStarted: "शुरू करें",
    features: "सुविधाएं",
    
    // Student Portal
    studentPortal: "छात्र पोर्टल",
    studentPortalDesc: "इंटरैक्टिव STEM शिक्षा तक पहुंच",
    studentName: "छात्र का नाम",
    studentId: "छात्र आईडी",
    startLearning: "सीखना शुरू करें",
    gradesAndFocus: "कक्षा 6-12 • STEM केंद्रित • गेमिफाइड लर्निंग",
    
    // Teacher Portal
    teacherPortal: "शिक्षक पोर्टल",
    teacherPortalDesc: "छात्र प्रगति और एनालिटिक्स की निगरानी करें",
    teacherName: "शिक्षक का नाम",
    teacherId: "शिक्षक आईडी",
    accessDashboard: "डैशबोर्ड एक्सेस करें",
    analyticsAndTracking: "एनालिटिक्स • प्रगति ट्रैकिंग • सामग्री प्रबंधन",
    
    // Offline status
    offlineModeActive: "ऑफलाइन मोड सक्रिय",
    usingCachedContent: "कैश्ड सामग्री का उपयोग",
    lastSync: "अंतिम सिंक",
    
    // Features section
    stemEducation: "STEM शिक्षा",
    stemEducationDesc: "विज्ञान, प्रौद्योगिकी, इंजीनियरिंग और गणित का व्यापक कवरेज",
    interactiveLessons: "• कक्षा 6-12 के लिए इंटरैक्टिव पाठ",
    handsOnExperiments: "• व्यावहारिक प्रयोग और प्रोजेक्ट",
    realWorldProblems: "• वास्तविक दुनिया की समस्या समाधान",
    progressiveSkills: "• प्रगतिशील कौशल निर्माण",
    
    aiTutoringTitle: "एआई ट्यूटरिंग",
    aiTutoringDesc: "व्यक्तिगत शिक्षा सहायता के लिए अनुकूली एआई सहायक",
    doubtClearing: "• 24/7 संदेह निवारण सहायता",
    personalizedPaths: "• व्यक्तिगत शिक्षा पथ",
    instantFeedback: "• तत्काल फीडबैक और स्पष्टीकरण",
    progressTracking: "• प्रगति ट्रैकिंग और सिफारिशें",
    
    accessibilityTitle: "सुलभता",
    accessibilityDesc: "विविध आवश्यकताओं वाले छात्रों के लिए समावेशी सुविधाएं",
    speechToText: "भाषण-से-पाठ इनपुट",
    textToSpeech: "पाठ-से-भाषण आउटपुट",
    realTimeTranslation: "रीयल-टाइम अनुवाद",
    highContrast: "उच्च कंट्रास्ट मोड",
    
    multilingualTitle: "बहुभाषी",
    multilingualDesc: "कई भारतीय भाषाओं में उपलब्ध सामग्री",
    seamlessLanguageSwitch: "संरक्षित प्रगति के साथ निर्बाध भाषा स्विचिंग",
    
    offlineCapability: "ऑफलाइन तैयार",
    offlineCapabilityDesc: "इंटरनेट कनेक्टिविटी के बिना सीखें",
    preloadedContent: "• पूर्व-लोड सामग्री पैकेज",
    offlineProgress: "• ऑफलाइन प्रगति ट्रैकिंग",
    syncWhenConnected: "• कनेक्ट होने पर सिंक",
    lowCostDevices: "• कम लागत वाले उपकरणों पर काम करता है",
    
    gamifiedLearning: "गेमिफाइड लर्निंग",
    gamifiedLearningDesc: "आकर्षक गेम-आधारित शिक्षा प्रणाली",
    pointsAchievements: "• अंक और उपलब्धि प्रणाली",
    interactiveLearningGames: "• इंटरैक्टिव लर्निंग गेम्स",
    progressStreaks: "• प्रगति स्ट्रीक और पुरस्कार",
    competitiveChallenges: "• प्रतिस्पर्धी चुनौतियां",
    
    // Student Dashboard
    dashboard: "डैशबोर्ड",
    myProgress: "मेरी प्रगति",
    subjects: "विषय",
    games: "खेल",
    aiTutor: "एआई ट्यूटर",
    accessibility: "सुलभता",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    
    // Progress stats
    totalPoints: "कुल अंक",
    currentLevel: "वर्तमान स्तर",
    completedLessons: "पूर्ण पाठ",
    learningStreak: "सीखने की लकीर",
    days: "दिन",
    
    // Subjects
    mathematics: "गणित",
    science: "विज्ञान",
    technology: "प्रौद्योगिकी",
    engineering: "इंजीनियरिंग",
    
    // AI Tutor
    askQuestion: "प्रश्न पूछें",
    typeYourQuestion: "यहां अपना प्रश्न टाइप करें...",
    askAI: "एआई से पूछें",
    
    // Footer
    footerTagline: "एडुब्रिज • प्रौद्योगिकी के माध्यम से ग्रामीण शिक्षा को सशक्त बनाना",
    footerDescription: "कक्षा 6-12 के लिए डिज़ाइन • सीखने के परिणामों में 15%+ सुधार का समर्थन",
    
    // Common
    welcome: "स्वागत",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    close: "बंद करें",
    save: "सेव करें",
    cancel: "रद्द करें",
    
    // Placeholders
    enterYourName: "अपना नाम दर्ज करें",
    optional: "वैकल्पिक"
  },
  
  kn: {
    // Header and Navigation
    appName: "ಎಡುಬ್ರಿಜ್",
    appDescription: "ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಗೇಮಿಫೈಡ್ ಕಲಿಕೆ",
    online: "ಆನ್‌ಲೈನ್",
    offline: "ಆಫ್‌ಲೈನ್",
    
    // Welcome/Login Screen
    heroTitle: "ಎಡುಬ್ರಿಜ್",
    heroDescription: "AI ಟ್ಯೂಟರಿಂಗ್ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಪ್ರವೇಶದೊಂದಿಗೆ STEM ಶಿಕ್ಷಣದ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿದ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ (ತರಗತಿ 6-12) ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಗೇಮಿಫೈಡ್, ಬಹುಭಾಷಾ ಕಲಿಕೆಯ ವೇದಿಕೆ",
    
    // Feature highlights
    aiTutoring: "AI ಟ್ಯೂಟರಿಂಗ್",
    multilingual: "ಬಹುಭಾಷಾ",
    offlineReady: "ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ",
    accessible: "ಪ್ರವೇಶಯೋಗ್ಯ",
    
    // Login tabs
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    
    // Student Portal
    studentPortal: "ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್",
    studentPortalDesc: "ಸಂವಾದಾತ್ಮಕ STEM ಕಲಿಕೆಯನ್ನು ಪ್ರವೇಶಿಸಿ",
    studentName: "ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು",
    studentId: "ವಿದ್ಯಾರ್ಥಿ ID",
    startLearning: "ಕಲಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    gradesAndFocus: "ತರಗತಿ 6-12 • STEM ಕೇಂದ್ರಿತ • ಗೇಮಿಫೈಡ್ ಕಲಿಕೆ",
    
    // Teacher Portal
    teacherPortal: "ಶಿಕ್ಷಕರ ಪೋರ್ಟಲ್",
    teacherPortalDesc: "ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರಗತಿ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
    teacherName: "ಶಿಕ್ಷಕರ ಹೆಸರು",
    teacherId: "ಶಿಕ್ಷಕರ ID",
    accessDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ",
    analyticsAndTracking: "ವಿಶ್ಲೇಷಣೆ • ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್ • ವಿಷಯ ನಿರ್ವಹಣೆ",
    
    // Offline status
    offlineModeActive: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯ",
    usingCachedContent: "ಕ್ಯಾಶ್ ಮಾಡಿದ ವಿಷಯವನ್ನು ಬಳಸುತ್ತಿದೆ",
    lastSync: "ಕೊನೆಯ ಸಿಂಕ್",
    
    // Features section
    stemEducation: "STEM ಶಿಕ್ಷಣ",
    stemEducationDesc: "ವಿಜ್ಞಾನ, ತಂತ್ರಜ್ಞಾನ, ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಗಣಿತದ ವ್ಯಾಪಕ ವ್ಯಾಪ್ತಿ",
    interactiveLessons: "• ತರಗತಿ 6-12 ಗಾಗಿ ಸಂವಾದಾತ್ಮಕ ಪಾಠಗಳು",
    handsOnExperiments: "• ಪ್ರಾಯೋಗಿಕ ಪ್ರಯೋಗಗಳು ಮತ್ತು ಯೋಜನೆಗಳು",
    realWorldProblems: "• ನೈಜ-ಪ್ರಪಂಚದ ಸಮಸ್ಯೆ ಪರಿಹಾರ",
    progressiveSkills: "• ಪ್ರಗತಿಶೀಲ ಕೌಶಲ್ಯ ನಿರ್ಮಾಣ",
    
    aiTutoringTitle: "AI ಟ್ಯೂಟರಿಂಗ್",
    aiTutoringDesc: "ವೈಯಕ್ತಿಕ ಕಲಿಕೆಯ ಬೆಂಬಲಕ್ಕಾಗಿ ಹೊಂದಾಣಿಕೆಯ AI ಸಹಾಯಕ",
    doubtClearing: "• 24/7 ಸಂದೇಹ ನಿವಾರಣೆ ಸಹಾಯ",
    personalizedPaths: "• ವೈಯಕ್ತಿಕ ಕಲಿಕೆಯ ಮಾರ್ಗಗಳು",
    instantFeedback: "• ತತ್ಕ್ಷಣ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ವಿವರಣೆಗಳು",
    progressTracking: "• ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಶಿಫಾರಸುಗಳು",
    
    accessibilityTitle: "ಪ್ರವೇಶಯೋಗ್ಯತೆ",
    accessibilityDesc: "ವಿವಿಧ ಅಗತ್ಯಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಸಮಗ್ರ ವೈಶಿಷ್ಟ್ಯಗಳು",
    speechToText: "ಭಾಷಣ-ಟು-ಪಠ್ಯ ಇನ್‌ಪುಟ್",
    textToSpeech: "ಪಠ್ಯ-ಟು-ಭಾಷಣ ಔಟ್‌ಪುಟ್",
    realTimeTranslation: "ನೈಜ-ಸಮಯದ ಅನುವಾದ",
    highContrast: "ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್ ಮೋಡ್",
    
    multilingualTitle: "ಬಹುಭಾಷಾ",
    multilingualDesc: "ಅನೇಕ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿರುವ ವಿಷಯ",
    seamlessLanguageSwitch: "ಸಂರಕ್ಷಿತ ಪ್ರಗತಿಯೊಂದಿಗೆ ನಿರಂತರ ಭಾಷಾ ಬದಲಾವಣೆ",
    
    offlineCapability: "ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ",
    offlineCapabilityDesc: "ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲದೆ ಕಲಿಯಿರಿ",
    preloadedContent: "• ಪೂರ್ವ-ಲೋಡ್ ಮಾಡಿದ ವಿಷಯ ಪ್ಯಾಕೇಜುಗಳು",
    offlineProgress: "• ಆಫ್‌ಲೈನ್ ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    syncWhenConnected: "• ಸಂಪರ್ಕಗೊಂಡಾಗ ಸಿಂಕ್",
    lowCostDevices: "• ಕಡಿಮೆ ವೆಚ್ಚದ ಸಾಧನಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    
    gamifiedLearning: "ಗೇಮಿಫೈಡ್ ಕಲಿಕೆ",
    gamifiedLearningDesc: "ಆಕರ್ಷಕ ಆಟ-ಆಧಾರಿತ ಶಿಕ್ಷಣ ವ್ಯವಸ್ಥೆ",
    pointsAchievements: "• ಅಂಕಗಳು ಮತ್ತು ಸಾಧನೆಗಳ ವ್ಯವಸ್ಥೆ",
    interactiveLearningGames: "• ಸಂವಾದಾತ್ಮಕ ಕಲಿಕೆಯ ಆಟಗಳು",
    progressStreaks: "• ಪ್ರಗತಿ ಸ್ಟ್ರೀಕ್‌ಗಳು ಮತ್ತು ಪುರಸ್ಕಾರಗಳು",
    competitiveChallenges: "• ಸ್ಪರ್ಧಾತ್ಮಕ ಸವಾಲುಗಳು",
    
    // Student Dashboard
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    myProgress: "ನನ್ನ ಪ್ರಗತಿ",
    subjects: "ವಿಷಯಗಳು",
    games: "ಆಟಗಳು",
    aiTutor: "AI ಟ್ಯೂಟರ್",
    accessibility: "ಪ್ರವೇಶಯೋಗ್ಯತೆ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    logout: "ಲಾಗ್‌ಔಟ್",
    
    // Progress stats
    totalPoints: "ಒಟ್ಟು ಅಂಕಗಳು",
    currentLevel: "ಪ್ರಸ್ತುತ ಹಂತ",
    completedLessons: "ಪೂರ್ಣಗೊಂಡ ಪಾಠಗಳು",
    learningStreak: "ಕಲಿಕೆಯ ಸರಣಿ",
    days: "ದಿನಗಳು",
    
    // Subjects
    mathematics: "ಗಣಿತ",
    science: "ವಿಜ್ಞಾನ",
    technology: "ತಂತ್ರಜ್ಞಾನ",
    engineering: "ಎಂಜಿನಿಯರಿಂಗ್",
    
    // AI Tutor
    askQuestion: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
    typeYourQuestion: "ಇಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    askAI: "AI ಯಿಂದ ಕೇಳಿ",
    
    // Footer
    footerTagline: "ಎಡುಬ್ರಿಜ್ • ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣವನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು",
    footerDescription: "ತರಗತಿ 6-12 ಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ • ಕಲಿಕೆಯ ಫಲಿತಾಂಶಗಳಲ್ಲಿ 15%+ ಸುಧಾರಣೆಯನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ",
    
    // Common
    welcome: "ಸ್ವಾಗತ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ದೋಷ",
    success: "ಯಶಸ್ಸು",
    close: "ಮುಚ್ಚಿ",
    save: "ಉಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    
    // Placeholders
    enterYourName: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    optional: "ಐಚ್ಛಿಕ"
  },
  
  or: {
    // Header and Navigation
    appName: "ଏଡୁବ୍ରିଜ",
    appDescription: "ଗ୍ରାମାଞ୍ଚଳ ଛାତ୍ରମାନଙ୍କ ପାଇଁ ଗେମିଫାଇଡ ଶିକ୍ଷା",
    online: "ଅନଲାଇନ",
    offline: "ଅଫଲାଇନ",
    
    // Welcome/Login Screen
    heroTitle: "ଏଡୁବ୍ରିଜ",
    heroDescription: "AI ଟ୍ୟୁଟରିଂ ଏବଂ ଅଫଲାଇନ ଅଭିଗମ୍ୟତା ସହିତ STEM ଶିକ୍ଷା ଉପରେ କେନ୍ଦ୍ରିତ ଗ୍ରାମାଞ୍ଚଳ ଛାତ୍ରମାନଙ୍କ (ଗ୍ରେଡ 6-12) ପାଇଁ ଡିଜାଇନ କରାଯାଇଥିବା ଏକ ଗେମିଫାଇଡ, ବହୁଭାଷୀ ଶିକ୍ଷା ପ୍ଲାଟଫର୍ମ",
    
    // Feature highlights
    aiTutoring: "AI ଟ୍ୟୁଟରିଂ",
    multilingual: "ବହୁଭାଷୀ",
    offlineReady: "ଅଫଲାଇନ ପ୍ରସ୍ତୁତ",
    accessible: "ଅଭିଗମ୍ୟ",
    
    // Login tabs
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    features: "ବିଶେଷତାଗୁଡ଼ିକ",
    
    // Student Portal
    studentPortal: "ଛାତ୍ର ପୋର୍ଟାଲ",
    studentPortalDesc: "ଇଣ୍ଟରାକ୍ଟିଭ STEM ଶିକ୍ଷା ଅଭିଗମ କରନ୍ତୁ",
    studentName: "ଛାତ୍ରଙ୍କ ନାମ",
    studentId: "ଛାତ୍ର ID",
    startLearning: "ଶିକ୍ଷା ଆରମ୍ଭ କରନ୍ତୁ",
    gradesAndFocus: "ଗ୍ରେଡ 6-12 • STEM କେନ୍ଦ୍ରିତ • ଗେମିଫାଇଡ ଶିକ୍ଷା",
    
    // Teacher Portal
    teacherPortal: "ଶିକ୍ଷକ ପୋର୍ଟାଲ",
    teacherPortalDesc: "ଛାତ୍ର ପ୍ରଗତି ଏବଂ ବିଶ୍ଳେଷଣ ମନିଟର କରନ୍ତୁ",
    teacherName: "ଶିକ୍ଷକଙ୍କ ନାମ",
    teacherId: "ଶିକ୍ଷକ ID",
    accessDashboard: "ଡ୍ୟାସବୋର୍ଡ ଅଭିଗମ କରନ୍ତୁ",
    analyticsAndTracking: "ବିଶ୍ଳେଷଣ • ପ୍ରଗତି ଟ୍ରାକିଂ • ବିଷୟବସ୍ତୁ ପରିଚାଳନା",
    
    // Offline status
    offlineModeActive: "ଅଫଲାଇନ ମୋଡ ସକ୍ରିୟ",
    usingCachedContent: "କ୍ୟାଶଡ ବିଷୟବସ୍ତୁ ବ୍ୟବହ���ର କରୁଛି",
    lastSync: "ଶେଷ ସିଙ୍କ",
    
    // Features section
    stemEducation: "STEM ଶିକ୍ଷା",
    stemEducationDesc: "ବିଜ୍ଞାନ, ପ୍ରଯୁକ୍ତିବିଦ୍ୟା, ଇଞ୍ଜିନିୟରିଂ ଏବଂ ଗଣିତର ବ୍ୟାପକ କଭରେଜ",
    interactiveLessons: "• ଗ୍ରେଡ 6-12 ପାଇଁ ଇଣ୍ଟରାକ୍ଟିଭ ପାଠ",
    handsOnExperiments: "• ହ୍ୟାଣ୍ଡସ-ଅନ ପରୀକ୍ଷଣ ଏବଂ ପ୍ରକଳ୍ପ",
    realWorldProblems: "• ପ୍ରକୃତ-ଜଗତ ସମସ୍ୟା ସମାଧାନ",
    progressiveSkills: "• ପ୍ରଗତିଶୀଳ କୌଶଳ ନିର୍ମାଣ",
    
    aiTutoringTitle: "AI ଟ୍ୟୁଟରିଂ",
    aiTutoringDesc: "ବ୍ୟକ୍ତିଗତ ଶିକ୍ଷା ସହାୟତା ପାଇଁ ଆଡାପ୍ଟିଭ AI ସହାୟକ",
    doubtClearing: "• 24/7 ସନ୍ଦେହ ନିବାରଣ ସହାୟତା",
    personalizedPaths: "• ବ୍ୟକ୍ତିଗତ ଶିକ୍ଷା ପଥ",
    instantFeedback: "• ତତ୍କ୍ଷଣାତ ମତାମତ ଏବଂ ବ୍ୟାଖ୍ୟା",
    progressTracking: "• ପ୍ରଗତି ଟ୍ରାକିଂ ଏବଂ ସୁପା���ିଶ",
    
    accessibilityTitle: "ଅଭିଗମ୍ୟତା",
    accessibilityDesc: "ବିବିଧ ଆବଶ୍ୟକତା ଥିବା ଛାତ୍ରମାନଙ୍କ ପାଇଁ ଅନ୍ତର୍ଭୁକ୍ତ ବିଶେଷତା",
    speechToText: "ବକ୍ତବ୍ୟ-ରୁ-ପାଠ ଇନପୁଟ",
    textToSpeech: "ପାଠ-ରୁ-ବକ୍ତବ୍ୟ ଆଉଟପୁଟ",
    realTimeTranslation: "ରିଅଲ-ଟାଇମ ଅନୁବାଦ",
    highContrast: "ଉଚ୍ଚ କଣ୍ଟ୍ରାସ୍ଟ ମୋଡ",
    
    multilingualTitle: "ବହୁଭାଷୀ",
    multilingualDesc: "ଏକାଧିକ ଭାରତୀୟ ଭାଷାରେ ଉପଲବ୍ଧ ବିଷୟବସ୍ତୁ",
    seamlessLanguageSwitch: "ସଂରକ୍ଷିତ ପ୍ରଗତି ସହିତ ନିରବଚ୍ଛିନ୍ନ ଭାଷା ପରିବର୍ତ୍ତନ",
    
    offlineCapability: "ଅଫଲାଇନ ପ୍ରସ୍ତୁତ",
    offlineCapabilityDesc: "ଇଣ୍ଟରନେଟ ସଂଯୋଗ ବିନା ଶିଖନ୍ତୁ",
    preloadedContent: "• ପୂର୍ବ-ଲୋଡ ହୋଇଥିବା ବିଷୟବସ୍ତୁ ପ୍ୟାକେଜ",
    offlineProgress: "• ଅଫଲାଇନ ପ୍ରଗତି ଟ୍ରାକିଂ",
    syncWhenConnected: "• ସଂଯୁକ୍ତ ହେଲେ ସିଙ୍କ",
    lowCostDevices: "• କମ୍-ମୂଲ୍ୟ ଉପକରଣରେ କାମ କରେ",
    
    gamifiedLearning: "ଗେମିଫାଇଡ ଶିକ୍ଷା",
    gamifiedLearningDesc: "ଆକର୍ଷଣୀୟ ଖେଳ-ଆଧାରିତ ଶିକ୍ଷା ପ୍ରଣାଳୀ",
    pointsAchievements: "• ପଏଣ୍ଟ ଏବଂ ସଫଳତା ପ୍ରଣାଳୀ",
    interactiveLearningGames: "• ଇଣ୍ଟରାକ୍ଟିଭ ଶିକ୍ଷା ଖେଳ",
    progressStreaks: "• ପ୍ରଗତି ଷ୍ଟ୍ରିକ ଏବଂ ପୁରସ୍କାର",
    competitiveChallenges: "• ପ୍ରତିଯୋଗିତାମୂଳକ ଚ୍ୟାଲେଞ୍ଜ",
    
    // Student Dashboard
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    myProgress: "ମୋର ପ୍ରଗତି",
    subjects: "ବିଷୟ",
    games: "ଖେଳ",
    aiTutor: "AI ଟ୍ୟୁଟର",
    accessibility: "ଅଭିଗମ୍ୟତା",
    settings: "ସେଟିଂସ",
    logout: "ଲଗଆଉଟ",
    
    // Progress stats
    totalPoints: "ମୋଟ ପଏଣ୍ଟ",
    currentLevel: "ବର୍ତ୍ତମାନ ସ୍ତର",
    completedLessons: "ସମ୍ପୂର୍ଣ୍ଣ ପାଠ",
    learningStreak: "ଶିକ୍ଷା ଧାରା",
    days: "ଦିନ",
    
    // Subjects
    mathematics: "ଗଣିତ",
    science: "ବିଜ୍ଞାନ",
    technology: "ପ୍ରଯୁକ୍ତିବିଦ୍ୟା",
    engineering: "ଇଞ୍ଜିନିୟରିଂ",
    
    // AI Tutor
    askQuestion: "ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ",
    typeYourQuestion: "ଏଠାରେ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଟାଇପ କରନ୍ତୁ...",
    askAI: "AI କୁ ପଚାରନ୍ତୁ",
    
    // Footer
    footerTagline: "ଏଡୁବ୍ରିଜ • ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ମାଧ୍ୟମରେ ଗ୍ରାମାଞ୍ଚଳ ଶିକ୍ଷାକୁ ସଶକ୍ତ କରିବା",
    footerDescription: "ଗ୍ରେଡ 6-12 ପାଇଁ ଡିଜାଇନ • ଶିକ୍ଷା ଫଳାଫଳରେ 15%+ ଉନ୍ନତିକୁ ସମର୍ଥନ",
    
    // Common
    welcome: "ସ୍ୱାଗତ",
    loading: "ଲୋଡ ହେଉଛି...",
    error: "ତ୍ରୁଟି",
    success: "ସଫଳତା",
    close: "ବନ୍ଦ କରନ୍ତୁ",
    save: "ସେଭ କରନ୍ତୁ",
    cancel: "ବାତିଲ କରନ୍ତୁ",
    
    // Placeholders
    enterYourName: "ଆପଣଙ୍��� ନାମ ଦିଅନ୍ତୁ",
    optional: "ଇଚ୍ଛାଧୀନ"
  }
};

export function useTranslation(language: string): Translation {
  return translations[language] || translations.en;
}

export function getAvailableLanguages() {
  return Object.keys(translations);
}