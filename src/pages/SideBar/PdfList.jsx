import React, { useEffect, useState } from 'react'
import pdfApi from '../../services/pdfApi'
import { useNavigate } from 'react-router-dom';

const PdfList = ({ user }) => {
  const [listPdf, setListPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    navigate(`/operate/${id}`);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
      ) : !user ? (
        <p className="text-blue-100 text-center">Sign in to save and view history</p>
      ) : (
        <div className="flex flex-col space-y-2">
          {listPdf.map(pdf => (
            <div
              key={pdf.pdf_id}
              className="text-blue-100 bg-transparent p-2 rounded-md cursor-pointer w-full 
                        hover:bg-opacity-80 hover:text-pink-200
                        active:bg-blue-900 active:text-white transition duration-200 ease-in-out border border-blue-600"
              onClick={() => handleClick(pdf.pdf_id)}
            >
              {pdf.pdf_name.length > 25 ? pdf.pdf_name.slice(0, 25) + "..." : pdf.pdf_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfList;
