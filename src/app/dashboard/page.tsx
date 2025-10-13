import RecommededCourse from '@/components/dashboard/course/RecommededCourse';
import DashboardInfo from '@/components/dashboard/dashboard/DashboardInfo';
import EventCard from '@/components/dashboard/events/EventCard';
import Header from '@/layout/dashboard/Header';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';
import Link from 'next/link';

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
        <div className="flex flex-col-reverse lg:flex-row-reverse gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-black font-lora text-[22px] font-semibold">
                Events
              </h3>
              <Link
                href={'/dashboard/events'}
                className="font-lora font-medium text-sm text-black-100"
              >
                View All
              </Link>
            </div>
            <div>
              <EventCard limit={2} textLimit={100} setPagination={false} />
              {/* <EventCard limit={2} textLimit={25} setPagination={false} /> */}

            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-black font-lora text-[22px] font-semibold">
                Recommended Courses
              </h3>
              <Link
                href={'/dashboard/explore-courses'}
                className="font-lora font-medium text-sm text-black-100"
              >
                View All
              </Link>
            </div>
            <RecommededCourse />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
