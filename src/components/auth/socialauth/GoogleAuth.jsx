'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useSocialLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { fetchGoogleUserInfo, setTokenCookie } from '@/utils/helper';
import { GoogleIcon, LoadingIcon } from '@/assets/icons';

export default function GoogleAuth({ authType = 'signin', onSuccessRedirect = '/dashboard' }) {
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const { showToast } = useToastify();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { name: full_name, email } = await fetchGoogleUserInfo(tokenResponse.access_token);
        const payload = {
          provider: 'google',
          full_name,
          email,
        };

        const res = await socialLogin(payload).unwrap();
        setTokenCookie(res.data.token);

        const action = authType === 'signin' ? 'Login' : 'Signup';
        showToast(`${action} successful`, 'success');

        router.replace(onSuccessRedirect);
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Social login failed';
        showToast(message, 'error');
      }
    },
    onError: () => {
      showToast('Google login failed', 'error');
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={isLoading}
      className="flex items-center justify-center border-[#E4E7EC] border-[1px] rounded-lg py-[18px] px-[18px] transition-colors"
    >
      {isLoading ? (
        <LoadingIcon className="w-5 h-5 text-gray-700" />
      ) : (
        <GoogleIcon />
      )}
    </button>
  );
}
