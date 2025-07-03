import config from '@/config';
import { token } from '@/utils/helper';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    typeof config.apiBaseUrl === 'string' ? config.apiBaseUrl : undefined,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
