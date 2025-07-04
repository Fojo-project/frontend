'use client';
import { LoadingIcon, SignOut } from '@/assets/icons';
import useToastify from '@/hooks/useToastify';
import { useLogoutMutation } from '@/store/auth/auth.api';
import { logout } from '@/store/auth/auth.slice';
import { removeTokenCookie } from '@/utils/helper';
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
      await logoutApi().unwrap();
      showToast('Logout successful', 'success');
      removeTokenCookie();
      dispatch(logout());
      router.push('/signin');
    } catch {
      showToast('Logout failed. Please try again.', 'error');
    }
  };

  return (
    <div>
      {' '}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex items-center w-full  gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        aria-label="Logout"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoadingIcon />
            Signing out...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {' '}
            <SignOut width={24} height={24} />
            Sign Out
          </div>
        )}
      </button>
    </div>
  );
}
