import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getFiles = () => axios.get(`${API_URL}/files`);
export const deleteFile = (filename) => axios.delete(`${API_URL}/files/${filename}`);
