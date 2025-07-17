import CourseDetails from '@/components/dashboard/course/CourseDetails';
import Header from '@/layout/dashboard/Header';
import { generateMetadata as generateCourseMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

type Props = {
  params: {
    course: string;
  };
}
export function generateMetadata({ params }: Props): Metadata {
  const courseTitle = decodeURIComponent(params.course);

  return generateCourseMetadata({
    title: `FOJO | Dashboard - My Course - ${courseTitle}`,
    description: `Details and content for course "${courseTitle}" on FOJO.`,
    url: `/dashboard/my-courses/${params.course}`,
  });
}

export default function CoursePage({ params }: Props) {
  const courseTitle = params?.course;

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} link='/dashboard/my-courses' />
      <CourseDetails courseTitle={courseTitle as string} />
    </div>
  );
}
