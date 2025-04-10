import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const OperateActions = () => {
    const navigate = useNavigate();
    const { pdfId } = useParams();

    const handleGotoQuizScreen = () => {
        navigate(`/operate/${pdfId}/quiz`);
    };

    const handleGotoChat = () => {
        navigate(`/chat/${pdfId}`);
    };
    console.log("OperateActions");
    
    return (
        <div className="asking-screen flex flex-col h-screen items-center flex-1 bg-transparent border-2 border-black">
            <button
                className="bg-pink-400 text-white mt-20 py-3 px-4 w-80 h-12 rounded-xl
                   hover:bg-opacity-90 hover:bg-pink-500 
                   active:bg-pink-500 active:bg-opacity-70"
                onClick={handleGotoQuizScreen}
            >
                Create quiz
            </button>

            <button
                className="bg-pink-400 text-white mt-6 py-3 px-4 w-80 h-12 rounded-xl
                   hover:bg-opacity-90 hover:bg-pink-500 
                   active:bg-pink-500 active:bg-opacity-70"
                onClick={handleGotoChat}
            >
                Chat with PDF
            </button>

            <div className="mt-24">
                <p className="text-pink-500 font-bold">Lịch sử làm quiz</p>
            </div>
        </div>
    );
};


export default OperateActions;
