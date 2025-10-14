'use client';
import { useState } from 'react';
import Cards from '@/components/ui/cards/Cards';

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

export default function ExploreCourseTabs({ courseData }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('ABOUT');

  const renderLesson = (lesson: Lesson, isLast: boolean) => {
    return (
      <div
        key={lesson.slug}
        className={`pb-4 ${!isLast ? 'border-b-2 border-b-gray-200' : ''}`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-sm text-gray-800">
          {/* Lesson Info */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
            <span className="w-[80px]  flex justify-center font-medium text-[13px]  rounded-md p-2 bg-gray-25">
              Lesson {lesson.lesson_order}.
            </span>
            <div
              className="w-full font-medium text-lg cursor-pointer hover:underline text-black-10e0 dark:text-white"
              role="button"
              tabIndex={courseData.status ? 0 : -1}
              aria-disabled={courseData.status}
            >
              {lesson.title}
            </div>
          </div>

          {/* Actions */}
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
            className={`pb-2 transition-all dark:text-white ${
              activeTab === key
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
              <h3 className="border-b pb-2 border-gray-200 font-semibold lora">
                About The Course
              </h3>
              <p className="whitespace-pre-line text-sm">
                {courseData.about_course}
              </p>
            </section>
          )}

          {activeTab === 'CORE' && (
            <section className="space-y-3 max-h-[400px] md:max-h-[300px] overflow-y-auto">
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
