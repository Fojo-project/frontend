import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface AdminUser {
    id: number;
    full_name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    deleted_at: string | null;
    roles: string[];
}

interface AdminUsersResponse {
    success: boolean;
    message: string;
    data: AdminUser[];
    meta: PaginationMeta;
}

interface AdminUserResponse {
    success: boolean;
    message: string;
    data: AdminUser;
}

export interface AdminUsersQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    role?: string;
    verified?: boolean;
    from?: string;
    to?: string;
    sort_by?: 'full_name' | 'email' | 'created_at';
    sort_dir?: 'asc' | 'desc';
}

// ─── API Slice ────────────────────────────────────────────────────────────────

export const AdminUserApi = createApi({
    reducerPath: 'adminUserApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['AdminUsers', 'AdminUser'],
    endpoints: (builder) => ({

        // GET /api/admin/users
        getAdminUsers: builder.query<AdminUsersResponse, AdminUsersQueryParams | void>({
            query: (params = {}) => {
                const safeParams = params ?? {}
                const cleanedParams = Object.fromEntries(
                    Object.entries(safeParams).filter(([, v]) => v !== undefined && v !== '')
                );
                const queryString = new URLSearchParams(
                    cleanedParams as Record<string, string>
                ).toString();

                return {
                    url: `/api/admin/users${queryString ? `?${queryString}` : ''}`,
                    method: 'GET',
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'AdminUser' as const, id })),
                        { type: 'AdminUsers', id: 'LIST' },
                    ]
                    : [{ type: 'AdminUsers', id: 'LIST' }],
        }),
    }),
});

export const { useGetAdminUsersQuery } = AdminUserApi;