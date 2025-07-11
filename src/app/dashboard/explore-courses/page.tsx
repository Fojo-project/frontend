'use client';
import CoursesList from '@/components/common/CoursesList';
import Header from '@/layout/dashboard/Header';

const courses = [
  {
    title: 'Foundations',
    description:
      'Start your journey with core teachings on salvation, prayer, and Scripture.',
    lessons: 4,
    courseImage: '/images/home/disciple-large.png',
  },
  {
    title: 'Discipleship',
    description: 'Grow in daily obedience and intimacy with Christ.',
    lessons: 5,
    courseImage: '/images/home/disciple-large.png',
  },
  {
    title: 'Ministry',
    description: 'Serve others with clarity and purpose.',
    lessons: 4,
    courseImage: '/images/home/disciple-large.png',
  },
  {
    title: 'Leadership',
    description: 'Lead with courage, humility, and wisdom.',
    lessons: 6,
    courseImage: '/images/home/disciple-large.png',
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Header Heading="Explore Courses" />
      <div className="flex flex-wrap gap-6">
        {courses.map((course, index) => (
          <div key={index} className="w-full md:w-[48%]">
            <CoursesList {...course} />
          </div>
        ))}
      </div>
    </div>
  );
}
