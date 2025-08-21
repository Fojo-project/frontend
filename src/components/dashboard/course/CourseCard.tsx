'use client';
import CoursesList from '@/components/common/CoursesList';
import NoResource from '@/components/common/NoResource';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import NetworkErrorAlert from '@/components/common/NetworkErrorAlert';
import { useAllCoursesQuery } from '@/store/dashboard/dashboard.api';
import React from 'react';
import book from '../../../../public/images/home/book.png';

export default function CourseCard() {
  const { data, isLoading, isError } = useAllCoursesQuery();
  if (isLoading || isError) {
    return isLoading ? (
      <div className="flex flex-wrap gap-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="w-full md:w-[48%]">
            <CardSkeleton />
          </div>
        ))}
      </div>
    ) : (
      <NetworkErrorAlert
        error={isError}
        showRetryButton={true}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <NoResource
          title="No Lessons Yet"
          subtitle="No Lessons Yet Start creating shipments"
          icon={book}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        {data?.data?.map((course, index) => (
          <div key={index} className="w-full md:w-[48%]">
            <CoursesList
              type="my-courses"
              title={course?.title}
              description={course?.description}
              completed={course?.lesson_progress?.completed_lessons || 0}
              courseImage={course?.course_image}
              lessons={course?.lesson_count || 0}
              route={`/dashboard/my-courses/${course?.slug || course?.title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
