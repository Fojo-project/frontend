import Cookies from 'js-cookie';

/**
 * Set authentication tokens in cookies
 */
export const setAuthTokens = (accessToken: string, refreshToken: string): void => {
  const commonOptions = {
    expires: 7, // days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  };

  Cookies.set('access_token', accessToken, commonOptions);
  Cookies.set('refresh_token', refreshToken, commonOptions);
};

/**
 * Get authentication tokens from cookies
 */
export const getAuthTokens = (): { accessToken?: string; refreshToken?: string } => {
  return {
    accessToken: Cookies.get('access_token'),
    refreshToken: Cookies.get('refresh_token'),
  };
};

/**
 * Remove authentication tokens from cookies
 */
export const removeAuthTokens = (): void => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!(Cookies.get('access_token') && Cookies.get('refresh_token'));
};
