import axios from "axios";

const axiosCustom = axios.create({
  baseURL: "https://pacific-depths-48667.herokuapp.com/",
});

axiosCustom.defaults.headers.post["Content-Type"] = "application/json";
axiosCustom.defaults.headers.post["Accept"] = "application/json";

axiosCustom.defaults.withCredentials = true;

axiosCustom.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default axiosCustom;
