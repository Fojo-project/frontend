'use client';
import ExploreCourseCard from '@/components/dashboard/explore/Courses';
import Header from '@/layout/dashboard/Header';

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'Explore Courses'} link='/dashboard/explore-courses' />
      <ExploreCourseCard />
    </div>
  );
}
