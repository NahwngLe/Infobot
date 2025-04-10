import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import pdfApi from '../../services/pdfApi'

const QuizScreen = () => {
  const { pdfId } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuiz()
  }, [pdfId])

  const fetchQuiz = async () => {
    try {
      const response = await pdfApi.getQuiz(pdfId)
      setQuiz(response)
      setError("")
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Không tìm thấy quiz.")
      } else {
        setError("Lỗi không xác định.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickQuiz = (quizDetail) => {
    navigate(`/operate/${pdfId}/detail/${quizDetail.quiz_name}`, {
      state: { quizDetail }
    })
  }

  const handleCreateQuiz = async () => {
    if (!pdfId) return
    try {
      setCreating(true)
      await pdfApi.createQuizFromId(pdfId)
      await fetchQuiz() // reload lại danh sách quiz
    } catch (err) {
      alert("Tạo quiz thất bại.")
    } finally {
      setCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="pdf-screen h-screen w-[80vw] flex">
      {/* PDF Viewer */}
      <div className="h-screen w-[37vw]">
        <iframe
          src={`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`}
          width="100%"
          height="100%"
          title="PDF Viewer"
          allow="fullscreen"
        />
      </div>

      {/* Quiz Area */}
      <div className='quiz-screen h-screen w-[43vw] overflow-y-auto flex flex-col items-center bg-gray-800 text-white border-2 border-black'>
        <h2 className='text-2xl mt-6'>🎮 Các quiz đã có</h2>

        <button
          className="mt-4 mb-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white disabled:opacity-50"
          onClick={handleCreateQuiz}
          disabled={creating}
        >
          {creating ? "Đang tạo..." : "➕ Tạo Quiz mới"}
        </button>


        {quiz && quiz.length > 0 ? (
          quiz.map((quizDetail, index) => (
            <ul
              key={index}
              className='rounded mt-3 bg-white text-black p-3 w-[90%] shadow hover:bg-gray-100 cursor-pointer'
              onClick={() => handleClickQuiz(quizDetail)}
            >
              <p>{index + 1}. {quizDetail.quiz_name}</p>
            </ul>
          ))
        ) : (
          <p className='mt-6'>❌ No quiz found</p>
        )}
      </div>
    </div>
  )
}

export default QuizScreen
