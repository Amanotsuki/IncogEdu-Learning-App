import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BookOpen, Calculator, Beaker, Cpu, Play, FileText } from "lucide-react";


interface STEMSubjectsProps {
  selectedGrade: number;
  onSubjectSelect: (subject: string, topic: string) => void;
  onStartGame: (subject: string, topic: string) => void;
  onStartAssessment: (subject: string, topic: string) => void;
  currentLanguage: string;
}

const stemSubjects = {
  math: {
    name: "Mathematics",
    icon: Calculator,
    color: "bg-blue-500",
    topics: {
      6: ["Basic Algebra", "Geometry Basics", "Fractions", "Decimals"],
      7: ["Linear Equations", "Angles", "Percentages", "Data Handling"],
      8: ["Quadratic Equations", "Triangles", "Probability", "Statistics"],
      9: ["Polynomials", "Circles", "Coordinate Geometry", "Trigonometry"],
      10: ["Real Numbers", "Sequences", "Areas & Volumes", "Advanced Trigonometry"],
      11: ["Functions", "Limits", "3D Geometry", "Mathematical Reasoning"],
      12: ["Calculus", "Vectors", "Probability Distribution", "Linear Programming"]
    }
  },
  science: {
    name: "Science",
    icon: Beaker,
    color: "bg-green-500",
    topics: {
      6: ["Light & Shadows", "Electricity", "Magnets", "Living Organisms"],
      7: ["Heat & Temperature", "Acids & Bases", "Nutrition", "Respiration"],
      8: ["Force & Motion", "Chemical Reactions", "Reproduction", "Sound"],
      9: ["Gravitation", "Atomic Structure", "Tissues", "Natural Resources"],
      10: ["Light Reflection", "Carbon Compounds", "Heredity", "Environment"],
      11: ["Mechanics", "Thermodynamics", "Cell Biology", "Plant Physiology"],
      12: ["Electromagnetism", "Organic Chemistry", "Genetics", "Ecology"]
    }
  },
  technology: {
    name: "Technology",
    icon: Cpu,
    color: "bg-purple-500",
    topics: {
      6: ["Computer Basics", "Internet Safety", "Digital Art", "Simple Programming"],
      7: ["MS Office", "Web Browsing", "Digital Citizenship", "Logo Programming"],
      8: ["Database Basics", "HTML Basics", "Digital Media", "Scratch Programming"],
      9: ["Python Basics", "Web Development", "Digital Design", "App Development"],
      10: ["Data Structures", "Advanced Python", "Cybersecurity", "IoT Basics"],
      11: ["Java Programming", "Database Management", "Network Security", "AI Basics"],
      12: ["Advanced Algorithms", "Machine Learning", "Cloud Computing", "Robotics"]
    }
  },
  engineering: {
    name: "Engineering",
    icon: BookOpen,
    color: "bg-orange-500",
    topics: {
      6: ["Simple Machines", "Building Blocks", "Design Thinking", "Problem Solving"],
      7: ["Mechanical Systems", "Electrical Circuits", "Engineering Drawing", "Materials"],
      8: ["Structural Design", "Electronics", "CAD Basics", "Manufacturing"],
      9: ["Robotics Basics", "Control Systems", "3D Modeling", "Automation"],
      10: ["Mechatronics", "Renewable Energy", "Advanced CAD", "Project Management"],
      11: ["Fluid Mechanics", "Thermodynamics", "Digital Electronics", "System Design"],
      12: ["Advanced Robotics", "Power Systems", "Communication Systems", "Innovation"]
    }
  }
};

export function STEMSubjects({ 
  selectedGrade, 
  onSubjectSelect, 
  onStartGame, 
  onStartAssessment,
  currentLanguage 
}: STEMSubjectsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(stemSubjects).map(([key, subject]) => {
        const Icon = subject.icon;
        const topics = subject.topics[selectedGrade as keyof typeof subject.topics] || [];
        
        return (
          <Card key={key} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${subject.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>Grade {selectedGrade} Topics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topics.map((topic, index) => (
                  <div key={topic} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{topic}</span>
                      <Badge variant="secondary">{Math.floor(Math.random() * 100)}% Complete</Badge>
                    </div>
                    <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSubjectSelect(subject.name, topic)}
                        className="flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        Learn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStartGame(subject.name, topic)}
                        className="flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        Play
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStartAssessment(subject.name, topic)}
                        className="flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}