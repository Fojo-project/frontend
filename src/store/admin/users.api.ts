import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface AdminUser {
    id: number;
    full_name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    deleted_at: string | null;
    roles: string[];
}

export interface AdminUsersResponse {
    success: boolean;
    message: string;
    data: AdminUser[];
    meta: PaginationMeta;
}

export interface AdminUserResponse {
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

// ─── Query String Builder ─────────────────────────────────────────────────────

const buildQueryString = (params?: AdminUsersQueryParams): string => {
    if (!params) return '';
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        if (Array.isArray(value)) {
            value.forEach((v) => query.append(key, String(v)));
        } else {
            query.append(key, String(value));
        }
    });
    const qs = query.toString();
    return qs ? `?${qs}` : '';
};

// ─── API ──────────────────────────────────────────────────────────────────────

export const AdminUserApi = createApi({
    reducerPath: 'adminUserApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['AdminUsers', 'AdminUser'],
    endpoints: (builder) => ({

        getAdminUsers: builder.query<AdminUsersResponse, AdminUsersQueryParams>({
            query: (params) => ({
                url: `/api/admin/users${buildQueryString(params)}`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'AdminUser' as const, id })),
                        { type: 'AdminUsers', id: 'LIST' },
                    ]
                    : [{ type: 'AdminUsers', id: 'LIST' }],
        }),

        assignRole: builder.mutation<void, { userId: number; role: string }>({
            query: ({ userId, role }) => ({
                url: `/api/admin/users/${userId}/roles`,
                method: 'POST',
                data: { role },
            }),
            invalidatesTags: (_, __, { userId }) => [
                { type: 'AdminUser', id: userId },
                { type: 'AdminUsers', id: 'LIST' },
            ],
        }),

        unassignRole: builder.mutation<void, { userId: number; role: string }>({
            query: ({ userId, role }) => ({
                url: `/api/admin/users/${userId}/roles/${role}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, { userId }) => [
                { type: 'AdminUser', id: userId },
                { type: 'AdminUsers', id: 'LIST' },
            ],
        }),

    }),
});

export const {
    useGetAdminUsersQuery,
    useAssignRoleMutation,
    useUnassignRoleMutation,
} = AdminUserApi;