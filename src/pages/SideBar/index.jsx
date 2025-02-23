import React, { useRef, useState } from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import LoginBox from './LoginBox';

const SideBar = ({setFile}) => {
    
    const fileInputRef = useRef(null)
    
    const handleUploadFile = () => {
        fileInputRef.current.click();
      }

    const onChangeInput = (event) => {
        setFile(event.target.files[0])
    }

    return (
        <div className="h-screen w-[20vw] flex flex-col bg-gray-900 text-white ">
            <div className="title flex">
                <FaCircleInfo className='w-7 h-7 ml-4 mt-4' />
                <h1
                    className='text-2xl ml-2 mt-3'
                >
                    Infobot
                </h1>
            </div>
            <div className="button-create w-full mt-6 flex justify-center">
                <button
                    className='px-4 py-2 border w-[90%] flex justify-center items-center border-white rounded-xl
                    hover:bg-white hover:bg-opacity-25
                    '
                    onClick={handleUploadFile}
                >
                    <FiPlus className='w-5 h-5 mr-2 ' />
                    <p>Tạo cuộc trò chuyện mới</p>
                    <input type="file" hidden ref={fileInputRef} onChange={onChangeInput} />
                </button>
            </div>
            <div className="button-folder w-full mt-4 flex justify-center">
                <button
                    className='px-4 py-2 border w-[90%] flex justify-center items-center border-white rounded-xl
                    hover:bg-white hover:bg-opacity-25
                    '
                >
                    <MdOutlineCreateNewFolder className='w-5 h-5 mr-2' />
                    <p>Tạo thư mục mới</p>
                </button>
            </div>
            <div className="history-container self-center mt-6 w-[90%]">
                <LoginBox />
            </div>
        </div>
    )
}

export default SideBar
