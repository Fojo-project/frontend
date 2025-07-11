import { BackIcon, DownloadIcon } from '@/assets/icons';
import Cards from '@/components/ui/cards/Cards';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Foundation from '../../../../public/images/home/Foundations.png';
import Button from '@/components/ui/button/Button';
import {
  useMarkLessonMutation,
  useShowALessonQuery,
} from '@/store/dashboard/dashboard.api';
import { downloadTextFile } from '@/utils/downloadTextFileFromResponse';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import MediaPlayer from '@/components/ui/video/MediaPlayer';
import { useRouter } from 'next/navigation';
import useToastify from '@/hooks/useToastify';

interface CourseDetailsProps {
  lesson: string;
}

export default function LessonDetails({ lesson }: CourseDetailsProps) {
  const { data, isLoading, isError } = useShowALessonQuery({ lesson });
  const { showToast } = useToastify();
  const [markLesson] = useMarkLessonMutation();
  const response = data?.data;
  const router = useRouter();

  const handleLessonComplete = async () => {
    const lessonSlug = response?.lesson?.slug;
    if (!lessonSlug) return;
    try {
      const res = await markLesson({ lesson: lessonSlug }).unwrap();
      showToast(res?.message || 'Lesson completed successfully', 'success');
    } catch (error) {
      showToast(
        (error as { message?: string })?.message ||
          'check your network conection',
        'error'
      );
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className={`${
              idx % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'
            } w-full`}
          >
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
    <div className=" flex flex-col font-lora gap-7">
      <div className="text-sm flex font-open-sans gap-2 text-gray-600">
        <Link href="/dashboard/my-courses">
          <span className="flex items-center gap-1 hover:underline text-gray-500">
            <BackIcon width={20} height={20} />
            Explore Courses
          </span>
        </Link>
        {' / '}
        <span className="capitalize text-black-100 dark:text-white">
          Lesson {response?.lesson.lesson_order} {''}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-2/3 h-full ">
          <MediaPlayer
            onEnded={handleLessonComplete}
            url={response?.lesson?.lesson_video ?? ''}
          />
        </div>
        <div className="flex-1/3  gap-2 -mt-2 flex-col">
          <h3 className="font-medium text-black-100 dark:text-white">
            Next Lesson
          </h3>
          <Cards className="flex max-h-[320px] flex-col gap-3  no-scrollbar overflow-y-auto">
            {response &&
            response.next_lessons &&
            response.next_lessons.length > 0 ? (
              response.next_lessons.map((nextLesson, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 ${
                    index !== response.next_lessons.length - 1
                      ? 'border-b-2 border-b-gray-200 pb-2'
                      : ''
                  }`}
                >
                  <Image
                    src={Foundation}
                    alt=""
                    className="w-[65px] h-full rounded-[5px] object-cover"
                  />
                  <div
                    onClick={() => {
                      router.push(
                        `/dashboard/my-courses/lesson/${nextLesson.slug}`
                      );
                    }}
                    className="flex-1/3 cursor-pointer flex-col flex items-start gap-2"
                  >
                    <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
                      Lesson {nextLesson.lesson_order}.
                    </span>
                    <h3 className="font-medium text-sm text-black-100 dark:text-white">
                      {nextLesson.title}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">
                No next video available.
              </p>
            )}
          </Cards>
        </div>
      </div>
      <div className="flex flex-col h-auto md:flex-row gap-4 ">
        <Cards className="flex-2/3 flex flex-col gap-4 h-[400px] hide-scrollbar no-scrollbar overflow-y-auto">
          <div className="gap-2 flex flex-col border-b-2 border-gray-200  p-2">
            <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
              Lesson {response?.lesson?.lesson_order} {''}
            </span>
            <h1 className="text-2xl font-bold dark:text-white">
              {response?.lesson?.title}
            </h1>
          </div>
          <h3 className="dark:text-white">
            {response?.lesson?.lesson_content}
          </h3>
        </Cards>
        <Cards className="flex-1/3 font-open-sans h-[400px]  no-scrollbar overflow-y-auto">
          <div className="gap-2 mb-4 flex justify-between border-b-2  border-gray-200 p-2 top-0 bg-white dark:bg-black z-10">
            <h1 className="text-2xl font-bold dark:text-white">Lesson Note</h1>
            <Button
              variant="outline"
              onClick={() =>
                downloadTextFile(
                  response?.lesson?.lesson_note ?? '',
                  `${response?.lesson?.title
                    .toLowerCase()
                    .replace(/\s+/g, '_')}_note.txt`
                )
              }
              rightIcon={<DownloadIcon width={14} height={14} />}
            >
              <h3 className="font-semibold text-sm">Download Note</h3>
            </Button>
          </div>
          <h3 className="p-2">{response?.lesson?.lesson_note}</h3>
        </Cards>
      </div>
    </div>
  );
}
