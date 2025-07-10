'use client';
import { useParams } from 'next/navigation';

import CourseDetails from '@/components/dashboard/course/CourseDetails';
import Header from '@/layout/dashboard/Header';

export default function LessonPage() {
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-3">
      <Header Heading="My Courses" />
      <CourseDetails id={id as string} />
    </div>
  );
}
