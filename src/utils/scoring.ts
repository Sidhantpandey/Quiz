import { Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export const calculateScore = (answers: number[]) => {
  const validAnswers = answers.filter(a => a !== undefined);
  const maxScore = validAnswers.length * 3;
  const totalScore = validAnswers.reduce((acc, curr) => acc + (3 - curr), 0);
  return Math.round((totalScore / maxScore) * 100);
};

export const calculateCategoryScores = (answers: number[]) => {
  const categories = {
    anxiety: [0, 5, 10, 15, 20],
    depression: [1, 6, 11, 16, 21],
    stress: [2, 7, 12, 17, 22],
    social: [3, 8, 13, 18, 23],
    emotional: [4, 9, 14, 19, 24]
  };

  const calculateCategoryScore = (indices: number[]) => {
    const categoryAnswers = indices.map(i => answers[i]).filter(a => a !== undefined);
    if (categoryAnswers.length === 0) return 0;
    const maxScore = categoryAnswers.length * 3;
    const totalScore = categoryAnswers.reduce((acc, curr) => acc + (3 - curr), 0);
    return (totalScore / maxScore) * 100;
  };

  return {
    anxiety: calculateCategoryScore(categories.anxiety),
    depression: calculateCategoryScore(categories.depression),
    stress: calculateCategoryScore(categories.stress),
    social: calculateCategoryScore(categories.social),
    emotional: calculateCategoryScore(categories.emotional)
  };
};

export const getAssessmentLevel = (score: number) => {
  if (score >= 80) {
    return {
      level: "Excellent Mental Health",
      description: "Your responses indicate a strong state of mental well-being. You demonstrate excellent emotional regulation, healthy coping mechanisms, and robust psychological resilience.",
      recommendation: "To maintain your excellent mental health, we recommend exploring our comprehensive wellness resources. Visit our documentation section at /resources to discover evidence-based practices for continued mental well-being.",
      action: {
        text: "View Wellness Resources",
        url: "/resources",
      },
      color: "bg-emerald-500",
      icon: CheckCircle2
    };
  } else if (score >= 60) {
    return {
      level: "Moderate Mental Health",
      description: "Your mental health appears generally stable, with good awareness of your emotional state. While you have developed some effective coping strategies, there may be opportunities to strengthen your resilience further.",
      recommendation: "Our AI wellness companion can help you develop personalized coping strategies and provide daily support. Connect with our chatbot for guided exercises and emotional support.",
      action: {
        text: "Chat with Wellness Assistant",
        url: "/chat",
      },
      color: "bg-blue-500",
      icon: Shield
    };
  } else {
    return {
      level: "Needs Attention",
      description: "Your responses suggest you might be experiencing some challenges with your mental well-being. Remember that seeking support is a sign of strength, not weakness.",
      recommendation: "Based on your responses, we strongly recommend scheduling a consultation with one of our mental health professionals. They can provide personalized guidance and support strategies tailored to your needs.",
      action: {
        text: "Schedule Consultation",
        url: "/consultation",
      },
      color: "bg-rose-500",
      icon: AlertCircle
    };
  }
};