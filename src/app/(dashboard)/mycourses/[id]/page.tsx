'use client';
import { useParams } from 'next/navigation';

import CourseDetails from '@/components/dashboard/course/CourseDetails';

export default function LessonPage() {
  const { id } = useParams();

  return <CourseDetails id={id as string} />;
}
