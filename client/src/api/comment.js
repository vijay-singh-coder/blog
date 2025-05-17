import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

// API endpoint (appended to baseURL)
const BLOG_ENDPOINT = "/api/v1/comment";

export const postComment = async (blogId, content) => {
    const response = await axiosInstance.post(`${BLOG_ENDPOINT}/blogs/${blogId}/comments`, {
        content,
    });
    return response.data;
};