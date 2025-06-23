import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

// Example types — adjust based on your backend response shape
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  companyName: string;
  contact: string;
  email: string;
  companySize: string;
  businessProfession: string;
  requestDemo: boolean;
  password: string;
}

interface OtpPayload {
  email: string;
  otp: string;
}

interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgetPasswordPayload {
  email: string;
}

// Example response type (adjust as needed)
interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/customauth/login',
        method: 'POST',
        body,
      }),
    }),
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: '/customauth/register',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, OtpPayload>({
      query: (body) => ({
        url: '/customauth/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    resendOtp: builder.mutation<AuthResponse, { email: string }>({
      query: (body) => ({
        url: '/customauth/resend-otp',
        method: 'POST',
        body,
      }),
    }),
    forgetPassword: builder.mutation<AuthResponse, ForgetPasswordPayload>({
      query: (body) => ({
        url: '/customauth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordPayload>({
      query: (body) => ({
        url: '/customauth/reset-password', // fixed the wrong URL here
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
} = AuthApi;
