import axios from "axios";
import { refreshAccessToken } from "@/store/slicers/authSlicer";
import store from "@/store";

export const innovaApi = axios.create({
  baseURL: "https://api.innova-energy.com.br/",
  withCredentials: true,
});

innovaApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshAccessToken()).unwrap();

        return innovaApi(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
