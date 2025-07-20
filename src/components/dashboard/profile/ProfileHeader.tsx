'use client';

import React from "react";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => state.profile.user);

  return (
    <div className="w-full relative h-25 rounded-xl overflow-hidden mb-6">
      <Image
        src="/images/home/Profile-Background.png"
        alt="Header background"
        fill
        className="object-cover"
        priority
      />

      <div className="relative z-10 h-full flex items-center gap-4 bg-black/10 px-6">
        <div className="relative w-16 h-16">
          <Image
            src="https://i.pravatar.cc/100"
            alt="Profile"
            fill
            className="rounded-full object-cover border-2 border-white"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black">{user?.full_name}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
