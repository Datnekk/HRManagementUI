import axios, { AxiosInstance } from "axios";

const URL_API = process.env.URL_API;
console.log(URL_API);
export const serviceClient: AxiosInstance = axios.create({
  baseURL: URL_API,
  timeout: 5000,
  withCredentials: true,
});
