import React, { useState } from 'react'
import { FaFileUpload, FaFileAlt } from "react-icons/fa";

const UploadFile = ({ setFile, fileInputRef, handleUploadFile }) => {
    const [isDragging, setIsDragging] = useState(false);

    const onChangeInput = (event) => {
        setFile(event.target.files[0])
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            setFile(files[0]);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                className={`
                    relative rounded-xl border-2 border-dashed p-8
                    flex flex-col items-center justify-center
                    transition-all duration-200 ease-in-out
                    ${isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-blue-500 hover:bg-gray-800'
                    }
                `}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadFile}
            >
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={onChangeInput}
                    accept=".pdf"
                />

                <div className="p-6 rounded-full bg-blue-500/10 mb-4">
                    <FaFileUpload className="w-12 h-12 text-blue-500" />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                    Upload your PDF
                </h2>

                <p className="text-gray-400 text-center mb-6">
                    Drag and drop your file here, or click to select
                </p>

                <button className="btn-primary flex items-center space-x-2">
                    <FaFileAlt className="w-4 h-4" />
                    <span>Select PDF</span>
                </button>

                <p className="mt-4 text-sm text-gray-500">
                    Supported format: PDF up to 50MB
                </p>
            </div>
        </div>
    )
}

export default UploadFile