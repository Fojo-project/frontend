'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { YoutubeIcon, WatchIcon, LiveIcon } from '../../../assets/icons'

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
        <div
            className="relative flex items-start gap-4 w-full rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition duration-200 group"
        >
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-right text-xs space-y-1">
                {isLive ? (
                    <div className="text-red-500 font-medium font-semibold text-[12px] flex items-center gap-1 lora">
                        Live
                        <YoutubeIcon width={14} height={14} />
                    </div>
                ) : (
                    <div className="text-gray-500 font-medium lora text-sm mb-0">{dayLabel}</div>
                )}
                <div className="text-black font-500 font-semibold  lora text-[14px]">{time}</div>
            </div>


            <div className="relative w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                    src="/images/event/event_image.png"
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex-1  pr-20">
                <h3 className="text-[22px] font-semibold text-gray-900 cormorant-garamond">{title}</h3>
                <p className="text-sm text-[#555555] line-clamp-2 lora text-[14px]">{description}</p>

                <div className="flex items-center gap-4 mt-2">
                    <Link href='/' className="flex items-center text-[12px] font-semibold lora text-[#0000000] gap-1">
                        <WatchIcon width={16} height={16} /> Watch Live
                    </Link>
                    <Link href='/' className="flex items-center text-[12px] font-semibold lora text-xs text-gray-700 gap-1">
                        <LiveIcon width={16} height={16} /> Listen Live
                    </Link>
                </div>
            </div>
        </div>
    );
}
