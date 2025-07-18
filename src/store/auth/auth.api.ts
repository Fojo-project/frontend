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

interface VerifyEmailPayload {
  email: string;
  token: string;
}

interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
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
  provider: 'google';
}

interface MeResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    full_name: string;
    email: string;
    role: string;
     provider?: string
  };
}
interface UpdateProfileRequest {
  full_name: string;
  email: string;
  
}

interface UpdateProfileResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    full_name: string;
    email: string;
    role: string;
  provider?: string
  };
}
interface ResetAccountPasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
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
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: '/api/me',
        method: 'GET',
      }),
    }),
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/api/register',
        method: 'POST',
        data,
      }),
    }),
    verifyEmail: builder.mutation<AuthResponse, VerifyEmailPayload>({
      query: (data) => ({
        url: '/api/verify-email',
        method: 'POST',
        data,
      }),
    }),
    resendVerifyEmail: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: '/api/verify-email/resend',
        method: 'POST',
        data,
      }),
    }),
    forgetPassword: builder.mutation<AuthResponse, ForgetPasswordPayload>({
      query: (data) => ({
        url: '/api/forgot-password',
        method: 'POST',
        data,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordPayload>({
      query: (data) => ({
        url: '/api/reset-password',
        method: 'POST',
        data,
      }),
    }),
    socialLogin: builder.mutation<
      AuthResponse,
      SocialLoginPayload & { full_name: string; email: string }
    >({
      query: ({ provider, ...body }) => ({
        url: `/api/auth/social/${provider}`,
        method: 'POST',
        data: {
          provider,
          ...body,
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/logout',
        method: 'POST',
      }),
    }),
    
  updateUserProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: '/api/profile/update',
        method: 'PUT',
        data,
      }),
    }),
   deleteAccount: builder.mutation<any, { reason: string; deletePassword?: string }>({
  query: (data) => ({
    url: "api/profile",
    method: "DELETE",
    data,
  }),
}),

    resetAccountPassword: builder.mutation<AuthResponse, ResetAccountPasswordPayload>({
      query: (data) => ({
        url: 'api/profile/password',
        method: 'PUT',
        data,
      }),
       }),
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
  useGetMeQuery,
  useLogoutMutation,
   useUpdateUserProfileMutation,
     useDeleteAccountMutation,
  useResetAccountPasswordMutation,
} = AuthApi;
