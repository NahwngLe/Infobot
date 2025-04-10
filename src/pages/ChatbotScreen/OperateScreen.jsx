import React, { useEffect, useState } from "react";
import pdfApi from "../../services/pdfApi";
import QuizScreen from "./QuizScreen";

const OperateScreen = ({ pdfId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [quizId, setQuizId] = useState(null)
    const [isQuizScreen, setIsQuizScreen] = useState(false)
    const [isChat, setIsChat] = useState(false)

    const handleGotoQuizScreen = (id) => {
        setIsQuizScreen(true)
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="pdf-screen h-screen w-[80vw] flex">
            {/* PDF Viewer */}
            <div className="h-screen w-[37vw]">
                <iframe
                    key={pdfId}
                    src={`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`}
                    width="100%"
                    height="100%"
                    title="PDF Viewer"
                    allow="fullscreen"
                />
            </div>

            {/* Hiển thị loading trước 1s */}
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center bg-gray-100">
                    <div className="animate-spin h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"></div>
                </div>
            ) : !isQuizScreen ? (
                <div className="asking-screen flex flex-col items-center flex-1 bg-transparent border-2 border-black">
                    <button
                        className="bg-pink-400 text-white mt-20 py-3 px-4 w-80 h-12 rounded-xl
                                    hover:bg-opacity-90 hover:bg-pink-500 
                                    active:bg-pink-500 active:bg-opacity-70"
                        onClick={() => handleGotoQuizScreen(pdfId)}
                    >
                        Create quiz
                    </button>
                    <button
                        className="bg-pink-400 text-white mt-6 py-3 px-4 w-80 h-12 rounded-xl
                                    hover:bg-opacity-90 hover:bg-pink-500 
                                    active:bg-pink-500 active:bg-opacity-70"
                    >
                        Chat with pdf
                    </button>

                    <div className="mt-24">
                        <p className="text-pink-500 font-bold">Lịch sử làm quiz</p>
                    </div>
                </div>
            ) : (
                <QuizScreen pdfId={pdfId}/>
            )}
        </div>
    );
};

export default OperateScreen;
