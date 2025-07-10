import CourseCard from '@/components/dashboard/course/CourseCard';
import Header from '@/layout/dashboard/Header';

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} />
      <CourseCard />
    </div>
  );
}
