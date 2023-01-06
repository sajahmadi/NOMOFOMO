import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add a request interceptor and set the token in the header
instance.defaults.headers.common["Authorization"] =
  localStorage.getItem("__NOMOFOMO_TOKEN") || "";
instance.defaults.headers.post["Content-Type"] = "application/json";

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("__NOMOFOMO_TOKEN");
//     config.headers.Authorization = token;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
