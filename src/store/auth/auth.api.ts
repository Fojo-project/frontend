import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

// Example types — adjust based on your backend response shape
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
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

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
  };
}

interface SocialLoginPayload {
  token: string;
  provider: 'google' | 'facebook' | 'apple';
}

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: '/api/login',
        method: 'POST',
        data,
      }),
    }),
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/api/register',
        method: 'POST',
        data,
      }),
    }),
    verifyEmail: builder.mutation<AuthResponse, OtpPayload>({
      query: (body) => ({
        url: '/customauth/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    resendVerifyEmail: builder.mutation<AuthResponse, { email: string }>({
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
        url: '/customauth/reset-password',
        method: 'POST',
        body,
      }),
    }),
socialLogin: builder.mutation<AuthResponse, SocialLoginPayload & { full_name: string; email: string }>(
  {
    query: ({ provider, ...body }) => ({
      url: `/api/auth/social/${provider}`,
      method: 'POST',
      data: {
        provider, 
        ...body,
      },
    }),
  }
)



  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useForgetPasswordMutation,
  useSocialLoginMutation,
} = AuthApi;
