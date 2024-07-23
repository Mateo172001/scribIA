import axios from "axios";

export const getTextSummary = async (text: string, tone: string, length: string, language: string) => {
    let data = {
        textLength: length,
        textTone: tone,
        text: text,
        language: language
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_SUMMARIZE_TEXT_CLOUD_FUNCTION_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            return response.data.candidates[0].content.parts[0].text;
        })
        .catch((error) => {
            throw error;
        });
};
