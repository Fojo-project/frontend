// components/GlobalAuthHandler.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { removeTokenCookie } from '@/utils/helper';
import useToastify from '@/hooks/useToastify';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/auth/auth.slice';


export default function GlobalAuthHandler() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { showToast } = useToastify();

    useEffect(() => {
        const handleUnauthorized = () => {
            router.push('/');
            removeTokenCookie();
            dispatch(logout());
            showToast('Session expired. Please log in again.', 'error');
        };
        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, []);
    return null;
}
