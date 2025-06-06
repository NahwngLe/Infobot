import React, { useRef, useState } from 'react';
import PdfList from './PdfList';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utils/AuthContext';

const SideBar = ({ setFile, fileInputRef, setPdfId }) => {
    const [pdflist, setPdflist] = useState([]);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleUploadFile = () => {
        fileInputRef.current.click();
    };

    const onChangeInput = (event) => {
        setFile(event.target.files[0]);
    };

    const navigateToHome = () => {
        navigate(`/`);
    };

    const handleAuthAction = () => {
        if (user) {
            logout();
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="h-screen w-[280px] flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white border-r border-gray-800 shadow-lg">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h1
                        className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
                        onClick={navigateToHome}
                    >
                        Infobot
                    </h1>
                </div>

                {user && (
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-500 rounded-md py-2 text-white font-medium"
                        onClick={handleUploadFile}
                    >
                        New Conversation
                        <input type="file" hidden ref={fileInputRef} onChange={onChangeInput} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-2">
                {user ? (
                    <>
                        <div className="space-y-2">
                            <button className="w-full text-left text-gray-300 hover:bg-gray-700 p-2 rounded-md transition-colors">
                                Dashboard
                            </button>
                            <button className="w-full text-left text-gray-300 hover:bg-gray-700 p-2 rounded-md transition-colors">
                                Documents
                            </button>
                            <button className="w-full text-left text-gray-300 hover:bg-gray-700 p-2 rounded-md transition-colors">
                                History
                            </button>
                        </div>

                        {/* Recent Documents */}
                        <div className="mt-8">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Recent Documents
                            </h2>
                            <div className="space-y-2">
                                <PdfList user={user.username} setPdfId={setPdfId} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-gray-400 mb-4">Sign in to start using Infobot</p>
                        <button
                            onClick={handleAuthAction}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Sign In
                        </button>
                    </div>
                )}
            </nav>

            {/* User Profile */}
            {user && (
                <div className="p-4 border-t border-gray-700 bg-gray-900">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg">
                                <span className="text-white font-semibold tracking-wider select-none">
                                    {user.username ? user.username.charAt(0).toUpperCase() : "…"}
                                </span>
                            </div>
                            <div>
                                <p className="text-white font-semibold tracking-wide">{user.username || "Loading..."}</p>
                                <p className="text-xs text-indigo-400 uppercase font-medium">Free Plan</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAuthAction}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-md text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            aria-label="Sign Out"
                            title="Sign Out"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SideBar;
