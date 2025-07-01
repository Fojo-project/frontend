'use client';

import FacebookAuth from 'react-facebook-auth';
import { useRouter } from 'next/navigation';
import { useSocialLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { setTokenCookie } from '@/utils/helper';

export default function FacebookAuthButton({
  appId,
  authType = 'signin',
  onSuccessRedirect = '/dashboard',
}) {
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const { showToast } = useToastify();
  const router = useRouter();

  const handleFacebookResponse = async (response) => {
    try {
      const token = response?.accessToken;
      if (!token) throw new Error('No token received from Facebook.');

      const payload = {
        token,
        provider: 'facebook',
      };

      const result = await socialLogin(payload).unwrap();

      if (result.data?.token) {
        setTokenCookie(result.data.token);
        showToast(result.message || 'Login successful', 'success');
        router.replace(onSuccessRedirect);
      } else {
        showToast('Token not returned from server', 'error');
      }
    } catch (error) {
      showToast(error?.data?.message || 'Facebook sign-in failed', 'error');
    }
  };

  const getButtonText = () => {
    switch (authType) {
      case 'signup':
        return 'Sign up with Facebook';
      case 'continue':
        return 'Continue with Facebook';
      default:
        return 'Sign in with Facebook';
    }
  };

  const myFacebookButton = (props) => (
    <button
      onClick={props.onClick}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all w-full"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.003 3.657 9.127 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.127 22 17.003 22 12z" />
      </svg>
      {getButtonText()}
    </button>
  );

  return (
    <>
      <FacebookAuth
        appId={appId}
        callback={handleFacebookResponse}
        component={myFacebookButton}
      />
      {isLoading && (
        <div className="flex justify-center items-center mt-2">
          <span className="animate-spin text-gray-500">⏳</span>
        </div>
      )}
    </>
  );
}
