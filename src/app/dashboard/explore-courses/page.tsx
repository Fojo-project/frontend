import ExploreCourseCard from '@/components/dashboard/explore/Courses';
import Header from '@/layout/dashboard/Header';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({ title: 'FOJO | Dashboard - Explore Courses', url: '/dashboard/explore-courses', description: 'Explore Courses - FOJO Dashboard' });

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'Explore Courses'} link='/dashboard/explore-courses' />
      <ExploreCourseCard />
    </div>
  );
}
