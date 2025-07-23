
import Image from 'next/image';

export default function NoEvent() {
  return (
    <div className="text-center text-gray-500 py-10 flex flex-col items-center">
      <Image src="/images/event/No-Event.png" alt="No events" width={150} height={150} />
      <p className="mt-4 text-lg font-normal mb-1 font-open-sans">No events Events Yet</p>
      <p className="text-sm font-open-sans">Watch Out for Live Events</p>
    </div>
  );
}
