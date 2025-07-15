import { BackIcon, DownloadIcon } from '@/assets/icons';
import Cards from '@/components/ui/cards/Cards';
import Image from 'next/image';
import Link from 'next/link';
import Foundation from '../../../../public/images/home/Foundations.png';
import Button from '@/components/ui/button/Button';
import { useMarkLessonMutation, useShowALessonQuery } from '@/store/dashboard/dashboard.api';
import { downloadTextFile } from '@/utils/helper';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import MediaPlayer from '@/components/ui/video/MediaPlayer';
import { useParams } from 'next/navigation';
import useToastify from '@/hooks/useToastify';
import Alert from '@/components/ui/alert/Alert';
import AlertMessage from '@/components/common/AlertMessage';

interface CourseDetailsProps {
  lesson: string;
}

export default function LessonDetails({ lesson }: CourseDetailsProps) {
  const { data, isLoading, isError, refetch } = useShowALessonQuery({ lesson });
  const { showToast } = useToastify();
  const [markLesson] = useMarkLessonMutation();
  const response = data?.data;
  const params = useParams();
  const courseSlug = params?.course;

  const handleLessonComplete = async () => {
    const lessonSlug = response?.lesson?.slug;
    if (!lessonSlug) return;
    try {
      const res = await markLesson({ lesson: lessonSlug }).unwrap();
      showToast(res?.message || 'Lesson completed successfully', 'success');
      // Trigger background refetch to update the lesson data
      refetch();
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
            className={`${idx % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'
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
        <Link href={`/dashboard/my-courses`}>
          <span className="flex items-center gap-1 hover:underline text-gray-500">
            <BackIcon width={20} height={20} />
            My Courses
          </span>
        </Link>
        {' / '}
        <Link href={`/dashboard/my-courses/${courseSlug}`}>
          <span className="flex items-center gap-1 hover:underline text-gray-500">
            {courseSlug}
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
          <Cards className="flex mt-2 max-h-[360px] flex-col gap-3 custom-scrollbar overflow-y-auto">
            {response &&
              response.next_lessons &&
              response.next_lessons.length > 0 ? (
              response.next_lessons.map((nextLesson, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${index !== response.next_lessons.length - 1
                    ? 'border-b-2 border-b-gray-200 pb-2'
                    : ''
                    }`}
                >
                  <div className='w-[85px] h-[85px]'>
                    <Image
                      src={Foundation}
                      alt=""
                      className="w-[65px] h-[65px] rounded-[5px] object-cover"
                    />
                  </div>
                  <div className='w-full'>
                    <Link href={`/dashboard/my-courses/${courseSlug}/lesson/${nextLesson?.slug}`}>
                      <div
                        className="flex-1/3 cursor-pointer flex-col flex items-start gap-2"
                      >
                        <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
                          Lesson {nextLesson.lesson_order}.
                        </span>
                        <h3 className="font-medium font-lora text-sm text-black-100 dark:text-white">
                          {nextLesson.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <AlertMessage type='info' message='No next lessons available.' />
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
          <h3 className="dark:text-white Lora">
            {response?.lesson?.lesson_content}
          </h3>
        </Cards>
        <Cards className="flex-1/3 font-open-sans h-[400px]  no-scrollbar overflow-y-auto">
          <div className="gap-6 mb-4 flex justify-between border-b-2  border-gray-200 py-2  top-0  dark:bg-black z-10 ">
            <h1 className="lg:text-[18px] md:text-[14px] font-bold dark:text-white mt-1">Lesson Note</h1>
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
              <h3 className="font-semibold text-xs">Download Note</h3>
            </Button>
          </div>
          <h3 className="p-2 font-lora text-sm">
            {response?.lesson?.lesson_note}
          </h3>
        </Cards>
      </div>
    </div>
  );
}
