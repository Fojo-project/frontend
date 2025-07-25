'use client';

import React from "react";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserIcon } from "@/assets/icons";

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
        <div className="relative w-16 h-16 border-[1px] rounded-full flex justify-center items-center">
          {user?.avatar ? <Image
            src={user?.avatar as string}
            width={40}
            height={40}
            alt="User"
            className="w-full overflow-hidden rounded-full"
          /> : <UserIcon width={35} height={35} />}
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
