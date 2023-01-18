import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://joniedev-social-app.onrender.com/api",
});
