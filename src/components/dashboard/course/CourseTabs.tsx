'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Cards from '@/components/ui/cards/Cards';
import Button from '@/components/ui/button/Button';
import { DownloadIcon } from '@/assets/icons';
import { downloadTextFile } from '@/utils/helper';
import Link from 'next/link';

type Lesson = {
  isCompleted?: boolean;
  id: string;
  slug: string;
  title: string;
  lesson_order: number;
  status: boolean;
  lesson_note: string;
};

type CourseData = {
  about_course: string;
  status: boolean;
  lessons: Lesson[];
};

type Props = {
  courseData: CourseData;
};

const TABS = {
  ABOUT: 'about',
  CORE: 'core',
} as const;

type TabKey = keyof typeof TABS;

export default function CourseTabs({ courseData }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('ABOUT');
  const params = useParams();
  const courseTitle = params?.course;

  const renderLesson = (lesson: Lesson, isLast: boolean) => {
    const noteFileName = `${lesson.title.toLowerCase().replace(/\s+/g, '_')}_note.txt`;

    return (
      <div key={lesson.slug} className={`pb-4 ${!isLast ? 'border-b-2 border-b-gray-200' : ''}`}>
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-gray-800">
          {/* Lesson Info */}
          <div className="w-full flex items-center gap-3">
            <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
              Lesson {lesson.lesson_order}.
            </span>
            <Link
              className={`w-full font-medium text-lg ${courseData.status
                ? 'cursor-pointer hover:underline text-black-100 dark:text-white'
                : 'cursor-not-allowed text-gray-400'
                }`}
              href={`/dashboard/my-courses/${courseTitle}/lesson/${lesson.slug}`}
              role="button"
              tabIndex={courseData.status ? 0 : -1}
              aria-disabled={!courseData.status}
            >
              {lesson.title}
            </Link>
          </div>

          {/* Actions */}
          <div className="w-full flex items-center justify-end gap-2 font-open-sans">
            <Button
              variant="outline"
              disabled={!courseData.status}
              onClick={() => downloadTextFile(lesson.lesson_note, noteFileName)}
              rightIcon={<DownloadIcon width={14} height={14} className="dark:text-white text-gray-100" />}
            >
              <span className="font-semibold text-sm dark:opacity-60 text-gray-100">Download Note</span>
            </Button>

            <Button
              variant={lesson.isCompleted ? 'primary' : 'outline'}
              disabled={!courseData.status}
              className="px-10 py-4 text-xs bg-gray-300 text-gray-400 border border-gray-300 cursor-default"
            >
              Watched
            </Button>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {/* Tab Controls */}
      <div className="flex space-x-6 border-b">
        {Object.entries(TABS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as TabKey)}
            className={`pb-2 transition-all dark:text-white ${activeTab === key
              ? 'font-semibold  border-black-100'
              : 'text-gray-600 font-semibold'
              }`}
          >
            {label === 'about' ? 'About Course' : 'Core Courses'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 font-lora">
        <Cards>
          {activeTab === 'ABOUT' && (
            <section className="flex flex-col gap-2">
              <h3 className="border-b pb-2 border-gray-200 font-semibold lora">About The Course</h3>
              <p className="whitespace-pre-line text-sm">{courseData.about_course}</p>
            </section>
          )}

          {activeTab === 'CORE' && (
            <section className="space-y-3">
              {courseData.lessons.map((lesson, index) =>
                renderLesson(lesson, index === courseData.lessons.length - 1)
              )}
            </section>
          )}
        </Cards>
      </div>
    </div>
  );
}