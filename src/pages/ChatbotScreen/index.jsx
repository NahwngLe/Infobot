import React, { useEffect, useRef, useState } from 'react';
import UploadFile from './UploadFile';
import pdfApi from '../../services/pdfApi';

const ChatbotScreen = ({ file, setFile }) => {
    const fileInputRef = useRef(null);
    const [pdfId, setPdfId] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State loading
    const [context, setContext] = useState("")
    console.log("🚀 ~ ChatbotScreen ~ context:", context)

    const handleUploadFile = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const fetchPdfText = async () => {
            setIsLoading(true); // Bắt đầu loading
            
            try {
                const response = await pdfApi.getTextFromPdf(file);
                console.log(response);
                setPdfId(response.pdf_id); // Lưu pdf_id vào state
                setContext(response.content)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            } finally {
                setTimeout(() => setIsLoading(false), 500);; // Dừng loading dù thành công hay lỗi
            }
        };

        file && fetchPdfText();
    }, [file]);

    return (
        <>
            {file ? (
                <div>
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
                    ) : (
                        pdfId && (
                            <div className='h-screen w-[37vw]'>
                                <iframe
                                    src={`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`}
                                    width="100%"
                                    height="100%"
                                    title="PDF Viewer"
                                    allow="fullscreen"
                                />
                                {/* <p
                                className='text-black text-xl'
                                >
                                    {context}
                                </p> */}
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div className="title flex justify-center text-black w-[80%]">
                    <div className="talkto mt-24 inline-block">
                        <h1 className="text-5xl font-bold">Trò chuyện với</h1>
                    </div>
                    <div className="pdfText inline-block rounded-xl rotate-3 mt-[7%]">
                        <h1 className="text-5xl font-bold p-3 bg-purple-500 text-white rounded-xl">
                            PDF
                        </h1>
                    </div>
                    <UploadFile setFile={setFile} fileInputRef={fileInputRef} handleUploadFile={handleUploadFile} />
                </div>
            )}
        </>
    );
};

export default ChatbotScreen;
