import axios from 'axios';
import Cookies from 'js-cookie';
import config from '@/config';
// import { removeTokenCookie } from '@/utils/helper';

const API_BASE_URL =
  typeof config.apiBaseUrl === 'string' ? config.apiBaseUrl : '';
const TOKEN_KEY = 'FOJO_TOKEN';
// const HOME_ROUTE = '/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('unauthorized'));
      // removeTokenCookie();
      // window.location.assign(HOME_ROUTE);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
