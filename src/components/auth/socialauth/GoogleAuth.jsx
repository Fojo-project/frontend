'use client';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSocialLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { setTokenCookie } from '@/utils/helper';
import { GoogleIcon, LoadingIcon } from '@/assets/icons'; // Assuming LoadingIcon is exported from here

export default function GoogleAuth({ authType = 'signin', onSuccessRedirect = '/dashboard' }) {
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const { showToast } = useToastify();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const { name, email } = userInfoRes.data;

        const payload = {
          provider: 'google',
          full_name: name,
          email,
        };

        console.log('Payload being sent to backend:', payload);

        const res = await socialLogin(payload).unwrap();

        if (res?.data?.token) {
          setTokenCookie(res.data.token);
          showToast(
            res.message || `${authType === 'signin' ? 'Login' : 'Signup'} successful`,
            'success'
          );
          router.replace(onSuccessRedirect);
        } else {
          showToast('No token returned from server', 'error');
        }
      } catch (err) {
        console.error('Social login failed:', err);
        showToast(err?.response?.data?.message || 'Social login failed', 'error');
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
        <LoadingIcon className="w-5 h-5 text-gray-400" />
      ) : (
        <GoogleIcon />
      )}
    </button>
  );
}
