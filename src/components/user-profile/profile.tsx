'use client';
import React, { useEffect } from 'react';
import { useGetMeQuery } from '@/store/auth/auth.api';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/auth/auth.slice';

export default function Profile() {
  const dispatch = useDispatch();
  const { data } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  useEffect(() => {
    if (data && data.data) {
      dispatch(
        setUser({
          id: String(data.data.id),
          name: data.data.full_name,
          email: data.data.email,
        })
      );
    }
  }, [data, dispatch]);

  return <div></div>;
}
