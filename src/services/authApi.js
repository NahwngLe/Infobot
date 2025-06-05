import axiosClient from "./axiosClient"

const API_URL = '/auth';

const authApi = {
    login: async (username, password) => {
        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            const tokenData = await axiosClient.post(`${API_URL}/token`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log("tokenData", tokenData)
            if (tokenData.access_token) {
                const userData = await axiosClient.get(`${API_URL}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${tokenData.access_token}`
                    }
                });

                const userInfo = {
                    username: userData.username,
                    user_id: userData.user_id,
                    token: tokenData.access_token
                };

                localStorage.setItem('user', JSON.stringify(userInfo));
                return userInfo;
            }
            else {
                // throw new Error('No token received');
                console.log("tokenData");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;

                if (typeof data.detail === 'string') {
                    throw new Error(data.detail);
                }
                if (Array.isArray(data.detail)) {
                    const messages = data.detail.map(item => item.msg).join(', ');
                    throw new Error(messages);
                }
            }

            throw new Error(error.message || 'An error occurred during login');
        }
    },

    register: async (username, password) => {
        try {
            const response = await axiosClient.post(`${API_URL}/register`, {
                username,
                password
            });

            if (response.isExist) {
                throw new Error(response.message);
            }

            return response;
        } catch (error) {
            if (error.message) {
                throw { detail: error.message };
            }
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        // Clear the token from axiosClient headers
        delete axiosClient.defaults.headers.common['Authorization'];
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // // Setup axios interceptor for adding JWT token to requests
    // setupAxiosInterceptors: (token) => {
    //     axiosClient.interceptors.request.use(
    //         (config) => {
    //             if (token) {
    //                 config.headers['Authorization'] = `Bearer ${token}`;
    //             }
    //             return config;
    //         },
    //         (error) => {
    //             return Promise.reject(error);
    //         }
    //     );
    // }
};

export default authApi; 