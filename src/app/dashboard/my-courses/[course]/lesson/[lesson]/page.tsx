import LessonDetails from '@/components/dashboard/course/LessonDetails';
import Header from '@/layout/dashboard/Header';
import { generateMetadata as generateCourseMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

type Props = {
  params: {
    lesson: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const lessonTitle = decodeURIComponent(params.lesson);

  return generateCourseMetadata({
    title: `FOJO | Dashboard - Lesson - ${lessonTitle}`,
    description: `Details and content for lesson "${lessonTitle}"  on FOJO.`,
    url: `/dashboard/my-courses`,
  });
}

export default function page({ params }: Props) {
  const lessonTitle = params?.lesson;

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} link='/dashboard/my-courses' />
      <LessonDetails lesson={lessonTitle} />
    </div>
  );
}
