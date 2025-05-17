import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  // Don't set Content-Type globally here
});

// Register user with multipart/form-data headers set per request
export const registerUser = async (userData) => {
  const formData = new FormData();
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("profilePicture", userData.profilePicture); // should be a File or Blob

  const response = await axiosInstance.post("/api/v1/user/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Login user with JSON content type
export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/api/v1/user/login", loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Fetch dashboard user data
export const fetchDashboard = async () => {
  const { data } = await axiosInstance.get("/api/v1/user/dashboard", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.responseData;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.get("/api/v1/user/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.responseData;
};
