import { useState, useRef } from 'react'
import './App.css'
import './index.css'
import SideBar from './pages/SideBar/index.jsx'
import ChatbotScreen from './pages/ChatbotScreen/index.jsx'

function App() {
  const [file, setFile] = useState("")
  const fileInputRef = useRef(null)
  console.log("🚀 ~ SideBar ~ file:", file)

  const handleUploadFile = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='flex'>
      <SideBar setFile={setFile} fileInputRef={fileInputRef} handleUploadFile={handleUploadFile} />
      <ChatbotScreen setFile={setFile} fileInputRef={fileInputRef} handleUploadFile={handleUploadFile} />
    </div>
  )
}

export default App
