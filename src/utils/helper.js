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
export function downloadTextFile(content, filename) {
  if (!content || !filename) {
    console.warn('Missing content or filename for text file download.');
    return;
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function formatText(text, options) {
  if (!text) return '';

  let formatted = text.trim();

  formatted =
    formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
  if (options?.limitWords) {
    const words = formatted.split(' ').slice(0, options.limitWords);
    formatted = words.join(' ');
  }

  if (options?.limitChars) {
    formatted = formatted.slice(0, options.limitChars);
  }

  const prefix = options?.prefix ?? '';
  const suffix = options?.suffix ?? '';

  return `${prefix}${formatted}${suffix}`;
}
export function formatDuration(minutes) {
  if (!minutes || minutes < 0) return '0 minutes';

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs} hour${hrs > 1 ? 's' : ''}`);
  if (mins > 0 || hrs === 0) parts.push(`${mins} minute${mins > 1 ? 's' : ''}`);

  return parts.join(' and ');
}
