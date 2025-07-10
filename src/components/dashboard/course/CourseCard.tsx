'use client';
import CoursesList from '@/components/common/CoursesList';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import { useAllCoursesQuery } from '@/store/dashboard/dashboard.api';
import React from 'react';

export default function CourseCard() {
  const { data, isLoading, isError } = useAllCoursesQuery();

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="w-full md:w-[48%]">
            <CardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading courses</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        {data?.data?.map((course, index) => (
          <div key={index} className="w-full md:w-[48%]">
            <CoursesList
              title={course?.title}
              description={course?.description}
              courseImage={course?.course_image}
              lessons={course?.lesson_count || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
