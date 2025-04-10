import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

const OperateScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { pdfId } = useParams();
    console.log("OperateScreen");
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pdf-screen h-screen w-[80vw] flex">
            {/* Left: PDF Viewer */}
            <div className="h-screen w-[37vw]">
                <iframe
                    key={pdfId}
                    src={`http://127.0.0.1:8000/pdf/get-pdf/${pdfId}`}
                    width="100%"
                    height="100%"
                    title="PDF Viewer"
                />
            </div>

            {/* Right: Action Panel or Nested Routes */}
            <div className="flex-1">
                {isLoading ? (
                    <div className="flex h-full items-center justify-center bg-gray-100">
                        <div className="animate-spin h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};

export default OperateScreen;
