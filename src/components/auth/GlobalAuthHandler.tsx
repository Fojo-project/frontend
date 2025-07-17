'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useToastify from '@/hooks/useToastify';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/auth/auth.slice';
import { clearSessionCookie } from '@/lib/session';


export default function GlobalAuthHandler() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { showToast } = useToastify();

    useEffect(() => {
        const handleUnauthorized = () => {
            clearSessionCookie()
            dispatch(logout());
            showToast('Session expired. Please log in again.', 'error');
            router.push('/');
        };
        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, [dispatch, router, showToast]);
    return null;
}
