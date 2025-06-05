import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { FaLock, FaRobot, FaUser } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(formData);
    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        console.log("handleSubmit");
        e.preventDefault();
        setError('');

        if (!validateForm()) return;
        console.log("validateForm");
        setIsLoading(true);
        try {
            const response = await register(formData.username, formData.password);
            if (response.message === "Create account successfully") {
                navigate('/login');
            }
        } catch (err) {
            setError(err.detail || err.message || 'Failed to create account');
        } finally {
            alert("Create account successfully");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 via-gray-900 to-black px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full bg-gray-800 rounded-3xl shadow-xl p-10 space-y-8">
                <div className="flex flex-col items-center">
                    <FaRobot className="w-16 h-16 text-blue-500 mb-4" />
                    <h2 className="text-3xl font-extrabold text-white">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded-md text-center text-sm font-medium">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Username */}
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            name="username"
                            required
                            autoComplete="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-gray-700 text-white py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            required
                            autoComplete="new-password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-gray-700 text-white py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            autoComplete="new-password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-gray-700 text-white py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className={`w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition`}
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-6 w-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
