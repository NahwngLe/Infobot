import React, { useEffect, useRef, useState } from 'react';
import pdfApi from '../../services/pdfApi';
import BaseScreen from './BaseScreen';

const ChatbotScreen = ({ file, setFile, fileInputRef, user, pdfId, setPdfId }) => {
    const [isLoading, setIsLoading] = useState(false); // State loading
    const [context, setContext] = useState("")
    console.log("🚀 ~ ChatbotScreen ~ context:", context)

    const handleUploadFile = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!file) return;
        const fetchPdfText = async () => {
            setIsLoading(true); // Bắt đầu loading

            try {
                const response = await pdfApi.upload(file);
                console.log(response);
                setPdfId(response.pdf_id); // Lưu pdf_id vào state
                setContext(response.content)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            } finally {
                setTimeout(() => setIsLoading(false), 500); // Dừng loading dù thành công hay lỗi
            }
        };

        file && fetchPdfText();
    }, [file]);



    return (
        <>
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white py-8 px-28 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="animate-spin h-20 w-20 border-4 border-pink-500 border-t-transparent rounded-full"></div>
                        <p className="mt-10 text-gray-700 text-4xl">Đang tải lên PDF</p>
                        <button
                            className="mt-10 mb-auto px-8 py-4 bg-red-500 text-white rounded-lg"
                            onClick={() => setIsLoading(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : pdfId ? (
                <div className='h-screen w-[80vw] bg-black'>
                    <div className='h-screen w-[37vw]'>
                        <iframe
                            key={pdfId}
                            src={`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`}
                            width="100%"
                            height="100%"
                            title="PDF Viewer"
                            allow="fullscreen"
                        />
                    </div>
                </div>
            ) : (
                <BaseScreen pdfId={pdfId} setFile={setFile} fileInputRef={fileInputRef} handleUploadFile={handleUploadFile} />
            )}
        </>
    );

};

export default ChatbotScreen;
