'use client';
import CoursesList from '@/components/common/CoursesList';
<<<<<<< HEAD
=======
import NoResource from '@/components/common/NoResource';
>>>>>>> 1d190d7dbae346af32dd11879de1530b13ee9f2e
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import { useExploreCoursesQuery } from '@/store/dashboard/dashboard.api';
import React from 'react';
import book from '../../../../public/images/home/book.png';

export default function ExploreCourseCard() {
  const { data, isLoading, isError } = useExploreCoursesQuery();
<<<<<<< HEAD

=======
>>>>>>> 1d190d7dbae346af32dd11879de1530b13ee9f2e
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

<<<<<<< HEAD
=======
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <NoResource
          title="No courses"
          subtitle=""
          icon={book}
        />
      </div>
    );
  }

>>>>>>> 1d190d7dbae346af32dd11879de1530b13ee9f2e
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        {data?.data?.map((course, index) => (
          <div key={index} className="w-full md:w-[48%]">
            <CoursesList
              title={course?.title}
              description={course?.description}
<<<<<<< HEAD
              courseImage={course?.course_image}
              lessons={course?.lesson_count || 0}
=======
              completed={course?.lesson_progress?.completed_lessons || 0}
              courseImage={course?.course_image}
              lessons={course?.lesson_count || 0}
              route={`/dashboard/explore-courses/${course?.slug}`}
>>>>>>> 1d190d7dbae346af32dd11879de1530b13ee9f2e
            />
          </div>
        ))}
      </div>
    </div>
  );
}
