import React, { useEffect, useState } from 'react'
import pdfApi from '../../services/pdfApi'
import { useNavigate } from 'react-router-dom';

const PdfList = ({ user }) => {
  const [listPdf, setListPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 👈 thêm dòng này

  useEffect(() => {
    const fetchListPdf = async () => {
      setIsLoading(true);
      try {
        const response = await pdfApi.getPdfList(user);
        setListPdf(response);
      } catch (error) {
        console.error("Failed to fetch PDF list:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    if (user) {
      fetchListPdf();
    }
  }, [user]);

  const handleClick = (id) => {
    navigate(`/operate/${id}`); // 👈 chuyển hướng sang trang operate
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="animate-spin w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full mx-auto"></div>
      ) : !user ? (
        <p className="text-white text-center">Cần đăng nhập để lưu lịch sử</p>
      ) : (
        <div className="flex flex-col space-y-2">
          {listPdf.map(pdf => (
            <div 
              key={pdf.pdf_id} 
              className="text-white bg-transparent p-2 rounded-xl text-lg cursor-pointer  
                          hover:bg-gray-600 hover:bg-opacity-50
                          active:bg-gray-600 active:bg-opacity-40"
              onClick={() => handleClick(pdf.pdf_id)}
            >
              {pdf.pdf_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfList
