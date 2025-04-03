import React from 'react'
import UploadFile from './UploadFile'

const BaseScreen = ({setFile, fileInputRef, handleUploadFile}) => {
    return (
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
    )
}

export default BaseScreen