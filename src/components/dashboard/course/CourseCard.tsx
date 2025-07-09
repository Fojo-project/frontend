'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CourseRouteInfo, CourseKey } from '@/data/CourseRouteInfo';
import CourseTabs from './CourseTabs';

// Default course key
const DEFAULT_COURSE_KEY: CourseKey = 'foundations';

export default function CourseCard() {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop()?.toLowerCase();

  const isCourseKey = (key: string): key is CourseKey =>
    ['foundations', 'discipleship', 'ministry'].includes(key);

  const courseKey: CourseKey = isCourseKey(lastSegment ?? '')
    ? (lastSegment as CourseKey)
    : DEFAULT_COURSE_KEY;

  const courseData = CourseRouteInfo[courseKey];

  return (
    <div className="flex flex-col gap-4 ">
      <section
        className={`rounded-xl p-6 ${courseData.bgImage}   text-white relative overflow-hidden `}
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-lora font-medium">
              {courseData.title}
            </h1>
            <p className="mt-2 text-sm w-[296px]">{courseData.description}</p>

            <div className="mt-4 text-sm space-y-2">
              <p>
                Number of Lessons:
                <span
                  className={`ml-4 px-2 py-1 rounded ${courseData.badgeColor}`}
                >
                  {courseData.lessons.length} Lesson
                  {courseData.lessons.length !== 1 ? 's' : ''}
                </span>
              </p>
              <p>
                Total Lesson Length:
                <span
                  className={`ml-3 px-2 py-1 rounded ${courseData.badgeColor}`}
                >
                  {courseData.totalDuration}
                </span>
              </p>
            </div>
          </div>

          <div className=" hidden md:flex">
            <div className="w-[200px] h-[120px] rounded-lg overflow-hidden bg-black">
              <Image
                src="/images/sample-video-thumbnail.jpg"
                alt="Course preview"
                width={200}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <CourseTabs courseData={courseData} />
    </div>
  );
}
