import { generateMetadata as generateCourseMetadata } from "@/utils/metadata";
import { Metadata } from "next";
import CourseClientPage from "../../../../components/dashboard/course/courseClientPage";

interface PageProps {
  params: { course: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const courseTitle = decodeURIComponent(params.course ?? '');
  return generateCourseMetadata({
    title: `FOJO | Dashboard - My Course - ${courseTitle}`,
    description: `Details and content for course "${courseTitle}" on FOJO.`,
    url: `/dashboard/my-courses/${courseTitle}`,
  });
}

export default async function Page({ params }: PageProps) {
  return <CourseClientPage courseParam={params.course} />;
}
