import React, { useEffect, useState } from "react";
import pdfApi from "../../services/pdfApi";

const OperateScreen = ({ pdfId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [quiz, setQuiz] = useState(null)
    const [isCreatingQuiz, setIsCreatingQuiz] = useState(false)
    const [quizId, setQuizId] = useState(null)
    const [isQuiz, setIsQuiz] = useState(false)
    const [isChat, setIsChat] = useState(false)
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    console.log("Quiz content: ", quiz);
    
    useEffect(() => {
        const handleCheckId = async () => {
            try {
                const response = await pdfApi.getQuiz(pdfId)
                console.log("Check quiz");

                if (response.length > 0) {
                    console.log("exists quiz");
                    
                    setMessage(response.message);
                    setError(""); 
                    setQuiz(response)
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError(err.response.data.detail); 
                    setMessage("");
                } else {
                    setError("Something went wrong. Please try again.");
                    setMessage(""); 
                }
            }
        };

        pdfId && handleCheckId()
    }, [])

    const handleCreateQuiz = async (id) => {
        setIsCreatingQuiz(true)
        try {
            const response = await pdfApi.createQuizFromId(id)
            console.log(response);
            setQuizId(response.pdf_id)
        }
        catch (error) {
            console.log('Failed to create quiz: ', error);
        }
        finally {
            setTimeout(() => setIsCreatingQuiz(false), 1000);
        }
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
            ) : isCreatingQuiz ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white py-8 px-28 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="animate-spin h-20 w-20 border-4 border-pink-500 border-t-transparent rounded-full"></div>
                        <p className="mt-10 text-gray-700 text-4xl">Đang tạo quiz</p>
                        <button
                            className="mt-10 mb-auto px-8 py-4 bg-red-500 text-white rounded-lg"
                            onClick={() => setIsCreatingQuiz(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <div className="asking-screen flex flex-col items-center flex-1 bg-transparent border-2 border-black">
                    <button
                        className="bg-pink-400 text-white mt-20 py-3 px-4 w-80 h-12 rounded-xl
                                    hover:bg-opacity-90 hover:bg-pink-500 
                                    active:bg-pink-500 active:bg-opacity-70"
                        onClick={() => handleCreateQuiz(pdfId)}
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
            )}
        </div>
    );
};

export default OperateScreen;
