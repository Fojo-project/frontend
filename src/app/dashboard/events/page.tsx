// app/dashboard/events/page.tsx or pages/dashboard/events.tsx

import Header from '@/layout/dashboard/Header';
import EventTabs from '../../../components/dashboard/events/EventTabs';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'FOJO | Dashboard - Events',
  url: '/dashboard/events',
  description: 'Events - FOJO Dashboard',
});

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header Heading="Events" link="/dashboard/events" />
      <EventTabs />
    </div>
  );
}
