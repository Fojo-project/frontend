import DashboardInfo from '@/components/dashboard/dashboard/DashboardInfo';
import DashboardPrograms from '@/components/dashboard/dashboard/DashboardPrograms';
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
    <div className="flex flex-col gap-6">
      <Header Heading={'Dashboard'} link="/dashboard" />
      <div className=" flex flex-col gap-[56px]">
        <DashboardInfo />
        <DashboardPrograms />
      </div>
    </div>
  );
}
