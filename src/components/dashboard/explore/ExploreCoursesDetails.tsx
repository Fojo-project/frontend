'use client';
import {
  useCourseQuery,
  useStartCourseMutation,
} from '@/store/dashboard/dashboard.api';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { formatDuration } from '@/utils/helper';
import ExploreCourseTabs from './ExploreCourseTabs';
import Header from '@/layout/dashboard/Header';
import NetworkErrorAlert from '@/components/common/NetworkErrorAlert';

interface CourseDetailProps {
  courseTitle: string;
}

export default function ExploreCoursesDetails({
  courseTitle,
}: CourseDetailProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useCourseQuery({ course: courseTitle });
  const [startCourse, { isLoading: isStarting }] = useStartCourseMutation();
  const response = data?.data;

  const handleStartCourse = async () => {
    await startCourse({ course: courseTitle }).unwrap();
    router.push(`/dashboard/my-courses/${courseTitle}`);
  };

  const lowerTitle = courseTitle.toLowerCase();
  if (isLoading || isError) {
    return isLoading ? (
      <div className="flex flex-wrap gap-6">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="w-full gap-y-5">
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
  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <Header Heading={'Explore Courses'} link="/dashboard/explore-courses" />
      </div>
      <section
        className={`rounded-xl p-6 text-white relative overflow-hidden md:overflow-visible ${lowerTitle || 'foundations'
          }`}
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl capitalize font-lora font-medium">
              {response?.slug}
            </h1>
            <p className="mt-2 text-sm w-full max-w-xl lora">
              {response?.description}
            </p>

            <div className="mt-4 text-sm space-y-2">
              <p className="mb-4">
                Number of Lessons:
                <span
                  className="ml-4 px-2 py-1 rounded"
                  style={{ backgroundColor: response?.color_code || '#cccccc' }}
                >
                  {response?.lesson_progress?.total_lessons} Lesson
                  {Number(response?.lesson_progress?.total_lessons) > 1
                    ? 's'
                    : ''}
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
            <div className="mt-6 md:sticky md:flex hidden md:top-4 md:z-30">
              <Button
                variant={'primary'}
                onClick={() =>
                  response?.isStarted
                    ? router.push(`/dashboard/my-courses/${courseTitle}`)
                    : handleStartCourse()
                }
                disabled={isStarting}
                className="px-8 py-4 text-base shadow-lg"
                isLoading={isStarting}
                aria-label="Get started with this course"
              >
                {response?.isStarted ? 'Continue Course' : 'Get Started'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {response && (
        <ExploreCourseTabs
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
      <Button
        variant={'primary'}
        onClick={() =>
          response?.isStarted
            ? router.push(`/dashboard/my-courses/${courseTitle}`)
            : handleStartCourse()
        }
        disabled={isStarting}
        className="px-8 hidden md:flex max-w-xs py-4 text-base shadow-lg"
        isLoading={isStarting}
        aria-label="Get started with this course"
      >
        {response?.isStarted ? 'Continue Course' : 'Get Started'}
      </Button>
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-white/90 dark:bg-black/70 backdrop-blur border-t border-gray-200">
        <Button
          variant={'primary'}
          onClick={() =>
            response?.isStarted
              ? router.push(`/dashboard/my-courses/${courseTitle}`)
              : handleStartCourse()
          }
          disabled={isStarting}
          className="w-full py-3 text-sm"
          isLoading={isStarting}
          aria-label="Get started with this course"
        >
          {response?.isStarted ? 'Continue Course' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
}
