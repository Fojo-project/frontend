import Header from '@/layout/dashboard/Header';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'FOJO | Dashboard - Home',
  description: 'Dashboard - FOJO',
  url: '/dashboard',
});

export default function DashboardHome() {
  return (
    <div>
      <Header Heading={'Dashboard'} link="/dashboard/explore-courses" />
    </div>
  );
}
