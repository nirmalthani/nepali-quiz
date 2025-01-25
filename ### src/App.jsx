### src/App.jsx
```jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRightCircle } from "lucide-react";

// Minimal placeholders for Card and Button. If you wish, replace with shadcn/ui or any design system.
const Card = ({ children, className = "" }) => (
  <div className={"bg-white p-4 rounded-2xl shadow-xl " + className}>{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyle =
    "p-2 rounded-md text-sm md:text-base transition-colors duration-200 ";
  const variantStyle =
    variant === "outline"
      ? "border border-gray-300 hover:bg-gray-200"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button onClick={onClick} className={baseStyle + variantStyle + " " + className}>
      {children}
    </button>
  );
};

function App() {
  const questions = [
    {
      question: "Which Nepali pop singer is known for the hit track 'Purba Paschim Rail'?",
      options: ["Sugam Pokharel", "Anil Singh", "Rajesh Payal Rai", "Adrian Pradhan"],
      correctAnswer: 0,
    },
    {
      question: "Which Nepali band sang the famous song 'Pirati ko Mitho Tyo'?",
      options: ["The Axe Band", "Cobweb", "1974 AD", "Albatross"],
      correctAnswer: 0,
    },
    {
      question: "Who is popularly called the 'Lok Star' in Nepal for blending pop with folk music?",
      options: ["Raju Lama", "Narayan Gopal", "Hemant Rana", "Prakash Saput"],
      correctAnswer: 3,
    },
    {
      question: "The movie 'Kabaddi' is known for featuring which popular singer's cameo?",
      options: ["Pradeep Bastola", "Dayahang Rai", "Nischal Basnet", "Wilson Bikram Rai"],
      correctAnswer: 2,
    },
    {
      question: "Which Nepali pop artist is known for the pop song 'Aaipugyo' featuring rap sections?",
      options: ["Deepesh Kishor Bhattarai", "Girish Khatiwada", "5:55", "Laure"],
      correctAnswer: 1,
    },
    {
      question: "What's the name of the reality TV show that spotlights emerging bands and solo artists?",
      options: ["The Voice of Nepal", "Nepal Idol", "Sprite Band Challenge", "Boogie Woogie"],
      correctAnswer: 2,
    },
    {
      question: "Which female pop singer soared to popularity with the hit 'Kasari Bhanu?'",
      options: ["Sabin Rai", "Indira Joshi", "Trishala Gurung", "Melina Rai"],
      correctAnswer: 2,
    },
    {
      question: "Who is referred to as 'Nepali Shawty' on social media for her pop-rap fusion style?",
      options: ["Yukta Gurung", "Unnati Gurung", "Samriddhi Rai", "Astha Raut"],
      correctAnswer: 2,
    },
    {
      question: "'Parkhai Ma,' a trending pop-folk track, is performed by which duo?",
      options: ["Shiva Pariyar & Ani Choying", "Bipul Chettri & Bartika Eam Rai", "Swoopna Suman & Trishna Gurung", "Sajan Raj Vaidya & Neetesh Jung Kunwar"],
      correctAnswer: 2,
    },
    {
      question: "Which Nepali pop sensation collaborated with an Indian artist on the track 'Phulbutte Sari'?",
      options: ["Suman Thapa", "Priyanka Karki", "Trishna Gurung", "Melina Rai"],
      correctAnswer: 3,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (optionIndex) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const correctCount = selectedOptions.reduce((count, answer, index) => {
    return answer === questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Quiz Results
        </motion.h1>
        <Card className="p-4 w-full max-w-xl">
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <CheckCircle className="text-green-500 mb-2" size={48} />
              <p className="text-xl">
                You answered <span className="font-bold">{correctCount}</span> out of
                {" "}
                <span className="font-bold">{questions.length}</span> questions correctly!
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-4"
      >
        Nepali Pop Culture Quiz
      </motion.h1>
      <Card className="w-full max-w-xl">
        <CardContent>
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="mb-4 text-base md:text-lg">{currentQ.question}</p>
            <div className="grid grid-cols-1 gap-2">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedOptions[currentQuestion] === index;
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleOptionClick(index)}
                    className="justify-start"
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next
                    <ArrowRightCircle className="ml-2" size={20} />
                  </>
                ) : (
                  "Finish"
                )}
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

---
