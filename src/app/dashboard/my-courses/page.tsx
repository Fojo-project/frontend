import CourseCard from '@/components/dashboard/course/CourseCard';
import Header from '@/layout/dashboard/Header';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col gap-3">
      <Header Heading="My Courses" />
      <CourseCard />
    </div>
  );
}
