'use client';
import { LoadingIcon, SignOut } from '@/assets/icons';
import useToastify from '@/hooks/useToastify';
import { clearSessionCookie } from '@/lib/session';
import { useLogoutMutation } from '@/store/auth/auth.api';
import { logout } from '@/store/auth/auth.slice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToastify();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      await clearSessionCookie();
      dispatch(logout());
      showToast('Logout successful', 'success');
      router.push('/');
    } catch {
      showToast('Logout failed. Please try again.', 'error');
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex items-center w-full  gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        aria-label="Logout"
      >
        <div className="flex items-center gap-2">
          <SignOut width={24} height={24} />
          Sign Out
          {isLoading ? <LoadingIcon /> : null}
        </div>
      </button>
    </div>
  );
}
