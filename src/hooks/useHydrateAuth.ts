import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setUser } from '../store/auth/auth.slice';
import { RootState } from '../store';
import axios from 'axios';

const useHydrateAuth = (fetchProfile: boolean = true) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const cookieToken = Cookies.get('FOJO_TOKEN');
    if (!token && cookieToken) {
      dispatch(loginSuccess({ user: null, token: cookieToken }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    const cookieToken = Cookies.get('FOJO_TOKEN');
    if (fetchProfile && cookieToken && !user) {
      axios
        .get('/api/me', {
          headers: { Authorization: `Bearer ${cookieToken}` },
        })
        .then((res) => {
          if (res.data) {
            dispatch(setUser(res.data));
          }
        })
        .catch(() => {});
    }
  }, [user, fetchProfile, dispatch]);
};

export default useHydrateAuth;
