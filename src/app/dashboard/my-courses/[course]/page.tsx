import CourseDetails from '@/components/dashboard/course/CourseDetails';
import Header from '@/layout/dashboard/Header';
import { generateMetadata as generateCourseMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ course: string }>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const courseTitle = decodeURIComponent((await params).course ?? '');

  return generateCourseMetadata({
    title: `FOJO | Dashboard - My Course - ${courseTitle}`,
    description: `Details and content for course "${courseTitle}" on FOJO.`,
    url: `/dashboard/my-courses/${courseTitle}`,
  });
}

export default async function CoursePage({ params }: PageProps) {
  const { course } = await params;
  const courseTitle = decodeURIComponent(course ?? '');

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} link='/dashboard/my-courses' />
      <CourseDetails courseTitle={courseTitle as string} />
    </div>
  );
}
