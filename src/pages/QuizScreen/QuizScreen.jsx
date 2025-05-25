import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfApi from '../../services/pdfApi'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

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

  const fetchPdfUrl = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`)
      if (!response.ok) {
        throw new Error('Không thể tải PDF')
      }
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
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
    <div className="pdf-screen h-screen w-[80vw] flex">
      {/* PDF Viewer (react-pdf) */}
      <div className="h-screen w-[37vw] overflow-y-auto border-r border-gray-300">
        {pdfUrl ? (
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => console.error("Lỗi load PDF", error)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={550} />
            ))}
          </Document>
        ) : (
          <p>Đang tải PDF...</p>
        )}
      </div>

      {/* Quiz Area */}
      <div className='quiz-screen h-screen w-[43vw] overflow-y-auto flex flex-col items-center bg-gray-800 text-white border-2 border-black'>
        <h2 className='text-2xl mt-6'>🎮 Các quiz đã có</h2>

        <button
          className="mt-4 mb-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white"
          onClick={handleOpenModal}
        >
          ➕ Tạo Quiz mới
        </button>

        {quiz.length > 0 ? (
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
          <p className='mt-6'>❌ Không có quiz nào</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Modal chọn ngôn ngữ */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">🌐 Chọn ngôn ngữ cho Quiz</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              disabled={creating}
            >
              <option value="eng">🇬🇧 English</option>
              <option value="vn">🇻🇳 Tiếng Việt</option>
            </select>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                onClick={() => setShowModal(false)}
                disabled={creating}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:opacity-50"
                onClick={handleStartCreateQuiz}
                disabled={creating}
              >
                {creating ? "Đang tạo..." : "Tạo Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizScreen
