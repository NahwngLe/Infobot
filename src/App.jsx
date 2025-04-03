import { useState, useRef } from 'react'
import './App.css'
import './index.css'
import SideBar from './pages/SideBar/index.jsx'
import ChatbotScreen from './pages/ChatbotScreen/index.jsx'

function App() {
  const [pdfId, setPdfId] = useState(null);
  const [file, setFile] = useState("")
  const [user, setUser] = useState("default")
  const fileInputRef = useRef(null)
  
  console.log("🚀 ~ SideBar ~ file:", file)
  console.log("🚀 ~ App ~ pdfId:", pdfId)

  return (
    <div className='flex'>
      <SideBar setFile={setFile} fileInputRef={fileInputRef} user={user} setPdfId={setPdfId} />
      <ChatbotScreen file={file} setFile={setFile} fileInputRef={fileInputRef} setPdfId={setPdfId} pdfId={pdfId} user={user} />
    </div>
  )
}

export default App
