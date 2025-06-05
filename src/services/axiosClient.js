import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        'content-type': 'application/json'
    },
    // timeout: 600000,
})

axiosClient.interceptors.request.use(async (config) => {
    const user = localStorage.getItem('user');

    if (user) {
        const userData = JSON.parse(user);
        console.log('userData', userData)
        if (userData.token) {
            config.headers['Authorization'] = `Bearer ${userData.token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }

    return response
}, (error) => {
    console.log('error', error)
    return Promise.reject(error);
})

export default axiosClient