import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Pool of 20 questions - 10 will be randomly selected for each quiz
const allQuizQuestions: QuizQuestion[] = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1,
    explanation: "Mercury is the closest planet to the Sun! It's very hot during the day."
  },
  {
    question: "Which planet has beautiful rings that you can see?",
    options: ["Jupiter", "Mars", "Saturn", "Neptune"],
    correctAnswer: 2,
    explanation: "Saturn has beautiful rings made of ice and rocks that we can see with telescopes!"
  },
  {
    question: "Which planet do we live on?",
    options: ["Mars", "Jupiter", "Venus", "Earth"],
    correctAnswer: 3,
    explanation: "We live on planet Earth! It's the only planet we know that has life."
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mercury", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet because it looks red from all the rusty iron on its surface!"
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: 2,
    explanation: "Jupiter is the biggest planet! It's so big that more than 1,000 Earths could fit inside it!"
  },
  {
    question: "How many planets are in our solar system?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    explanation: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
  },
  {
    question: "Which planet has the Great Red Spot?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 1,
    explanation: "Jupiter has the Great Red Spot, which is actually a giant storm that has been going for hundreds of years!"
  },
  {
    question: "Which planet does not rotate, but rolls like a ball?",
    options: ["Earth", "Saturn", "Neptune", "Uranus"],
    correctAnswer: 3,
    explanation: "Uranus spins on its side like a rolling ball! It's the only planet that does this."
  },
  {
    question: "What is Pluto called now?",
    options: ["A regular planet", "A dwarf planet", "A moon", "A star"],
    correctAnswer: 1,
    explanation: "Pluto is now called a 'dwarf planet'! It used to be the 9th planet, but scientists learned it's smaller and shares its space with other objects."
  },
  {
    question: "Which planet is the hottest in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: 1,
    explanation: "Venus is the hottest planet! Even though Mercury is closer to the Sun, Venus has thick clouds that trap heat like a greenhouse."
  },
  {
    question: "What is the Sun?",
    options: ["A planet", "A star", "A moon", "A comet"],
    correctAnswer: 1,
    explanation: "The Sun is a star! It's a giant ball of hot gas that gives us light and heat."
  },
  {
    question: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 3,
    explanation: "Saturn has the most moons with 146! That's a lot of friends in space!"
  },
  {
    question: "How long does it take Earth to go around the Sun?",
    options: ["1 day", "1 month", "1 year", "1 week"],
    correctAnswer: 2,
    explanation: "It takes Earth 1 year (365 days) to go all the way around the Sun! That's why we have birthdays every year."
  },
  {
    question: "Which planet is smallest in our solar system?",
    options: ["Mercury", "Mars", "Venus", "Pluto"],
    correctAnswer: 0,
    explanation: "Mercury is the smallest planet! It's even smaller than some moons in our solar system."
  },
  {
    question: "What makes Saturn special?",
    options: ["It's the biggest", "It has rings", "It's closest to Earth", "It's purple"],
    correctAnswer: 1,
    explanation: "Saturn is famous for its beautiful rings made of ice and rocks! You can see them with a telescope."
  },
  {
    question: "Which planet is called Earth's twin?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    correctAnswer: 1,
    explanation: "Venus is called Earth's twin because it's almost the same size as Earth! But it's much hotter."
  },
  {
    question: "What color is Mars?",
    options: ["Blue", "Green", "Red", "Yellow"],
    correctAnswer: 2,
    explanation: "Mars looks red because it has lots of rusty iron on its surface! That's why it's called the Red Planet."
  },
  {
    question: "Which planet has the strongest winds?",
    options: ["Earth", "Mars", "Neptune", "Venus"],
    correctAnswer: 2,
    explanation: "Neptune has the strongest winds! They blow faster than race cars - up to 2,100 km per hour!"
  },
  {
    question: "What is special about Earth?",
    options: ["It has rings", "It has life", "It's the biggest", "It's purple"],
    correctAnswer: 1,
    explanation: "Earth is the only planet we know that has life! It has animals, plants, and people like us."
  },
  {
    question: "How many years does it take Pluto to go around the Sun?",
    options: ["1 year", "10 years", "100 years", "248 years"],
    correctAnswer: 3,
    explanation: "Pluto takes 248 Earth years to go around the Sun once! That's a really, really long year!"
  }
];

// Function to randomly select 10 questions from the pool
const getRandomQuestions = (questions: QuizQuestion[], count: number): QuizQuestion[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

interface PlanetQuizProps {
  onComplete?: (score: number) => void;
}

const PlanetQuiz = ({ onComplete }: PlanetQuizProps = {}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  
  // Initialize quiz with random questions when component mounts
  useEffect(() => {
    const randomQuestions = getRandomQuestions(allQuizQuestions, 10);
    setQuizQuestions(randomQuestions);
  }, []);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return; // Prevent changing answer after submission
    setSelectedOption(optionIndex);
  };
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setShowAnswer(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < 9) { // 0-9 = 10 questions
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizComplete(true);
      if (onComplete) {
        onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
      }
    }
  };
  
  const restartQuiz = () => {
    const randomQuestions = getRandomQuestions(allQuizQuestions, 10);
    setQuizQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizComplete(false);
  };
  
  const progress = ((currentQuestionIndex + 1) / 10) * 100;
  
  // Don't render until questions are loaded
  if (quizQuestions.length === 0) {
    return (
      <Card className="bg-black/30 backdrop-blur-sm border-white/10">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-white text-lg">🚀 Loading Space Quiz...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-white">Space Quiz Challenge</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-blue-200">
            <span>Question {currentQuestionIndex + 1} of 10</span>
            <span>Score: {score}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent>
        {!quizComplete ? (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-center text-white">{currentQuestion.question}</h3>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === index 
                    ? showAnswer 
                      ? index === currentQuestion.correctAnswer 
                        ? "default" 
                        : "destructive" 
                      : "default" 
                    : showAnswer && index === currentQuestion.correctAnswer 
                      ? "default" 
                      : "outline"}
                  className={`justify-start text-left h-auto py-3 ${
                    showAnswer && index === currentQuestion.correctAnswer 
                      ? "bg-green-600 hover:bg-green-700" 
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 text-white">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </Button>
              ))}
            </div>
            
            {showAnswer && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="font-medium text-white">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6 py-8">
            <h3 className="text-2xl font-bold text-white">Quiz Complete!</h3>
            <div className="text-5xl font-bold text-yellow-300">
              {score} / 10
            </div>
            <p className="text-xl text-white">
              {score === 10 
                ? "Amazing! You're a space expert! 🚀" 
                : score >= 5 
                  ? "Great job! You know a lot about space! 🎉" 
                  : "Keep exploring and learning about space! 🔭"}
            </p>
            
            <div className="flex justify-center gap-4">
              {score === 10 && (
                <div className="text-lg py-2 px-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full text-white font-bold">
                  Space Master!
                </div>
              )}
              {score >= 5 && score < 10 && (
                <div className="text-lg py-2 px-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full text-white font-bold">
                  Space Explorer! 🌟
                </div>
              )}
              {score < 5 && (
                <div className="text-lg py-2 px-4 bg-gradient-to-r from-green-400 to-teal-600 rounded-full text-white font-bold">
                  Space Cadet!
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center gap-4">
        {!quizComplete ? (
          <>
            {!showAnswer ? (
              <Button 
                onClick={handleCheckAnswer} 
                disabled={selectedOption === null}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                {currentQuestionIndex < 9 ? "Next Question" : "See Results"}
              </Button>
            )}
          </>
        ) : (
          <Button 
            onClick={restartQuiz}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            🔄 Start New Quiz ⭐ 
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanetQuiz;