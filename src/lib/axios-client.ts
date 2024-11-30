import axios from "axios";

const BACKEND_URL = "https://674af0e071933a4e8853e37a.mockapi.io/api";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
});

export { axiosClient };
