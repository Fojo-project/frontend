'use client';
import LessonDetails from '@/components/dashboard/course/LessonDetails';
import Header from '@/layout/dashboard/Header';
import { useParams } from 'next/navigation';
import React from 'react';

export default function page() {
  const params = useParams();
  const courseTitle = params?.lesson;

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} link='/dashboard/my-courses' />
      <LessonDetails lesson={courseTitle} />
    </div>
  );
}
