'use client';
import LessonDetails from '@/components/dashboard/course/LessonDetails';
import Header from '@/layout/dashboard/Header';
import { useParams } from 'next/navigation';
import React from 'react';

export default function page() {
  const params = useParams();
  const courseTitle = params?.slug;

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} />
      <LessonDetails lesson={courseTitle} />
    </div>
  );
}
