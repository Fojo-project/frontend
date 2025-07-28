import { generateMetadata as generateCourseMetadata } from "@/utils/metadata";
import { Metadata } from "next";
import CourseClientPage from "../../../../components/dashboard/course/courseClientPage";

interface PageProps {
  params: Promise<{ course: string; }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const courseTitle = decodeURIComponent((await params).course ?? '');
  return generateCourseMetadata({
    title: `FOJO | Dashboard - My Course - ${courseTitle}`,
    description: `Details and content for course "${courseTitle}" on FOJO.`,
    url: `/dashboard/my-courses/${courseTitle}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { course } = await params;
  const courseTitle = decodeURIComponent(course ?? '');
  return <CourseClientPage courseParam={courseTitle} />;
}
