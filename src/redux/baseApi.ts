import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import API_BASE_URL from '@/lib/Api';
import Cookies from 'js-cookie';

interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }
  
  export const axiosBaseQuery = (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
    async ({ url, method, data, params }) => {
      try {
        const token = Cookies.get('access_token');
  
        const result = await axios({
          baseURL: API_BASE_URL,
          url,
          method,
          data,
          params,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
  
        return { data: result.data };
      } catch (error) {
        const err = error as AxiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };