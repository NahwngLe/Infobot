import { Routes, Route } from 'react-router-dom'
import SideBar from './pages/SideBar'
import ChatbotScreen from './pages/ChatbotScreen'
import QuizDetail from './pages/QuizScreen/QuizDetail'
import { useState, useRef } from 'react'
import QuizScreen from './pages/QuizScreen/QuizScreen'
import OperateScreen from './pages/ChatbotScreen/OperateScreen'
import OperateActions from './pages/ChatbotScreen/OperateActions'

function App() {
  const [pdfId, setPdfId] = useState(null)
  const [file, setFile] = useState("")
  const [user, setUser] = useState("default")
  const fileInputRef = useRef(null)

  return (
    <div className='flex'>
      <SideBar setFile={setFile} fileInputRef={fileInputRef} user={user} setPdfId={setPdfId} />
      <Routes>
        <Route
          index
          element={
            <ChatbotScreen
              file={file}
              setFile={setFile}
              fileInputRef={fileInputRef}
              setPdfId={setPdfId}
              pdfId={pdfId}
              user={user}
            />
          }
        />
        <Route path="/operate/:pdfId" element={<OperateScreen />}>
          {/* <Route index element={<OperateActions />} /> */}
          <Route index element={<QuizScreen />} />
          <Route path="detail/:quizName" element={<QuizDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
