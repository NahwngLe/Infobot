import React, { useEffect, useRef, useState } from 'react';
import UploadFile from './UploadFile';
import pdfApi from '../../services/pdfApi';

const ChatbotScreen = ({ file, setFile }) => {
    const fileInputRef = useRef(null);
    const [pdfId, setPdfId] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State loading

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
            } catch (error) {
                console.log('Failed to fetch: ', error);
            } finally {
                setIsLoading(false); // Dừng loading dù thành công hay lỗi
            }
        };

        file && fetchPdfText();
    }, [file]);

    return (
        <>
            {file ? (
                <div>
                    {isLoading ? (
                        <div className="text-center text-blue-500 text-xl font-bold mt-4">Đang xử lý file...</div>
                    ) : (
                        pdfId && (
                            <iframe
                                src={`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`}
                                width="100%"
                                height="100%"
                                title="PDF Viewer"
                            />
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
