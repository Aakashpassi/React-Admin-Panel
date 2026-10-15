import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";
import { ROUTES } from "../constants/routes";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Request interceptor
|--------------------------------------------------------------------------
*/
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| Response interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    store.dispatch(logout());
    // Handle unauthorized error (e.g., redirect to login page)
    window.location.href = ROUTES.LOGIN; // Replace with your login route
  }
  if (error.response && error.response.status === 403) {
    // Handle forbidden error (e.g., redirect to unauthorized page)
    console.error(
      "You do not have permission for this action."
    );
  }
  return Promise.reject(error);
})