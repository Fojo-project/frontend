import Cookies from 'js-cookie';
import { cookieConfig, googleUserInfoUrl } from './constant';

export const setTokenCookie = (token) => {
  Cookies.set('FOJO_TOKEN', token, cookieConfig);
};
export const removeTokenCookie = () => {
  Cookies.remove('FOJO_TOKEN');
};
export const token = Cookies.get('FOJO_TOKEN');

export async function fetchGoogleUserInfo(accessToken) {
  const response = await fetch(googleUserInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMsg =
      errorBody?.error_description || 'Failed to fetch Google user info';
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const { name, email } = data;

  if (!name || !email) {
    throw new Error('Incomplete user info returned from Google');
  }

  return { name, email };
}
