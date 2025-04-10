import React from 'react'
import pdfApi from '../../services/pdfApi'
import { useState, useEffect } from 'react'

const QuizScreen = ({ pdfId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState(null)
  console.log("🚀 ~ QuizScreen ~ quiz:", quiz)


  useEffect(() => {
    const handleCheckId = async () => {
      try {
        const response = await pdfApi.getQuiz(pdfId)
        console.log("Check quiz");

        if (response.length > 0) {
          console.log("exists quiz");

          setMessage(response.message);
          setError("");
          setQuiz(response)
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(err.response.data.detail);
          setMessage("");
        } else {
          setError("Something went wrong. Please try again.");
          setMessage("");
        }
      }
    };

    pdfId && handleCheckId()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const handleCreateQuiz = async (id) => {
    setIsCreatingQuiz(true)
    try {
      const response = await pdfApi.createQuizFromId(id)
      console.log(response);
      setQuizId(response.pdf_id)
    }
    catch (error) {
      console.log('Failed to create quiz: ', error);
    }
    finally {
      setTimeout(() => setIsCreatingQuiz(false), 1000);
    }
  }

  return (
    <div>
      {
        isLoading ? (
          <div className="flex flex-1 items-center justify-center bg-gray-800 w-[43vw] h-screen">
            <div className="animate-spin h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"></div>
          </div>
        ) : isCreatingQuiz ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white py-8 px-28 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin h-20 w-20 border-4 border-pink-500 border-t-transparent rounded-full"></div>
              <p className="mt-10 text-gray-700 text-4xl">Đang tạo quiz</p>
              <button
                className="mt-10 mb-auto px-8 py-4 bg-red-500 text-white rounded-lg"
                onClick={() => setIsCreatingQuiz(false)}
              >
                Close
              </button>
            </div>
          </div>
        ) : quiz ? (
          <div className='quiz-screen h-screen w-[43vw] overflow-y-auto flex flex-col items-center flex-1 bg-gray-800 text-white border-2 border-black'>
            <p className='mt-5 text-2xl' >Các quiz đã có</p>
            {quiz ? (
              quiz.map((quiz_detail, index) => (
                <ul key={index}
                  className='rounded-sm mt-2 bg-gray-50 p-1 
                            border text-gray-800 border-blue-300 
                            shadow-sm w-[95%] cursor-pointer
                            hover:bg-opacity-90
                            active:bg-opacity-70
                            '
                
                >
                  <p className='mx-1'>
                    {index + 1}. {quiz_detail.quiz_name}
                  </p>
                </ul>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>No quizz found</div>
        )
      }
    </div>
  )
}

export default QuizScreen