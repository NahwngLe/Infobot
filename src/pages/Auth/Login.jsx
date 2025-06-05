import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { FaUser, FaLock, FaRobot } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to login');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
                <div className="flex flex-col items-center">
                    <FaRobot className="w-16 h-16 text-blue-400 mb-4" />
                    <h2 className="text-3xl font-bold text-white">Sign in to Infobot</h2>
                    <p className="text-sm text-gray-400 mt-2">
                        Or{' '}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300 underline">
                            create a new account
                        </Link>
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            required
                            autoComplete="username"
                            className="w-full pl-10 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full pl-10 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <a href="#" className="hover:underline text-blue-400 hover:text-blue-300">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors duration-200 text-white font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
