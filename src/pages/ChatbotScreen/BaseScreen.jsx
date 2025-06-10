import React from 'react'
import UploadFile from './UploadFile'
import { FaRobot, FaFileAlt } from 'react-icons/fa'
import { TbCircleDottedLetterI } from "react-icons/tb";

const BaseScreen = ({ setFile, fileInputRef, handleUploadFile }) => {
    return (
        <div className="flex flex-col items-center mt-12 justify-center min-h-[80vh] px-4 text-white">
            <div className="max-w-3xl w-full text-center space-y-8">
                {/* Hero Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                        <TbCircleDottedLetterI className="w-16 h-16 text-blue-500" />
                        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Turn PDFs into Quizzes
                        </h1>
                        <FaFileAlt className="w-12 h-12 text-purple-500" />
                    </div>

                    <p className="text-xl text-gray-400">
                        Upload your PDF and automatically generate quizzes for learning, teaching, or testing.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-2">AI-Powered Quiz Generation</h3>
                        <p className="text-gray-400">Leverage intelligent algorithms to create meaningful quiz questions from your PDF content.</p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-2">Customizable Output</h3>
                        <p className="text-gray-400">Choose quiz type, language, and difficulty to suit your needs.</p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-2">Effortless Sharing</h3>
                        <p className="text-gray-400">Export or share your quizzes easily with students, teams, or friends.</p>
                    </div>
                </div>


                {/* Upload Section */}
                <div className="mt-12">
                    <UploadFile
                        setFile={setFile}
                        fileInputRef={fileInputRef}
                        handleUploadFile={handleUploadFile}
                    />
                </div>

                {/* Trust Badge */}
                <div className="mt-12 text-sm text-gray-500">
                    <p>Secure file handling • Advanced AI processing • 24/7 Support</p>
                </div>
            </div>
        </div>
    )
}

export default BaseScreen