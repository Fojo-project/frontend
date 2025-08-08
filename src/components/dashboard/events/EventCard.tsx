'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { YoutubeIcon, WatchIcon, LiveIcon } from '../../../assets/icons';
import { useEventsQuery } from '@/store/dashboard/dashboard.api';
import {
  formatTo12HourWithMinutes,
  getDayName,
  truncateText,
} from '@/utils/helper';
import Pagination from '@/components/ui/Pagination/Pagination';
import { usePathname } from 'next/navigation';
import EventSkeleton from '@/components/ui/skeleton/EventSkeleton';
import NoResource from '@/components/common/NoResource';

type EventCardProps = {
  limit?: number;
  textLimit?: number;
  setPagination?: boolean;
};

export default function EventCard({
  limit,
  textLimit,
  setPagination,
}: EventCardProps) {
  const [page, setCurrentPage] = useState(1);
  const { data, isLoading } = useEventsQuery(page);
  const pathname = usePathname();

  const sortedEvents = [...(data?.data ?? [])].sort((a, b) => {
    if (a.is_live && !b.is_live) return -1;
    if (!a.is_live && b.is_live) return 1;
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });
  const showPagination =
    typeof setPagination === 'boolean'
      ? setPagination
      : pathname === '/dashboard/events';

  const displayedEvents = limit ? sortedEvents.slice(0, limit) : sortedEvents;

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="w-full ">
            <EventSkeleton />
          </div>
        ))}
      </div>
    );

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <NoResource
          title="No Events Found"
          subtitle="There are no events available at the moment."
          icon="/empty-states/event.svg"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {displayedEvents.map((event) => (
        <div
          key={event.id}
          className="relative flex flex-col md:flex-row items-start gap-4 w-full rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition duration-200 group"
        >
          <div className="relative w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src="/images/event/event_image.png"
              alt={event?.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-[22px] font-bold text-gray-900 font-cormorant">
              {truncateText(event?.title, textLimit)}
            </h3>
            <div className="flex justify-between gap-10 text-xs w-full space-y-1">
              <p className="text-sm text-[#555555] line-clamp-2 font-lora">
                {event?.description}
              </p>
              <div>
                {event?.is_live ? (
                  <div className="text-red-600 font-semibold flex items-center gap-1 font-lora">
                    Live
                    <YoutubeIcon width={14} height={14} />
                  </div>
                ) : (
                  <div className="text-gray-500 font-medium font-lora text-sm">
                    <div>{getDayName(event?.start_date)}</div>
                  </div>
                )}
                <div className="text-black font-bold font-lora text-[14px]">
                  {formatTo12HourWithMinutes(event?.start_time)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href="#"
                className="flex items-center text-[12px] font-bold text-[#0000000] gap-1"
              >
                <WatchIcon width={14} height={14} />
                Watch {event?.is_live && 'Live'}
              </Link>
              <Link
                href="#"
                className="flex items-center text-[12px] font-bold text-xs text-gray-700 gap-1"
              >
                <LiveIcon width={14} height={14} />
                Listen {event?.is_live && 'Live'}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {showPagination && (
        <Pagination
          currentPage={data.meta.current_page}
          lastPage={data.meta.last_page}
          onPageChange={(page) => setCurrentPage(page)}
          hasNextPage={!!data.meta.next_page_url}
          hasPrevPage={!!data.meta.prev_page_url}
        />
      )}
    </div>
  );
}
