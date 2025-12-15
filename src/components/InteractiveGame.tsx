import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, Trophy, Star, ArrowRight } from "lucide-react";


interface InteractiveGameProps {
  subject: string;
  topic: string;
  onGameComplete: (score: number) => void;
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    explanation: "2 + 2 equals 4. This is basic addition.",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correct: 1,
    explanation: "Mercury is the planet closest to the Sun in our solar system.",
    difficulty: 'medium'
  },
  {
    id: 3,
    question: "What is the result of 5 × 6?",
    options: ["25", "30", "35", "40"],
    correct: 1,
    explanation: "5 multiplied by 6 equals 30.",
    difficulty: 'easy'
  }
];

export function InteractiveGame({ subject, topic, onGameComplete, onBack }: InteractiveGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === question.correct) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < sampleQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsGameComplete(true);
      onGameComplete(score);
    }
  };

  if (isGameComplete) {
    const finalScore = score + (streak * 2);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-yellow-100 rounded-full">
              <Trophy className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <CardTitle>Game Complete!</CardTitle>
          <CardDescription>{subject} - {topic}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">🎯</div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p>{Math.round((score / (sampleQuestions.length * 10)) * 100)}%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">⭐</div>
              <p className="text-sm text-muted-foreground">Final Score</p>
              <p>{finalScore} pts</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl">🔥</div>
              <p className="text-sm text-muted-foreground">Best Streak</p>
              <p>{streak} in a row</p>
            </div>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={() => window.location.reload()}>Play Again</Button>
            <Button variant="outline" onClick={onBack}>Back to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <div className="flex items-center gap-4">
          <Badge variant="outline">Score: {score}</Badge>
          {streak > 0 && (
            <Badge variant="default" className="bg-orange-500">
              🔥 {streak} streak
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{subject} - {topic}</CardTitle>
              <CardDescription>Question {currentQuestion + 1} of {sampleQuestions.length}</CardDescription>
            </div>
            <Badge 
              variant={question.difficulty === 'easy' ? 'secondary' : 
                     question.difficulty === 'medium' ? 'default' : 'destructive'}
            >
              {question.difficulty}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-lg mb-4">{question.question}</h3>
            
            <div className="grid gap-3">
              {question.options.map((option, index) => {
                let buttonVariant: "outline" | "default" | "destructive" = "outline";
                let icon = null;
                
                if (selectedAnswer !== null) {
                  if (index === question.correct) {
                    buttonVariant = "default";
                    icon = <CheckCircle className="w-4 h-4 text-green-600" />;
                  } else if (index === selectedAnswer && index !== question.correct) {
                    buttonVariant = "destructive";
                    icon = <XCircle className="w-4 h-4 text-red-600" />;
                  }
                }
                
                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className="justify-start h-auto p-4 text-left"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      {icon}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-blue-600" />
                Explanation
              </h4>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <Button onClick={handleNext} className="w-full">
              {currentQuestion + 1 < sampleQuestions.length ? (
                <>Next Question <ArrowRight className="w-4 h-4 ml-2" /></>
              ) : (
                "Complete Game"
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}