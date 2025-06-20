/* eslint-disable @typescript-eslint/no-explicit-any */
import API_BASE_URL from '@/constant/Api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';


//Example on how to connect the endpoint
interface ShopifyResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface WooCommerceResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    connectShopify: builder.query<ShopifyResponse, void>({
      query: () => ({
        url: '/shopify/auth?shop=stationeries-stores.myshopify.com',
        method: 'GET',
      }),
    }),
    connectWoo: builder.query<WooCommerceResponse, void>({
      query: () => ({
        url: '/shopify/woocommerce/connect',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useConnectShopifyQuery,
  useConnectWooQuery,
} = DashboardApi;
