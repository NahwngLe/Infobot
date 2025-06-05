import { Routes, Route } from 'react-router-dom'
import SideBar from './pages/SideBar'
import ChatbotScreen from './pages/ChatbotScreen'
import QuizDetail from './pages/QuizScreen/QuizDetail'
import { useState, useRef } from 'react'
import QuizScreen from './pages/QuizScreen/QuizScreen'
import OperateScreen from './pages/ChatbotScreen/OperateScreen'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { AuthProvider } from './utils/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [pdfId, setPdfId] = useState(null)
  const [file, setFile] = useState("")
  const [user, setUser] = useState("default")
  const fileInputRef = useRef(null)

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <SideBar
                    setFile={setFile}
                    fileInputRef={fileInputRef}
                    user={user}
                    setPdfId={setPdfId}
                  />

                  <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                    <div className="container mx-auto">
                      <Routes>
                        <Route
                          index
                          element={
                            <div className="fade-in">
                              <ChatbotScreen
                                file={file}
                                setFile={setFile}
                                fileInputRef={fileInputRef}
                                setPdfId={setPdfId}
                                pdfId={pdfId}
                                user={user}
                              />
                            </div>
                          }
                        />
                        <Route path="/operate/:pdfId" element={<OperateScreen />}>
                          <Route index element={<QuizScreen />} />
                          <Route path="detail/:quizName" element={<QuizDetail />} />
                        </Route>
                      </Routes>
                    </div>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
