import axios from "axios";
import { signup_baseurl } from "./constants";

export const ApiInstance = axios.create({
  baseURL: signup_baseurl,
});

const instance = axios.create({
  baseURL: signup_baseurl,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const SecureAPIInstance = instance;


