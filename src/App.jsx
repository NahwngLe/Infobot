import { useState } from 'react'
import './App.css'
import './index.css'
import SideBar from './pages/SideBar/index.jsx'
import ChatbotScreen from './pages/ChatbotScreen/index.jsx'

function App() {

  return (
    <div className='flex'>
      <SideBar />
      <ChatbotScreen />
    </div>
  )
}

export default App
