import ExploreCoursesDetails from '@/components/dashboard/explore/ExploreCoursesDetails';

import { generateMetadata as generateCourseMetadata } from '@/utils/metadata';
import { Metadata } from 'next';


interface PageProps {
  params: Promise<{ course: string }>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const courseTitle = decodeURIComponent((await params).course ?? '');

  return generateCourseMetadata({
    title: `FOJO | Dashboard - Explore Courses - ${courseTitle}`,
    description: `Details and content for course "${courseTitle}" on FOJO.`,
    url: `/dashboard/explore-courses/${courseTitle}`,
  });
}


export default async function CoursePage({ params }: PageProps) {
  const { course } = await params;
  const courseTitle = decodeURIComponent(course ?? '');

  return (
    <div className="flex flex-col gap-6">
      <ExploreCoursesDetails courseTitle={courseTitle as string} />
    </div>
  );
}
