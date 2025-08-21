// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { YoutubeIcon, WatchIcon, LiveIcon } from '../../../assets/icons';
// import { useEventsQuery } from '@/store/dashboard/dashboard.api';
// import {
//   formatTo12HourWithMinutes,
//   getDayName,
//   truncateText,
// } from '@/utils/helper';
// import Pagination from '@/components/ui/Pagination/Pagination';
// import { usePathname } from 'next/navigation';
// import EventSkeleton from '@/components/ui/skeleton/EventSkeleton';
// import NoResource from '@/components/common/NoResource';
// import { Modal } from '@/components/ui/modal';

// type EventCardProps = {
//   limit?: number;
//   textLimit?: number;
//   setPagination?: boolean;
// };

// export default function EventCard({
//   limit,
//   textLimit,
//   setPagination,
// }: EventCardProps) {
//   const [page, setCurrentPage] = useState(1);
//   const { data, isLoading } = useEventsQuery(page);
//   const pathname = usePathname();

//   const [selectedEvent, setSelectedEvent] = useState<any>(null);
//   const [viewType, setViewType] = useState<'video' | 'audio' | null>(null);

//   const getEmbedUrl = (url: string) => {
//     if (!url) return '';
//     if (url.includes('youtube.com/watch?v=')) {
//       const videoId = url.split('v=')[1]?.split('&')[0];
//       return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
//     }
//     return url;
//   };

//   const sortedEvents = [...(data?.data ?? [])].sort((a, b) => {
//     if (a.is_live && !b.is_live) return -1;
//     if (!a.is_live && b.is_live) return 1;
//     return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
//   });

//   const showPagination =
//     typeof setPagination === 'boolean'
//       ? setPagination
//       : pathname === '/dashboard/events';

//   const displayedEvents = limit ? sortedEvents.slice(0, limit) : sortedEvents;

//   if (isLoading)
//     return (
//       <div className="flex flex-col gap-4">
//         {[...Array(2)].map((_, idx) => (
//           <div key={idx} className="w-full">
//             <EventSkeleton />
//           </div>
//         ))}
//       </div>
//     );

//   if (!data?.data || data.data.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">
//         <NoResource
//           title="No Events Found"
//           subtitle="There are no events available at the moment."
//           icon="/images/event/no-event.png"
//         />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-4">
//         {displayedEvents.map((event) => (
//           <div
//             key={event.id}
//             className="relative flex flex-col md:flex-row items-start gap-4 w-full rounded-xl border border-gray-200 p-5 bg-white hover:shadow-md transition duration-200 group"
//           >
//             <div className="relative w-full h-30 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
//               <Image
//                 src="/images/event/event_image.png"
//                 alt={event?.title}
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>

//             <div className="flex-1">
//               <h3 className="text-[20px] lg:text-[22px] font-bold text-gray-900 font-cormorant">
//                 {truncateText(event?.title, textLimit)}
//               </h3>
//               <div className="flex justify-between gap-10 text-xs w-full space-y-1">
//                 <p className="text-sm text-[#555555] line-clamp-2 font-lora">
//                   {event?.description}
//                 </p>
//                 <div>
//                   {event?.is_live ? (
//                     <div className="text-red-600 font-semibold flex items-center gap-1 font-lora">
//                       Live
//                       <YoutubeIcon width={14} height={14} />
//                     </div>
//                   ) : (
//                     <div className="text-gray-500 font-medium font-lora text-sm">
//                       <div>{getDayName(event?.start_date)}</div>
//                     </div>
//                   )}
//                   <div className="text-black font-bold font-lora text-[14px]">
//                     {formatTo12HourWithMinutes(event?.start_time)}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 mt-2">
//                 {event?.video_url && (
//                   <button
//                     onClick={() => {
//                       setSelectedEvent(event);
//                       setViewType('video');
//                     }}
//                     className="flex items-center text-xs md:text-[14px] font-bold text-black gap-1"
//                   >
//                     <WatchIcon width={14} height={14} />
//                     Watch Live
//                   </button>
//                 )}
//                 {event?.audio_url && (
//                   <button
//                     onClick={() => {
//                       setSelectedEvent(event);
//                       setViewType('audio');
//                     }}
//                     className="flex items-center md:text-[14px] font-bold text-xs text-gray-700 gap-1"
//                   >
//                     <LiveIcon width={14} height={14} />
//                     Listen Live
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {showPagination && (
//           <Pagination
//             currentPage={data.meta.current_page}
//             lastPage={data.meta.last_page}
//             onPageChange={(page) => setCurrentPage(page)}
//             hasNextPage={!!data.meta.next_page_url}
//             hasPrevPage={!!data.meta.prev_page_url}
//           />
//         )}
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={!!selectedEvent}
//         onClose={() => {
//           setSelectedEvent(null);
//           setViewType(null);
//         }}
//         isFullscreen={false}
//         className="max-w-4xl bg-white p-4 rounded-lg"
//       >
//         {selectedEvent && (
//           <div className="w-full">
//             <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
//             <div className="relative w-full h-0 pb-[56.25%]">
//               {viewType === 'video' && (
//                 <iframe
//                   src={getEmbedUrl(selectedEvent.video_url)}
//                   title={selectedEvent.title}
//                   allowFullScreen
//                   className="absolute top-0 left-0 w-full h-full rounded-lg"
//                 ></iframe>
//               )}
//               {viewType === 'audio' && (
//                 <iframe
//                   src={selectedEvent.audio_url}
//                   title={selectedEvent.title}
//                   allow="autoplay"
//                   className="absolute top-0 left-0 w-full h-full rounded-lg"
//                 ></iframe>
//               )}
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// }
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
import NetworkErrorAlert from '@/components/common/NetworkErrorAlert';

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
  const { data, isLoading, isError } = useEventsQuery(page);
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

  if (isLoading || isError)
    return isLoading ? (
      <div className="flex flex-col gap-4">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="w-full">
            <EventSkeleton />
          </div>
        ))}
      </div>
    ) : (
      <NetworkErrorAlert
        error={isError}
        showRetryButton={true}
        onRetry={() => window.location.reload()}
      />
    );

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <NoResource
          title="No Events Found"
          subtitle="There are no events available at the moment."
          icon="/images/event/no-event.png"
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
              {event?.video_url && (
                <Link
                  href={`/dashboard/events/${event.id}?type=video`}
                  className="flex items-center text-xs md:text-[14px] font-bold text-black gap-1"
                >
                  <WatchIcon width={14} height={14} />
                  Watch Live
                </Link>
              )}
              {event?.audio_url && (
                <Link
                  href={`/dashboard/events/${event.id}?type=audio`}
                  className="flex items-center md:text-[14px] font-bold text-xs text-gray-700 gap-1"
                >
                  <LiveIcon width={14} height={14} />
                  Listen Live
                </Link>
              )}
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
