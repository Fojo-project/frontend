// 'use client';

import { LiveIcon, WatchIcon } from '@/assets/icons';
import { formatTo12HourWithMinutes, getDayName } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import { useUpComingEventsQuery } from '@/store/dashboard/dashboard.api';
import EventSkeleton from '@/components/ui/skeleton/EventSkeleton';
import NoResource from '@/components/common/NoResource';

export default function UpComingEvents() {
  const { data, isLoading } = useUpComingEventsQuery();

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="w-full">
            <EventSkeleton />
          </div>
        ))}
      </div>
    );

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <NoResource
          title="No upcoming events"
          subtitle="There are no upcoming events available at the moment."
          icon="/images/event/no-event.png"
        />
      </div>
    );
  }

  const sortedEvents = [...(data?.data ?? [])].sort((a, b) => {
    if (a.is_live && !b.is_live) return -1;
    if (!a.is_live && b.is_live) return 1;
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  return (
    <div className="flex flex-col gap-4">
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          className="relative flex flex-col md:flex-row items-start gap-4 w-full rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition duration-200 group"
        >
          <div className="relative w-full h-30 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src="/images/event/event_image.png"
              alt={event?.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-[20px] lg:text-[22px] font-bold text-gray-900 font-cormorant">
              {event?.title}
            </h3>
            <div className="flex justify-between gap-10 text-xs w-full space-y-1">
              <p className="text-sm text-[#555555] line-clamp-2 font-lora text-[16px]">
                {event?.description}
              </p>
              <div>
                <div className="text-gray-500 font-medium font-lora text-sm">
                  <div>{getDayName(event?.start_date)}</div>
                </div>
                <div className="text-black font-bold font-lora text-[14px]">
                  {formatTo12HourWithMinutes(event?.start_time)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
             {event?.video_url && (
  <Link
    href={`/dashboard/events/${event.id}?type=video`}
    className="flex items-center text-[14px] font-bold text-black gap-1"
  >
    <WatchIcon width={14} height={14} /> Watch Live
  </Link>
)}

{event?.audio_url && (
  <Link
    href={`/dashboard/events/${event.id}?type=audio`}
    className="flex items-center text-[14px] font-bold text-xs text-gray-700 gap-1"
  >
    <LiveIcon width={14} height={14} /> Listen Live
  </Link>
)}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
