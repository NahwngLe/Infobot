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

  return (
    <div className="asking-screen flex flex-col h-screen justify-between bg-white border-2 border-black p-8 text-gray-800">
      
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-pink-500">📄 PDF Actions</h1>
        <p className="text-gray-600 mt-1">Hãy chọn một hành động để bắt đầu</p>
      </header>

      {/* Main Actions */}
      <main className="flex flex-col gap-6 items-center justify-center flex-1">
        <button
          onClick={handleGotoQuizScreen}
          className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-semibold text-lg px-6 py-4 w-72 rounded-xl shadow-md transition duration-200"
        >
          📘 Tạo quiz từ tài liệu
        </button>

        <button
          onClick={handleGotoChat}
          className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-semibold text-lg px-6 py-4 w-72 rounded-xl shadow-md transition duration-200"
        >
          💬 Trò chuyện với tài liệu
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center">
        <p className="text-pink-500 font-medium text-md">🕘 Lịch sử làm quiz sẽ được hiển thị tại đây</p>
      </footer>
    </div>
  );
};

export default OperateActions;
