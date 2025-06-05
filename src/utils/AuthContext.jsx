import React, { createContext, useState, useContext, useEffect } from 'react';
import authApi from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            const user = authApi.getCurrentUser();
            if (user) {
                setUser(user);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const userData = await authApi.login(username, password);
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (username, password) => {
        try {
            const response = await authApi.register(username, password);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authApi.logout();
        setUser(null);
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 