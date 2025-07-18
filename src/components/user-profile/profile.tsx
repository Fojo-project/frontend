'use client';
import { useEffect } from 'react';
import { useGetMeQuery } from '@/store/profile/profile.api';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/profile/profile.slice';

export default function Profile() {
  const dispatch = useDispatch();
  const { data } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: false,
    refetchOnFocus: true,
  });
  useEffect(() => {
    if (data && data.data) {
      dispatch(
        setUser({
          id: String(data.data.id),
          full_name: data.data.full_name,
          email: data.data.email,
          provider: data.data.provider,
          role: data.data.role
        })
      );
    }
  }, [data, dispatch]);

  return null;
}
