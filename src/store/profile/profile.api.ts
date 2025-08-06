import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
  };
}

interface Dashboard {
  ongoing_course: number;
  completed_course: number;
  hours_spent: number;
  current_ongoing_course: {
    title: string;
  };
  certificate: number;
}

interface MeResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    provider?: string;
    avatar?: string;
    dashboard: Dashboard;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
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
    provider?: string;
    avatar?: string;
  };
}
interface ResetAccountPasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export const ProfileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: '/api/me',
        method: 'GET',
      }),
    }),
    updateUserProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: '/api/profile/update',
        method: 'PUT',
        data,
      }),
    }),
    deleteAccount: builder.mutation<
      any,
      { reason: string; deletePassword?: string }
    >({
      query: (data) => ({
        url: 'api/profile',
        method: 'DELETE',
        data,
      }),
    }),
    resetAccountPassword: builder.mutation<
      AuthResponse,
      ResetAccountPasswordPayload
    >({
      query: (data) => ({
        url: 'api/profile/password',
        method: 'PUT',
        data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateUserProfileMutation,
  useDeleteAccountMutation,
  useResetAccountPasswordMutation,
} = ProfileApi;
