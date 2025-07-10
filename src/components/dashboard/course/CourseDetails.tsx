'use client';
import React from 'react';
import CourseTabs from './CourseTabs';
import { useCourseQuery } from '@/store/dashboard/dashboard.api';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import MediaPlayer from '@/components/ui/video/MediaPlayer';

interface CourseDetailProps {
  courseTitle: string;
}

export default function CourseDetail({ courseTitle }: CourseDetailProps) {
  const { data, isLoading, isError } = useCourseQuery({ course: courseTitle });
  const response = data?.data;
  console.log(response);

  let bgColor = '';
  const lowerTitle = courseTitle.toLowerCase();
  if (lowerTitle === 'foundations') bgColor = 'backfill';
  else if (lowerTitle === 'ministry') bgColor = 'backfillMin';
  else if (lowerTitle === 'discipleship') bgColor = 'backfilDisp ';
  else bgColor = 'backfill';
  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-6">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="w-full ">
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
    <div className="flex flex-col gap-4">
      <section
        className={`rounded-xl p-6 text-white relative overflow-hidden ${bgColor}`}
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl capitalize font-lora font-medium">
              {response?.slug}
            </h1>
            <p className="mt-2 text-sm w-[296px]">{response?.description}</p>

            <div className="mt-4 text-sm space-y-2">
              <p>
                Number of Lessons:
                <span
                  className="ml-4 px-2 py-1 rounded"
                  style={{ backgroundColor: response?.color_code || '#cccccc' }} // fallback color
                >
                  {response?.lesson_count} Lesson
                  {response?.lesson_count !== 1 ? 's' : ''}
                </span>
              </p>
              <p>
                Total Lesson Length:
                <span
                  className="ml-3 px-2 py-1 rounded "
                  style={{ backgroundColor: response?.color_code || '#cccccc' }} // fallback color
                >
                  2hrs
                </span>
              </p>
            </div>
          </div>

          <div className="hidden md:flex">
            <div className="w-[200px] h-[120px] rounded-lg overflow-hidden bg-black">
              <MediaPlayer url={response?.course_video ?? ''} />
            </div>
          </div>
        </div>
      </section>

      {response && (
        <CourseTabs
          courseData={{
            about_course: response.about_course,
            lessons: response.lessons.map((lesson) => ({
              id: lesson.slug,
              slug: lesson.slug,
              title: lesson.title,
              lesson_order: lesson.lesson_order,
              status: false,
              lesson_note: lesson.lesson_note,
            })),
          }}
        />
      )}
    </div>
  );
}
