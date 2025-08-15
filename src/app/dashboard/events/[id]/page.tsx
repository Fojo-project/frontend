'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import {
  useEventsQuery,
  useLiveEventsQuery,
  useUpComingEventsQuery,
} from '@/store/dashboard/dashboard.api';
import { formatTo12HourWithMinutes, getDayName } from '@/utils/helper';
import { BackIcon } from '@/assets/icons';
import AlertMessage from '@/components/common/AlertMessage';

export default function EventDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const eventId = params.id?.toString();
  const viewType = searchParams.get('type');

  const { data: paginatedEvents, isLoading: isLoadingPaginated } = useEventsQuery(1);
  const { data: liveEvents, isLoading: isLoadingLive } = useLiveEventsQuery();
  const { data: upcomingEvents, isLoading: isLoadingUpcoming } = useUpComingEventsQuery();

  const isLoading = isLoadingPaginated || isLoadingLive || isLoadingUpcoming;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <AlertMessage type="info" message="Loading event..." />
      </div>
    );
  }

  // Merge all events into one array
  const allEvents = [
    ...(paginatedEvents?.data ?? []),
    ...(liveEvents?.data ?? []),
    ...(upcomingEvents?.data ?? []),
  ];

  const event = allEvents.find((e: any) => e.id.toString() === eventId);

  if (!event) {
    return (
      <div className="flex justify-center py-10">
        <AlertMessage type="error" message="Event not found" />
      </div>
    );
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
      >
        <BackIcon width={20} height={20} />
        Back to Events
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">{event.description}</p>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-gray-500">
          {getDayName(event.start_date)} — {formatTo12HourWithMinutes(event.start_time)}
        </span>
        {event.is_live && (
          <span className="text-red-600 font-semibold">Live</span>
        )}
      </div>

      <div className="relative w-full h-0 pb-[56.25%] mb-6">
        {viewType === 'video' && event.video_url && (
          <iframe
            src={getEmbedUrl(event.video_url)}
            title={event.title}
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        )}
        {viewType === 'audio' && event.audio_url && (
          <iframe
            src={event.audio_url}
            title={event.title}
            allow="autoplay"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
