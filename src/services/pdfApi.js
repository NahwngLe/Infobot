import axiosClient from "./axiosClient"
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
class PdfApi {
    upload = async (file) => {
        const url = "/pdf/upload"

        const formData = new FormData()
        formData.append('file', file)
        console.log("formData", formData)
        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    getPdf = async (pdfId) => {
        const user = localStorage.getItem('user');

        if (user) {
            const userData = JSON.parse(user);

            const response = await axios.get(`${BASE_URL}/pdf/get-pdf/${pdfId}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            return response.data;
        }
        else {
            return null;
        }



    }

    getPdfList = async () => {
        const url = `/pdf/get-all-pdf`;
        return axiosClient.get(url);
    }

    createQuizFromId = async (id, language = 'eng') => {
        const url = `/pdf/create-quiz/${id}?language_of_quiz=${language}`
        return axiosClient.get(url)
    }

    getQuiz = async (id) => {
        const url = `/pdf/get-quiz/${id}`

        return axiosClient.get(url);
    }
}

const pdfApi = new PdfApi();
export default pdfApi