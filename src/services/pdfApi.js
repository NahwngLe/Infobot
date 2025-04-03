import axiosClient from "./axiosClient"

class PdfApi {
    upload = (file) => {
        const url = "/pdf/upload"

        const formData = new FormData()
        formData.append('file', file)

        return axiosClient.post(url, formData, {
            headers : {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    getPdfList = (user) => {
        const url = `/pdf/get-all-pdf/${user}`;
        return axiosClient.get(url);
    }

    createQuizFromId = (id) => {
        const url = `/pdf/create-quiz/${id}`

        return axiosClient.get(url);
    }

    getQuiz = (id) => {
        const url = `/pdf/get-quiz/${id}`

        return axiosClient.get(url);
    }
}

const pdfApi = new PdfApi();
export default pdfApi