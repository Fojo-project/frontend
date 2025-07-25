import CourseCard from '@/components/dashboard/course/CourseCard';
import Header from '@/layout/dashboard/Header';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({ title: 'FOJO | Dashboard - My Courses', url: '/dashboard/my-courses', description: 'My Courses - FOJO Dashboard' });

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} link='/dashboard/my-courses' />
      <CourseCard />
    </div>
  );
}
