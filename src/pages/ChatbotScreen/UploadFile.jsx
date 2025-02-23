import React from 'react'
import { FaFileUpload } from "react-icons/fa";

const UploadFile = ({setFile, fileInputRef, handleUploadFile}) => {

    const onChangeInput = (event) => {
        setFile(event.target.files[0])
    }

    return (
        <div className="upload-container flex items-center justify-center absolute top-[30%] right-[7%] w-[60%] h-[60%] 
                shadow-2xl shadow-purple-400/50 bg-white
                rounded-xl">
            <div className="border flex items-center justify-center flex-col
                         border-purple-300 border-dashed bg-gray-50
                         p-6 w-[90%] h-[83%] rounded-lg
                         hover:bg-purple-200 hover:bg-opacity-30
                         "
                onClick={handleUploadFile}
            >
                <input type="file" hidden ref={fileInputRef} onChange={onChangeInput} />

                <FaFileUpload 
                className='w-20 h-20 shadow-none text-purple-500 bg-transparent ' 
                />
                <h1 className="text-2xl font-semibold text-black mb-12 mt-6">
                    Nhấp để tải lên PDF
                </h1>

                <div className="button-upload ">
                    <button className="px-20 py-3 bg-purple-500 text-white text-lg rounded-lg
                     hover:bg-purple-600 transition
                     
                     ">
                        Tải PDF lên
                    </button>
                </div>
            </div>
        </div>

    )
}

export default UploadFile