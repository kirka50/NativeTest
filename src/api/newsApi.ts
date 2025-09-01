import axios from "axios";

const API_KEY = "011d005bffc141dbb3e4d84f81627507";
const BASE_URL = "https://newsapi.org/v2";

export const newsApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "X-Api-Key": API_KEY,
    },
});

export const getTopHeadlines = async (
    page: number,
    pageSize: number,
    category?: string,
    query?: string
) => {
    const response = await newsApi.get("/top-headlines", {
        params: {
            country: "us",
            page,
            pageSize,
            category,
            q: query,
        },
    });
    return response.data;
};
