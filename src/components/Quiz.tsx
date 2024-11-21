import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RefreshCcw, Shield, AlertCircle, CheckCircle2, Moon, Sun, ExternalLink } from 'lucide-react';
import questions from '../data/questions';
import { calculateScore, getAssessmentLevel, calculateCategoryScores } from '../utils/scoring';
import StressChart from './StressChart';
import CategoryChart from './CategoryChart';
import PieChartAnalysis from './PieChartAnalysis';

interface QuizProps {
  setShowConsultation: (show: boolean) => void;
}

const gradients = {
  anxiety: 'from-[#FF6B6B] to-[#FF8E8E]',
  depression: 'from-[#4ECDC4] to-[#6EE7E7]',
  stress: 'from-[#45B7D1] to-[#65D7F1]',
  social: 'from-[#96CEB4] to-[#B6EED4]',
  emotional: 'from-[#FFEEAD] to-[#FFFECD]'
};

const ThemeToggle = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
    aria-label="Toggle theme"
  >
    {isDark ? (
      <Sun className="h-5 w-5 text-primary" />
    ) : (
      <Moon className="h-5 w-5 text-primary" />
    )}
  </button>
);

export default function Quiz({ setShowConsultation }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore(answers);
    const { level, description, recommendation, action, color, icon: Icon } = getAssessmentLevel(score);
    const categoryScores = calculateCategoryScores(answers);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex p-4 rounded-full ${color} mb-4 animate-pulse`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-card-foreground mb-4">Your Assessment Results</h2>
              <div className="mb-6">
                <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text animate-pulse">
                  {score}%
                </div>
                <div className={`text-xl font-semibold ${color.replace('bg-', 'text-')}`}>
                  {level}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Stress Level Progression</h3>
                <StressChart data={answers} />
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Category Distribution</h3>
                <PieChartAnalysis data={categoryScores} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Category Analysis</h3>
                <CategoryChart data={categoryScores} />
              </div>
              <div className="space-y-4">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(categoryScores).map(([category, score]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="capitalize">{category}</span>
                          <span>{score.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${gradients[category as keyof typeof gradients]}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Assessment Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>

              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
                <p className="text-card-foreground">{recommendation}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowConsultation(true)}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground rounded-full font-medium shadow-lg hover:opacity-90 transition-all duration-200"
                >
                  {action.text}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={resetQuiz}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-all duration-200"
                >
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  Take Quiz Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl p-8 animate-fadeIn">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-card-foreground">Mental Health Assessment</h2>
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8 animate-fadeIn">
            <h3 className="text-xl font-medium text-card-foreground mb-6">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left px-6 py-4 bg-card border border-border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200 group ${
                    answers[currentQuestion] === index ? 'border-primary bg-accent' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-card-foreground group-hover:text-accent-foreground">
                      {option}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            {currentQuestion === questions.length - 1 && answers[currentQuestion] !== undefined && (
              <button
                onClick={() => setShowResults(true)}
                className="ml-auto inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:opacity-90 transition-all duration-200"
              >
                View Results
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}