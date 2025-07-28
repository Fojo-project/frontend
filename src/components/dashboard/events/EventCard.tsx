'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { YoutubeIcon, WatchIcon, LiveIcon } from '../../../assets/icons';

type Props = {
  title: string;
  description: string;
  time: string;
  imageUrl: string;
  isLive?: boolean;
  dayLabel?: string;
};

export default function EventCard({
  title,
  description,
  time,
  isLive = false,
  dayLabel,
}: Props) {
  return (
    <Link
      href="#"
      className="relative flex flex-col md:flex-row items-start gap-4 w-full rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition duration-200 group"
    >
      <div className="relative w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <Image
          src="/images/event/event_image.png"
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1  ">
        <h3 className="text-[22px] font-bold text-gray-900 font-cormorant">
          {title}
        </h3>
        <div className="flex justify-between text-xs space-y-1">
          <p className="text-sm text-[#555555] line-clamp-2 font-lora text-[16px]">
            {description}
          </p>
          <div className="">
            {isLive ? (
              <div className="text-red-600 font-semibold flex items-center gap-1 font-lora">
                Live
                <YoutubeIcon width={14} height={14} />
              </div>
            ) : (
              <div className="text-gray-500 font-medium font-lora text-sm">
                {dayLabel}
              </div>
            )}
            <div className="text-black font-bold font-lora text-[14px]">
              {time}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center text-[14px] font-bold text-[#0000000] gap-1">
            <WatchIcon width={14} height={14} /> Watch Live
          </span>
          <span className="flex items-center text-[14px] font-bold  text-xs text-gray-700 gap-1">
            <LiveIcon width={14} height={14} /> Listen Live
          </span>
        </div>
      </div>
    </Link>
  );
}
