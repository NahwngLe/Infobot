import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const QuizDetail = () => {
  const location = useLocation();
  const quizDetail = location.state?.quizDetail;
  console.log("🚀 ~ QuizDetail ~ quizDetail:", quizDetail)

  const quizzes = quizDetail?.quizzes || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentQuiz = quizzes[currentIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1s loading

    return () => clearTimeout(timeout);
  }, []);

  const handleSelect = (index) => {
    if (selected !== null) return; // Không cho chọn lại
    setSelected(index);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetQuestionState();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setSelected(null);
    setShowAnswer(false);
  };

  if (!quizDetail) {
    return <p className="text-center mt-10 text-red-500">Không có dữ liệu quiz</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-900">
        <div className="animate-spin h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-10 text-white bg-gray-900 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">
        📘 Quiz: {quizDetail.quiz_name}
      </h2>

      <div className="bg-white text-black rounded-xl p-6 w-full max-w-2xl shadow-lg">
        <p className="text-lg font-medium mb-4">
          Câu {currentIndex + 1}/{quizzes.length}: {currentQuiz.question}
        </p>

        <div className="space-y-3">
          {currentQuiz.options.map((option, idx) => {
            const isCorrect = showAnswer && idx === currentQuiz.answer;
            const isWrong = showAnswer && selected === idx && idx !== currentQuiz.answer;

            return (
              <button
                key={idx}
                className={`w-full text-left p-3 rounded-lg border transition-all 
                  ${selected === idx ? "bg-blue-100" : "bg-gray-100"}
                  ${isCorrect ? "border-green-500 bg-green-100" : ""}
                  ${isWrong ? "border-red-500 bg-red-100" : ""}
                `}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className="mt-4">
            <p className="text-green-600 font-semibold">
              ✅ Đáp án đúng: {currentQuiz.options[currentQuiz.answer]}
            </p>
            {currentQuiz.explanation && (
              <p className="mt-2 text-gray-800 italic">📘 Giải thích: {currentQuiz.explanation}</p>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <MdKeyboardArrowLeft size={18} /> Trước
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentIndex === quizzes.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:opacity-50"
          >
            Tiếp <MdKeyboardArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
