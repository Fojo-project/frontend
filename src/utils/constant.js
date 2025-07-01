import config from '@/config';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Support Us', href: '/support' },
];

export const loadingIndicatorProperties = {
  color: '#FE6D00',
  height: 3.5,
  showSpinner: true,
  zIndex: 999999999,
};
export const cookieConfig = {
  expires: Infinity,
  path: '/',
  secure: config.NODE_ENV === 'production',
  sameSite: 'Lax',
  domain: config.baseUrl,
};
