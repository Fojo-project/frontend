import React from 'react';
import EventCard from '../events/EventCard';
import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from '@/assets/icons';

export default function DashboardPrograms() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-black font-lora text-[22px] font-semibold">
            Events
          </h3>
          <p className="font-lora font-medium text-sm text-black-100">
            View All
          </p>
        </div>
        <div>
          <EventCard
            title={'Sunday Worship Service'}
            description={'This is a sample event description.'}
            time={'10:00 AM'}
            imageUrl={'/images/event/sample-event.jpg'}
            isLive={true}
            dayLabel={'Tue'}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-black font-lora text-[22px] font-semibold">
            Recommended Courses
          </h3>
          <p className="font-lora font-medium text-sm text-black-100">
            View All
          </p>
        </div>
        <div>
          <div className="relative flex items-start gap-4 w-full rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition duration-200 group">
            <div className="absolute top-5 right-5 text-right text-xs space-y-1"></div>

            <div className="relative w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
              <Image
                src="/images/event/event_image.png"
                alt={'recommendation'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex-1  pr-20">
              <div className="flex justify-between ">
                <h3 className="text-[22px] font-bold text-gray-900 font-cormorant">
                  Foundation{' '}
                </h3>
                <p></p>
              </div>
              <p className="text-sm leading-5 text-[#555555] line-clamp-2 font-lora text-[16px]">
                Start your journey with core teachings on salvation, prayer, and
                Scripture.
              </p>
              <div className="mt-2">
                <Link
                  href={'dashboard/explore-courses'}
                  className="font-lora flex items-center gap-1 font-semibold text-xs"
                >
                  View Course <Arrow width={14} height={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
