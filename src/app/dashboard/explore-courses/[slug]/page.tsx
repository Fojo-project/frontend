'use client';
import ExploreCoursesDetails from '@/components/dashboard/explore/ExploreCoursesDetails';

import { useParams } from 'next/navigation';

export default function CoursePage() {
  const params = useParams();
  const courseTitle = params?.slug;

  return (
    <div className="flex flex-col gap-6">
      <ExploreCoursesDetails courseTitle={courseTitle as string} />
    </div>
  );
}
