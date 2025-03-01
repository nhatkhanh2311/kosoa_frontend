import Axios from "axios";
import secureStorage from "./secure-storage";

const axios = Axios.create({
  // baseURL: "http://localhost:4000/api"
  baseURL: "https://kosoa.herokuapp.com/api"
});

export default axios;

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${secureStorage.getItem("token")}`;
    return config;
  }
);
