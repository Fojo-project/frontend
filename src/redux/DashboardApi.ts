/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi,  } from '@reduxjs/toolkit/query/react';



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
  baseQuery:axiosBaseQuery(),
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
