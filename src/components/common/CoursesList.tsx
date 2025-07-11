'use client';
import { formatText } from '@/utils/textFormatter';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CoursesListProps {
  title: string;
  description: string;
  lessons: number;
  courseImage: string;
}

export default function CoursesList({
  title,
  description,
  lessons,
}: // courseImage,
CoursesListProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/dashboard/my-courses/${title}`);
  };
  return (
    <div className="bg-gray-25 border-1 h-full border-gray-200 rounded-lg  overflow-hidden flex flex-col">
      <Image
        src="/images/home/disciple-large.png"
        alt={title}
        width={800}
        height={192} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between bg-[#F9F9F9]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold capitalize font-lora">
              {title}
            </h3>
            <span className="text-xs bg-gray-300 text-gray-100 px-2 py-1.5 rounded-sm font-lora">
              {lessons} Lesson{lessons === 1 ? '' : 's'}
            </span>
          </div>
          <p className="text-sm mt-2 text-black-100 font-lora">
            {' '}
            {formatText(description, { limitWords: 30, suffix: '...' })}
          </p>
        </div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          className="mt-3 text-[14px] text-black font-medium"
        >
          View Course →
        </a>
      </div>
    </div>
  );
}
