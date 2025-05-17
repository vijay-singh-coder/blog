import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

// API endpoint (appended to baseURL)
const BLOG_ENDPOINT = "/api/v1/blog";

// CREATE blog
export const createBlog = async (blogData) => {
  const response = await axiosInstance.post("/api/v1/blog", blogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// READ all blogs
export const fetchBlogs = async () => {
    const response = await axiosInstance.get(BLOG_ENDPOINT);
    return response.data.blogs;
};

export const fetchMyBlogs = async () => {
    const response = await axiosInstance.get(`${BLOG_ENDPOINT}/my-blogs`);
    return response.data.blogs;
}

// READ single blog by ID
export const fetchBlogById = async (id) => {
    const response = await axiosInstance.get(`${BLOG_ENDPOINT}/${id}`);
    return response.data;
};

// UPDATE blog by ID
export const updateBlog = async (id, updatedData) => {
  const response = await axiosInstance.put(`/api/v1/blog/${id}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// DELETE blog by ID
export const deleteBlog = async (id) => {
    const response = await axiosInstance.delete(`${BLOG_ENDPOINT}/${id}`);
    return response.data;
};



