'use client';
import NoResource from '@/components/common/NoResource';
import React, { useEffect } from 'react';
import book from '../../../../public/images/home/book.png';
import Link from 'next/link';
import { Arrow } from '@/assets/icons';
import Image from 'next/image';
import { useExploreCoursesQuery } from '@/store/dashboard/dashboard.api';
import EventSkeleton from '@/components/ui/skeleton/EventSkeleton';

export default function RecommededCourse() {
  const { data, isLoading, isError, refetch } = useExploreCoursesQuery();
  console.log('data', data);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="w-full ">
            <EventSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading courses</div>;
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
    <div className="flex flex-col gap-4">
      {data?.data?.slice(0, 2).map((course, index) => (
        <div
          key={index}
          className="relative flex items-start gap-4 w-full rounded-xl border  border-gray-200 p-6 bg-white hover:shadow-md transition duration-200 group"
        >
          <div className="relative w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src={course?.course_image}
              alt={'recommendation'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className=" ">
            <div className="flex justify-between ">
              <h3 className="text-[22px] capitalize font-bold text-gray-900 font-cormorant">
                {course?.title}
              </h3>
              <p></p>
            </div>
            <p className="text-sm leading-5 text-[#555555] line-clamp-2 font-lora text-[16px]">
              {course?.description}
            </p>
            <div className="mt-2 w-full">
              {course?.isStarted ? (
                <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-2 w-full">
                  <Link
                    href={`/dashboard/my-courses/${
                      course?.slug || course?.title
                    }`}
                    className="font-lora flex items-center gap-1 font-semibold text-xs"
                  >
                    Continue Course <Arrow width={7} height={8} />
                  </Link>

                  {/* Progress section */}
                  <div className="w-full md:flex-1 flex items-center gap-2">
                    <div className="flex-1 h-[5px] rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-brown-300"
                        style={{
                          width: `${
                            course?.lesson_progress?.percentage_completed ?? 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-brown-300 font-semibold text-[10px] font-open-sans">
                      {course?.lesson_progress?.percentage_completed ?? 0}%
                    </span>
                  </div>
                </div>
              ) : (
                <Link
                  href={`/dashboard/explore-courses/${
                    course?.slug || course?.title
                  }`}
                  className="font-lora flex items-center gap-1 font-semibold text-xs"
                >
                  View Course <Arrow width={7} height={8} />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
