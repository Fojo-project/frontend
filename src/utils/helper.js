import Cookies from 'js-cookie';
import { cookieConfig } from './constant';

export const setTokenCookie = (token) => {
  Cookies.set('token', token, cookieConfig);
};
