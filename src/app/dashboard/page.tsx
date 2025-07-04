'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Profile from '@/components/user-profile/profile';
import Logout from '@/components/auth/Logout';

export default function Ecommerce() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <Profile />
      {user ? (
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="mt-2 text-gray-600">This is your dashboard.</p>
        </div>
      ) : null}

      <Logout />
    </div>
  );
}
