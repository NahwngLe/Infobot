import axiosClient from "./axiosClient"

class PdfApi {
    getTextFromPdf = (file) => {
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
        
    }
}

const pdfApi = new PdfApi();
export default pdfApi