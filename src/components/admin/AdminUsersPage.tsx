'use client';

import { useState, useCallback, useMemo } from 'react';
import {
    Search,
    Download,
    Filter,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    XCircle,
    X,
    AlertCircle,
    Loader2,
    Users,
    ShieldCheck,
    GraduationCap,
    UserCircle2,
} from 'lucide-react';
import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

// ─── Types ────────────────────────────────────────────────────────────────────

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

export interface AdminUser {
    id: number;
    full_name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    role: string; // flattened string from backend
}

interface AdminUsersResponse {
    success: boolean;
    message: string;
    data: AdminUser[];
    meta: PaginationMeta;
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

// Local (uncommitted) filter state
type LocalFilters = {
    role: string;
    verified: string;
    from: string;
    to: string;
    per_page: string;
};

// ─── API Slice ────────────────────────────────────────────────────────────────

export const AdminUserApi = createApi({
    reducerPath: 'adminUserApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['AdminUsers', 'AdminUser'],
    endpoints: (builder) => ({
        getAdminUsers: builder.query<AdminUsersResponse, AdminUsersQueryParams>({
            query: (params) => {
                const safeParams = params ?? {};
                const cleaned = Object.fromEntries(
                    Object.entries(safeParams).filter(([, v]) => v !== undefined && v !== '' && v !== null)
                ) as Record<string, string>;
                const qs = new URLSearchParams(cleaned).toString();
                return { url: `/api/admin/users${qs ? `?${qs}` : ''}`, method: 'GET' };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data
                            .filter((u): u is AdminUser => u != null)
                            .map(({ id }) => ({ type: 'AdminUser' as const, id })),
                        { type: 'AdminUsers', id: 'LIST' },
                    ]
                    : [{ type: 'AdminUsers', id: 'LIST' }],
        }),
    }),
});

export const { useGetAdminUsersQuery } = AdminUserApi;

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = ['admin', 'learner', 'instructor'] as const;

const ROLE_CONFIG: Record<string, { label: string; icon: React.ElementType; classes: string }> = {
    admin: { label: 'Admin', icon: ShieldCheck, classes: 'bg-gray-900 text-white' },
    instructor: { label: 'Instructor', icon: GraduationCap, classes: 'bg-gray-100 text-gray-700' },
    learner: { label: 'Learner', icon: UserCircle2, classes: 'bg-gray-100 text-gray-600' },
};

const AVATAR_COLORS = [
    'bg-zinc-800 text-zinc-100',
    'bg-stone-700 text-stone-100',
    'bg-neutral-700 text-neutral-100',
    'bg-slate-700 text-slate-100',
    'bg-gray-700 text-gray-100',
];

const SORT_COLS: { label: string; key: AdminUsersQueryParams['sort_by'] | null }[] = [
    { label: 'User', key: 'full_name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: null },
    { label: 'Status', key: null },
    { label: 'Joined', key: 'created_at' },
];

const DEFAULT_QUERY: AdminUsersQueryParams = {
    page: 1, per_page: 15, sort_by: 'created_at', sort_dir: 'desc',
};

const DEFAULT_LOCAL: LocalFilters = {
    role: '', verified: '', from: '', to: '', per_page: '15',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

function downloadCSV(users: AdminUser[]) {
    const headers = ['ID', 'Full Name', 'Email', 'Role', 'Verified', 'Joined'];
    const rows = users.map((u) => [
        u.id,
        `"${u.full_name}"`,
        u.email,
        u.role ?? '—',
        u.email_verified_at ? 'Yes' : 'No',
        formatDate(u.created_at),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string | null }) {
    const cfg = role ? ROLE_CONFIG[role] : null;
    if (!cfg) {
        return <span className="text-xs text-gray-400">—</span>;
    }
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${cfg.classes}`}>
            <Icon className="w-3 h-3" strokeWidth={2.5} />
            {cfg.label}
        </span>
    );
}

function VerifiedBadge({ verified }: { verified: boolean }) {
    return verified ? (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
            Verified
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <XCircle className="w-3.5 h-3.5" strokeWidth={2} />
            Unverified
        </span>
    );
}

// Intentionally a <span> — it is always rendered inside a <button>.
// A <button> inside a <button> is invalid HTML and causes a hydration error.
function SortIndicator({ sortKey, activeKey, dir }: {
    sortKey: AdminUsersQueryParams['sort_by'];
    activeKey?: AdminUsersQueryParams['sort_by'];
    dir?: 'asc' | 'desc';
}) {
    const isActive = activeKey === sortKey;
    return (
        <span className={`inline-flex items-center transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'
            }`}>
            {isActive
                ? dir === 'asc'
                    ? <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                    : <ArrowDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                : <ArrowUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" strokeWidth={2} />}
        </span>
    );
}

function TableSkeleton() {
    return (
        <>
            {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse shrink-0" />
                            <div className="space-y-2">
                                <div className="h-3 w-32 bg-gray-100 rounded-full animate-pulse" />
                                <div className="h-2.5 w-16 bg-gray-100 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </td>
                    {[160, 80, 72, 80].map((w, j) => (
                        <td key={j} className="px-5 py-4">
                            <div className="h-3 bg-gray-100 rounded-full animate-pulse" style={{ width: w }} />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            {label}
            <button
                onClick={onRemove}
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            >
                <X className="w-2.5 h-2.5" strokeWidth={2.5} />
            </button>
        </span>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminUsersPage() {
    const [query, setQuery] = useState<AdminUsersQueryParams>(DEFAULT_QUERY);
    const [searchInput, setSearchInput] = useState('');
    const [local, setLocal] = useState<LocalFilters>(DEFAULT_LOCAL);
    const [dateError, setDateError] = useState('');

    const { data, isLoading, isFetching, isError } = useGetAdminUsersQuery(query);

    // ── Sorting ──
    const handleSort = useCallback((key: AdminUsersQueryParams['sort_by']) => {
        if (!key) return;
        setQuery((prev) => ({
            ...prev,
            sort_by: key,
            sort_dir: prev.sort_by === key && prev.sort_dir === 'asc' ? 'desc' : 'asc',
            page: 1,
        }));
    }, []);

    // ── Search ──
    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setQuery((prev) => ({ ...prev, search: searchInput.trim() || undefined, page: 1 }));
    }, [searchInput]);

    const clearSearch = useCallback(() => {
        setSearchInput('');
        setQuery((prev) => ({ ...prev, search: undefined, page: 1 }));
    }, []);

    // ── Local field setter ──
    const setLocalField = useCallback(<K extends keyof LocalFilters>(key: K, val: LocalFilters[K]) => {
        setLocal((prev) => ({ ...prev, [key]: val }));
        if (key === 'from' || key === 'to') setDateError('');
    }, []);

    // ── Apply filters ──
    const handleApply = useCallback(() => {
        if ((local.from && !local.to) || (!local.from && local.to)) {
            setDateError('Both start and end date are required.');
            return;
        }
        if (local.from && local.to && local.from > local.to) {
            setDateError('Start date must be before end date.');
            return;
        }
        setDateError('');
        setQuery((prev) => ({
            ...prev,
            page: 1,
            role: local.role || undefined,
            verified: local.verified === '' ? undefined : local.verified === 'true',
            from: local.from || undefined,
            to: local.to || undefined,
            per_page: Number(local.per_page),
        }));
    }, [local]);

    // ── Clear all ──
    const handleClearAll = useCallback(() => {
        setLocal(DEFAULT_LOCAL);
        setSearchInput('');
        setDateError('');
        setQuery(DEFAULT_QUERY);
    }, []);

    // ── Active filter count ──
    const activeFilterCount = useMemo(() => (
        [query.search, query.role, query.verified !== undefined ? 't' : '', query.from].filter(Boolean).length
    ), [query]);

    // ── Page window ──
    const pageWindow = useMemo(() => {
        if (!data?.meta) return [];
        const { last_page: total, current_page: cur } = data.meta;
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        if (cur <= 4) return [1, 2, 3, 4, 5, -1, total];
        if (cur >= total - 3) return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
        return [1, -1, cur - 1, cur, cur + 1, -1, total];
    }, [data?.meta]);

    const users = data?.data ?? [];
    const meta = data?.meta;

    // ── Header summary copy ──
    const summaryText = useMemo(() => {
        if (isLoading) return null;
        if (isError) return null;
        if (!meta) return null;
        return (
            <>
                <span className="text-gray-900 font-semibold">{meta.total.toLocaleString()}</span>
                {' '}users · {meta.from}–{meta.to} shown
            </>
        );
    }, [isLoading, isError, meta]);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* ── Page Header ────────────────────────────────────── */}
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">User Management</h1>
                            <p className="text-sm text-gray-400 mt-0.5 h-5">
                                {isLoading && (
                                    <span className="inline-flex items-center gap-1.5 text-gray-400">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Loading users…
                                    </span>
                                )}
                                {isError && (
                                    <span className="inline-flex items-center gap-1.5 text-red-500">
                                        <AlertCircle className="w-3 h-3" />
                                        Failed to load
                                    </span>
                                )}
                                {!isLoading && !isError && summaryText}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Search ─────────────────────────────────────────── */}
                <div className="mb-3 flex sm:flex-row flex-col justify-between gap-3">
                    <form onSubmit={handleSearch}>
                        <div className="flex gap-2">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={2} />
                                <input
                                    type="text"
                                    placeholder="Search by name or email…"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                />
                                {searchInput && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={() => users.length && downloadCSV(users)}
                        disabled={!users.length || isLoading}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                    >
                        <Download className="w-4 h-4" strokeWidth={2.5} />
                        Export CSV
                    </button>
                </div>

                {/* ── Divider ──────────────────────────────────────────── */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-gray-100" />
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        <Filter className="w-3 h-3" strokeWidth={2} />
                        Filters
                    </span>
                    <div className="h-px flex-1 bg-gray-100" />
                </div>

                {/* ── Filter Panel (always open) ──────────────────────── */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-5">

                    {/* Filter header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            {activeFilterCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-gray-900 text-white text-xs font-bold leading-tight">
                                    {activeFilterCount} active
                                </span>
                            )}
                        </div>
                        {activeFilterCount > 0 && (
                            <button
                                onClick={handleClearAll}
                                className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <X className="w-3 h-3" strokeWidth={2.5} />
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Role */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</label>
                            <select
                                value={local.role}
                                onChange={(e) => setLocalField('role', e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 cursor-pointer transition-all"
                            >
                                <option value="">All Roles</option>
                                {ROLES.map((r) => (
                                    <option key={r} value={r} className="capitalize">{ROLE_CONFIG[r]?.label ?? r}</option>
                                ))}
                            </select>
                        </div>

                        {/* Verification */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Verification</label>
                            <select
                                value={local.verified}
                                onChange={(e) => setLocalField('verified', e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 cursor-pointer transition-all"
                            >
                                <option value="">Any</option>
                                <option value="true">Verified</option>
                                <option value="false">Unverified</option>
                            </select>
                        </div>

                        {/* Date range */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Date Range
                                </label>
                                {(local.from || local.to) && (
                                    <button
                                        type="button"
                                        onClick={() => { setLocalField('from', ''); setLocalField('to', ''); }}
                                        className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={local.from}
                                    onChange={(e) => setLocalField('from', e.target.value)}
                                    className={`flex-1 min-w-0 border rounded-lg px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:border-gray-300 transition-all ${dateError && !local.from ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-200'
                                        }`}
                                />
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" strokeWidth={2} />
                                <input
                                    type="date"
                                    value={local.to}
                                    min={local.from || undefined}
                                    onChange={(e) => setLocalField('to', e.target.value)}
                                    className={`flex-1 min-w-0 border rounded-lg px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:border-gray-300 transition-all ${dateError && !local.to ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-200'
                                        }`}
                                />
                            </div>
                            {dateError && (
                                <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
                                    <AlertCircle className="w-3 h-3 shrink-0" strokeWidth={2} />
                                    {dateError}
                                </p>
                            )}
                        </div>

                        {/* Per page + Apply */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Per Page</label>
                            <select
                                value={local.per_page}
                                onChange={(e) => setLocalField('per_page', e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 cursor-pointer transition-all"
                            >
                                {[10, 15, 25, 50].map((n) => (
                                    <option key={n} value={n}>{n} rows</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Apply button — full width below grid */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleApply}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all"
                        >
                            <Filter className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* ── Active filter chips ──────────────────────────────── */}
                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {query.search && (
                            <Chip
                                label={`Search: "${query.search}"`}
                                onRemove={() => { setSearchInput(''); setQuery((p) => ({ ...p, search: undefined, page: 1 })); }}
                            />
                        )}
                        {query.role && (
                            <Chip
                                label={`Role: ${ROLE_CONFIG[query.role]?.label ?? query.role}`}
                                onRemove={() => { setLocal((p) => ({ ...p, role: '' })); setQuery((p) => ({ ...p, role: undefined, page: 1 })); }}
                            />
                        )}
                        {query.verified !== undefined && (
                            <Chip
                                label={query.verified ? 'Verified' : 'Unverified'}
                                onRemove={() => { setLocal((p) => ({ ...p, verified: '' })); setQuery((p) => ({ ...p, verified: undefined, page: 1 })); }}
                            />
                        )}
                        {query.from && query.to && (
                            <Chip
                                label={`${query.from} → ${query.to}`}
                                onRemove={() => {
                                    setLocal((p) => ({ ...p, from: '', to: '' }));
                                    setQuery((p) => ({ ...p, from: undefined, to: undefined, page: 1 }));
                                }}
                            />
                        )}
                    </div>
                )}

                {/* ── Table ──────────────────────────────────────────── */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">

                    {/* Refetch progress bar */}
                    <div className={`h-0.5 transition-opacity duration-300 ${isFetching && !isLoading ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="h-full bg-gradient-to-r from-gray-200 via-gray-500 to-gray-200 animate-pulse" />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {SORT_COLS.map(({ label, key }) => {
                                        const sortable = key !== null;
                                        return (
                                            <th
                                                key={label}
                                                className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap select-none ${sortable ? 'text-gray-500' : 'text-gray-400'
                                                    }`}
                                            >
                                                {sortable ? (
                                                    <button
                                                        onClick={() => handleSort(key)}
                                                        className={`inline-flex items-center gap-1.5 group transition-colors ${query.sort_by === key ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                                            }`}
                                                    >
                                                        {label}
                                                        <SortIndicator
                                                            sortKey={key}
                                                            activeKey={query.sort_by}
                                                            dir={query.sort_dir}
                                                        />
                                                    </button>
                                                ) : (
                                                    label
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <TableSkeleton />
                                ) : isError ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                                    <AlertCircle className="w-5 h-5 text-red-400" strokeWidth={2} />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">Failed to load users</p>
                                                <p className="text-xs text-gray-400">Check your connection and try again.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <Search className="w-5 h-5 text-gray-400" strokeWidth={2} />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">No users found</p>
                                                <p className="text-xs text-gray-400">Try adjusting your search or filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">

                                            {/* User */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden ${AVATAR_COLORS[user.id % AVATAR_COLORS.length]
                                                            }`}
                                                    >
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.full_name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            getInitials(user.full_name)
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 leading-tight truncate">
                                                            {user.full_name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">#{user.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="px-5 py-4 font-mono text-xs text-gray-500 max-w-[200px] truncate">
                                                {user.email}
                                            </td>

                                            {/* Role */}
                                            <td className="px-5 py-4">
                                                <RoleBadge role={user.role ?? null} />
                                            </td>

                                            {/* Verified */}
                                            <td className="px-5 py-4">
                                                <VerifiedBadge verified={!!user.email_verified_at} />
                                            </td>

                                            {/* Joined */}
                                            <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                                                {formatDate(user.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── Pagination ─────────────────────────────────────── */}
                {meta && meta.last_page > 1 && (
                    <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-gray-400">
                            Page{' '}
                            <span className="text-gray-700 font-semibold">{meta.current_page}</span>
                            {' '}of {meta.last_page}
                            {' · '}{meta.total.toLocaleString()} users
                        </p>

                        <div className="flex items-center gap-1">
                            <button
                                disabled={!meta.prev_page_url}
                                onClick={() => setQuery((p) => ({ ...p, page: meta.current_page - 1 }))}
                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                            </button>

                            {pageWindow.map((page, i) =>
                                page === -1 ? (
                                    <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-300 text-xs">
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => setQuery((p) => ({ ...p, page }))}
                                        className={`w-8 h-8 rounded-lg border text-xs font-semibold transition-colors ${page === meta.current_page
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                            <button
                                disabled={!meta.next_page_url}
                                onClick={() => setQuery((p) => ({ ...p, page: meta.current_page + 1 }))}
                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}