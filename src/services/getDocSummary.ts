import axios from "axios";
import { convertToBase64 } from "../utils/convertFileToBase64";

export const getDocSummary = async (doc: File, tone: string, length: string, language: string) => {
    let fileData = await convertToBase64(doc);
    let data = {
        textLength: length,
        textTone: tone,
        docType: fileData.type,
        docName: fileData.name,
        docContent: fileData.content,
        language: language
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_SUMMARIZE_DOC_CLOUD_FUNCTION_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,
        withCredentials: false
    };

    return axios.request(config).then((response) => {
        return response.data.candidates[0].content.parts[0].text;
    }).catch((error) => {
        throw error;
    });
};