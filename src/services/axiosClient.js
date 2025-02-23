import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        'content-type' : 'application/json'
    },
    timeout: 120000,
})

axiosClient.interceptors.request.use(async (config) => {
    //Add theem token vao
    return config
})


axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }

    return response
}, (error) => {
    throw error
} )

export default axiosClient