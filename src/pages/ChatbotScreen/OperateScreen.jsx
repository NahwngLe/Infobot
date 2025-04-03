import React from 'react'

const OperateScreen = () => {
    return (
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
    )
}

export default OperateScreen