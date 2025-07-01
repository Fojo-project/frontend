'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useSocialLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { setTokenCookie } from '@/utils/helper';

export default function GoogleAuth({ authType = 'signin', onSuccessRedirect = '/dashboard' }) {
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const { showToast } = useToastify();
  const router = useRouter();

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) throw new Error('No token received from Google.');

      const payload = {
        token,
        provider: 'google',
      };

      const response = await socialLogin(payload).unwrap();

      if (response.data?.token) {
        setTokenCookie(response.data.token);
        showToast(response.message || 'Login successful', 'success');
        router.replace(onSuccessRedirect);
      } else {
        showToast('Token not returned from server', 'error');
      }
    } catch (error) {
      showToast(error?.data?.message || 'Google sign-in failed', 'error');
    }
  };

  const handleError = () => {
    showToast('Google sign-in failed. Please try again.', 'error');
  };

  const getButtonText = () => {
    switch (authType) {
      case 'signup':
        return 'signup_with';
      case 'continue':
        return 'continue_with';
      default:
        return 'signin_with';
    }
  };

  return (
    <div className="my-1">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        size="large"
        text={getButtonText()}
        shape="pill"
        theme="outline"
      />
      {isLoading && (
        <div className="flex justify-center items-center mt-2">
          <span className="animate-spin text-gray-500">⏳</span>
        </div>
      )}
    </div>
  );
}
