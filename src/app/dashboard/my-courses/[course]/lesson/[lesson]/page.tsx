import LessonDetails from '@/components/dashboard/course/LessonDetails';
import Header from '@/layout/dashboard/Header';
import { generateMetadata as generateCourseMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ course: string; lesson: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const courseTitle = decodeURIComponent((await params).course ?? '');
  const lessonTitle = decodeURIComponent((await params).lesson ?? '');

  return generateCourseMetadata({
    title: `FOJO | Dashboard – ${courseTitle} – ${lessonTitle}`,
    description: `Lesson "${lessonTitle}" from the course "${courseTitle}" on FOJO.`,
    url: `/dashboard/my-courses/${courseTitle}/lesson/${lessonTitle}`,
  });
}

export default async function Page({ params }: PageProps) {
  const lessonTitle = decodeURIComponent((await params).lesson ?? "");

  return (
    <div className="flex flex-col gap-6">
      <Header Heading="My Courses" link="/dashboard/my-courses" />
      <LessonDetails lesson={lessonTitle} />
    </div>
  );
}