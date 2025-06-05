import React, { useEffect, useRef, useState } from 'react';
import pdfApi from '../../services/pdfApi';
import BaseScreen from './BaseScreen';
import OperateScreen from './OperateScreen';
import { FaSpinner, FaFileUpload, FaCheckCircle } from 'react-icons/fa';

const ChatbotScreen = ({ file, setFile, fileInputRef, user, pdfId, setPdfId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [context, setContext] = useState("");
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, success, error

    const handleUploadFile = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!file) return;

        const fetchPdfText = async () => {
            setIsLoading(true);
            setUploadStatus('uploading');
            setUploadProgress(0);

            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 15;
                });
            }, 500);

            try {
                const response = await pdfApi.upload(file);
                console.log(response);
                setPdfId(response.pdf_id);
                setContext(response.content);
                setUploadStatus('success');
                setUploadProgress(100);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.log('Failed to fetch: ', error);
                setUploadStatus('error');
            } finally {
                clearInterval(progressInterval);
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        file && fetchPdfText();
    }, [file]);

    const renderLoadingContent = () => {
        const statusMessages = {
            uploading: 'Uploading your PDF...',
            processing: 'Processing document...',
            success: 'Upload complete!',
            error: 'Upload failed. Please try again.'
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
                    <div className="flex flex-col items-center">
                        {uploadStatus === 'success' ? (
                            <FaCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        ) : uploadStatus === 'error' ? (
                            <div className="text-red-500 text-6xl mb-4">×</div>
                        ) : (
                            <FaSpinner className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                        )}

                        <h3 className="text-xl font-semibold text-white mb-4">
                            {statusMessages[uploadStatus]}
                        </h3>

                        {uploadStatus !== 'success' && uploadStatus !== 'error' && (
                            <>
                                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                <p className="text-gray-400 text-sm">
                                    This may take a while for large files
                                </p>
                            </>
                        )}

                        {uploadStatus === 'error' && (
                            <button
                                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                onClick={() => setIsLoading(false)}
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {isLoading ? renderLoadingContent() :
                pdfId ? <OperateScreen pdfId={pdfId} /> :
                    <BaseScreen setFile={setFile} fileInputRef={fileInputRef} handleUploadFile={handleUploadFile} />
            }
        </>
    );
};

export default ChatbotScreen;
