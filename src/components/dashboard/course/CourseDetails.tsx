'use client';
import React from 'react';
import CourseTabs from './CourseTabs';
import { useCourseQuery } from '@/store/dashboard/dashboard.api';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import MediaPlayer from '@/components/ui/video/MediaPlayer';
import { formatDuration } from '@/utils/helper';

interface CourseDetailProps {
  id?: string;
  courseTitle: string;
}

export default function CourseDetail({ courseTitle }: CourseDetailProps) {
  const { data, isLoading, isError } = useCourseQuery({ course: courseTitle });
  const response = data?.data;

  const lowerTitle = courseTitle.toLowerCase();

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
        className={`rounded-xl p-6 text-white relative overflow-hidden ${lowerTitle || 'foundations'
          }`}
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl capitalize font-lora font-medium">
              {response?.slug}
            </h1>
            <p className="mt-2 text-sm w-[296px] font-lora">{response?.description}</p>

            <div className="mt-4 text-sm space-y-2">
              <p className='mb-4'>
                Number of Lessons:
                <span
                  className="ml-4 px-2 py-1 rounded"
                  style={{ backgroundColor: response?.color_code || '#cccccc' }}
                >
                  {response?.lesson_progress?.completed_lessons} /{' '}
                  {response?.lesson_progress?.total_lessons} Lesson
                  {response?.total_lesson !== 1 ? 's' : ''}
                </span>
              </p>
              <p>
                Total Lesson Length:
                <span
                  className="ml-3 px-2 py-1 rounded "
                  style={{ backgroundColor: response?.color_code || '#cccccc' }}
                >
                  {formatDuration(response?.total_lessons_duration ?? 0)}
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
            status: response.isStarted,
            lessons: response.lessons.map((lesson) => ({
              id: lesson.slug,
              slug: lesson.slug,
              title: lesson.title,
              lesson_order: lesson.lesson_order,
              status: false,
              lesson_note: lesson.lesson_note,
              isCompleted: lesson.isCompleted ?? false,
            })),
          }}
        />
      )}
    </div>
  );
}
