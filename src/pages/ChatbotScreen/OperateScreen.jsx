import React from 'react'

const OperateScreen = ({pdfId}) => {
    return (
        <div className='pdf-screen h-screen w-[80vw] flex'>
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

            <div className='asking-screen flex flex-col items-center flex-1 bg-black' >
                <button 
                className='bg-pink-400 text-white mt-20 py-3 px-4 w-80 h-12 rounded-xl
                            hover:bg-opacity-90 hover:bg-pink-500
                            active:bg-pink-500 active:bg-opacity-70
                '
                >
                    Create quiz
                </button>
                <button 
                className='bg-pink-400 text-white mt-6 py-3 px-4 w-80 h-12 rounded-xl
                            hover:bg-opacity-90 hover:bg-pink-500
                            active:bg-pink-500 active:bg-opacity-70
                '
                >
                    Chat with pdf
                </button>

                <div className='mt-24'>
                    <p className='text-white font-bold' >Lịch sử làm quiz</p>
                </div>
            </div>

        </div>
    )
}

export default OperateScreen