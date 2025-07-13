'use client';
import ExploreCoursesDetails from '@/components/dashboard/explore/ExploreCoursesDetails';
import Header from '@/layout/dashboard/Header';
import { useParams } from 'next/navigation';

export default function CoursePage() {
  const params = useParams();
  const courseTitle = params?.slug;

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'Explore Courses'} link='/dashboard/explore-courses' />
      <ExploreCoursesDetails courseTitle={courseTitle as string} />
    </div>
  );
}
