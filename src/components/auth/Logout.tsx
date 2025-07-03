'use client';
import useToastify from '@/hooks/useToastify';
import { useLogoutMutation } from '@/store/auth/auth.api';
import { logout } from '@/store/auth/auth.slice';
import { removeTokenCookie, token } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToastify();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const userToken = token;
      const formData = new FormData();
      formData.append('token', userToken || '');
      await logoutApi(formData).unwrap();
      showToast('Logout Sucessfull', 'success');
      removeTokenCookie();
      dispatch(logout());
      router.push('/signin');
    } catch {
      // Optionally handle error
    }
  };
  return (
    <div>
      {' '}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}
