import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import pdfApi from '../../services/pdfApi'


const QuizScreen = () => {
  const { pdfId } = useParams()
  const [quiz, setQuiz] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [language, setLanguage] = useState('eng')
  const [pdfUrl, setPdfUrl] = useState(null)
  const [numPages, setNumPages] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuiz()
    fetchPdfUrl()
  }, [pdfId])

  const fetchQuiz = async () => {
    try {
      const response = await pdfApi.getQuiz(pdfId)
      if (Array.isArray(response)) {
        setQuiz(response)
      } else if (response) {
        setQuiz([response])
      } else {
        setQuiz([])
      }
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

  console.log("🚀 ~ QuizScreen ~ quiz:", quiz)
  const fetchPdfUrl = async () => {
    try {
      const response = await pdfApi.getPdf(pdfId)
      if (!response) {
        throw new Error('Không thể tải PDF')
      }
      // const blob = await response.blob()
      const url = URL.createObjectURL(response)
      setPdfUrl(url)
    } catch (err) {
      console.error("Lỗi tải PDF", err)
      setError("Lỗi tải PDF")
    }
  }


  const handleClickQuiz = (quizDetail) => {
    navigate(`/operate/${pdfId}/detail/${quizDetail.quiz_name}`, {
      state: { quizDetail }
    })
  }

  const handleOpenModal = () => setShowModal(true)

  const handleStartCreateQuiz = async () => {
    setCreating(true)
    setError("")
    try {
      const response = await pdfApi.createQuizFromId(pdfId, language)
      setQuiz(prev => [...prev, { quiz_name: response.quiz_name }])
      setShowModal(false)
    } catch (err) {
      console.error(err)
      setError("Tạo quiz thất bại. Vui lòng thử lại.")
      alert("Tạo quiz thất bại. Vui lòng thử lại.")
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
    <div className="quiz-screen h-full w-full overflow-y-auto flex flex-col items-center bg-gray-900 text-white px-6 py-8 border-l border-gray-700">
      <h2 className="text-3xl font-semibold mb-6">📋 Danh sách Quiz</h2>

      <button
        className="mb-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 transition rounded-xl shadow-lg text-white font-medium"
        onClick={handleOpenModal}
      >
        ➕ Tạo Quiz mới
      </button>

      <div className="w-full max-w-2xl">
        {quiz.length > 0 ? (
          quiz.map((quizDetail, index) => (
            <div
              key={index}
              className="rounded-lg mb-4 bg-white text-gray-800 p-4 shadow-md hover:shadow-lg hover:bg-gray-100 transition cursor-pointer"
              onClick={() => handleClickQuiz(quizDetail)}
            >
              <p className="text-lg font-medium">
                {index + 1}. {quizDetail.quiz_name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-6">❌ Hiện chưa có quiz nào</p>
        )}
      </div>

      {/* Modal chọn ngôn ngữ */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              🌐 Chọn ngôn ngữ cho Quiz
            </h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled={creating}
            >
              <option value="eng">🇬🇧 English</option>
              <option value="vn">🇻🇳 Tiếng Việt</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                onClick={() => setShowModal(false)}
                disabled={creating}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
                onClick={handleStartCreateQuiz}
                disabled={creating}
              >
                {creating ? "⏳ Đang tạo..." : "🚀 Tạo Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}

export default QuizScreen
