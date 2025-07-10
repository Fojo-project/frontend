import React from 'react';
import { useRouter } from 'next/navigation';
import Cards from '@/components/ui/cards/Cards';
import Button from '@/components/ui/button/Button';
import { DownloadIcon } from 'lucide-react';
import { downloadTextFile } from '@/utils/downloadTextFileFromResponse';

type Lesson = {
  id: string;
  slug: string;
  title: string;
  lesson_order: number;
  status: boolean;
  lesson_note: string;
};

type CourseData = {
  about_course: string;
  lessons: Lesson[];
};

type Props = {
  courseData: CourseData;
};

export default function CourseTabs({ courseData }: Props) {
  const [activeTab, setActiveTab] = React.useState<'about' | 'core'>('core');
  const router = useRouter();

  return (
    <div className="mt-4">
      {/* Tab headers */}
      <div className="flex space-x-6 border-b">
        <button
          onClick={() => setActiveTab('about')}
          className={`pb-2 transition-all dark:text-white ${
            activeTab === 'about'
              ? 'font-semibold border-b-2 border-black-100'
              : 'text-gray-600'
          }`}
        >
          About Course
        </button>

        <button
          onClick={() => setActiveTab('core')}
          className={`pb-2 transition-all dark:text-white ${
            activeTab === 'core'
              ? 'font-semibold border-b-2 border-black-100'
              : 'text-gray-600'
          }`}
        >
          Core Courses
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-4 font-lora">
        <Cards>
          {activeTab === 'about' && (
            <div className="flex flex-col gap-2">
              <h3 className="border-b pb-2 border-gray-200">
                About The Course
              </h3>
              <p className="whitespace-pre-line text-sm">
                {courseData.about_course}
              </p>
            </div>
          )}

          {activeTab === 'core' && (
            <div className="space-y-3">
              {courseData.lessons.map((lesson, index) => {
                const isLast = index === courseData.lessons.length - 1;
                return (
                  <div key={lesson.slug}>
                    <div
                      className={`flex items-center flex-col md:flex-row gap-3 text-sm text-gray-800 pb-4 ${
                        !isLast ? 'border-b-2 border-b-gray-200' : ''
                      }`}
                    >
                      <div className="w-full flex items-center gap-3">
                        <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
                          Lesson {lesson.lesson_order}.
                        </span>
                        <span
                          className="w-full dark:text-white font-medium text-xl text-black-100 cursor-pointer hover:underline "
                          onClick={() => {
                            router.push(
                              `/dashboard/my-courses/lesson/${lesson.slug}`
                            );
                          }}
                          role="button"
                          tabIndex={lesson.status ? 0 : -1}
                        >
                          {lesson.title}
                        </span>
                      </div>
                      <div className="w-full flex items-center font-open-sans justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            downloadTextFile(
                              lesson?.lesson_note,
                              `${lesson.title
                                .toLowerCase()
                                .replace(/\s+/g, '_')}_note.txt`
                            )
                          }
                          rightIcon={
                            <DownloadIcon
                              width={14}
                              height={14}
                              className="dark:text-white"
                            />
                          }
                        >
                          <h3 className="font-semibold text-sm dark:opacity-60">
                            Download Note
                          </h3>
                        </Button>
                        <Button
                          variant={'primary'}
                          className="px-10 py-4 text-xs"
                        >
                          Watched
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Cards>
      </div>
    </div>
  );
}
