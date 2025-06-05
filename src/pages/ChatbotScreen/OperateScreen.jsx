import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf'
import pdfApi from '../../services/pdfApi'
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
pdfjs.GlobalWorkerOptions.standardFontDataUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`

const OperateScreen = () => {
    const [pdfUrl, setPdfUrl] = useState(null)
    const [numPages, setNumPages] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { pdfId } = useParams();
    console.log("OperateScreen");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        fetchPdfUrl()
    }, [pdfId])

    const fetchPdfUrl = async () => {
        try {
            const response = await pdfApi.getPdf(pdfId)
            if (!response) {
                throw new Error('Không thể tải PDF')
            }
            const url = URL.createObjectURL(response)
            setPdfUrl(url)
        } catch (err) {
            console.error("Lỗi tải PDF", err)
            setError("Lỗi tải PDF")
        }
    }

    return (
        <div className="pdf-screen h-screen w-[82vw] flex">
            {/* PDF Viewer (react-pdf) */}
            <div className="h-screen w-[37vw] overflow-y-auto border-r border-gray-300">
                {pdfUrl ? (
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        onLoadError={(error) => console.error("Lỗi load PDF", error)}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={550} />
                        ))}
                    </Document>
                ) : (
                    <p>Đang tải PDF...</p>
                )}
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
