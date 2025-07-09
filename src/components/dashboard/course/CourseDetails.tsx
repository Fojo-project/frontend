import { BackIcon, DownloadIcon } from '@/assets/icons';
import Cards from '@/components/ui/cards/Cards';
import { CourseKey, CourseRouteInfo, Lesson } from '@/data/CourseRouteInfo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import video from '../../../../public/images/home/video.png';
import Foundation from '../../../../public/images/home/Foundations.png';
import Button from '@/components/ui/button/Button';

interface CourseDetailsProps {
  id: string | number;
}

export default function CourseDetails({ id }: CourseDetailsProps) {
  // Find the lesson and its course
  let foundLesson: Lesson | undefined;

  for (const key of Object.keys(CourseRouteInfo) as CourseKey[]) {
    const course = CourseRouteInfo[key];
    const lesson = course.lessons.find((l) => l.id === id);
    if (lesson) {
      foundLesson = lesson;
      break;
    }
  }

  if (!foundLesson) {
    return <div className="p-8">Lesson not found.</div>;
  }

  return (
    <div className=" flex flex-col font-lora gap-7">
      <div className="text-sm flex font-open-sans gap-2 text-gray-600">
        <Link href="/dashboard/my-courses">
          <span className="flex items-center gap-1 hover:underline text-gray-500">
            <BackIcon width={20} height={20} />
            Explore Courses
          </span>
        </Link>
        {' / '}
        <span className="capitalize text-black-100 dark:text-white">
          Lesson{''} {foundLesson.number}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Image src={video} alt="" className="flex-2/3 " />
        <div className="flex-1/3  gap-2 -mt-2 flex-col">
          <h3 className="font-medium text-black-100 dark:text-white">
            Next Lesson
          </h3>
          <Cards className="flex flex-col gap-3">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 ${
                  index !== 1 ? 'border-b-2 border-b-gray-200 pb-2' : ''
                }`}
              >
                <Image
                  src={Foundation}
                  alt=""
                  className="w-[85px] h-full rounded-[5px] object-cover"
                />
                <div className="flex-1/3 flex-col flex items-start gap-2">
                  <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
                    Lesson {index + 1}.
                  </span>
                  <h3 className="font-medium text-sm text-black-100 dark:text-white">
                    You are Spirit!/Your Spirit is Sinless.
                  </h3>
                </div>
              </div>
            ))}
          </Cards>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 ">
        <Cards className="flex-2/3 flex flex-col gap-4">
          <div className="gap-2 flex flex-col border-b-2 border-gray-200  p-2">
            <span className="w-[80px] text-gray-100 flex justify-center font-medium text-[10px] border-2 border-gray-200 rounded-md p-2 bg-gray-25">
              Lesson {foundLesson.number}.
            </span>
            <h1 className="text-2xl font-bold dark:text-white">
              {foundLesson.title}
            </h1>
          </div>
          <h3 className="dark:text-white">
            The Foundations of the Faith course is designed to help you build
            your walk with Jesus on solid, unshakable ground. In a world full of
            spiritual confusion, distractions, and cultural compromise,
            believers need a clear and biblical foundation. Whether you&rsquo;re
            a new believer or someone who&rsquo;s been in the faith, this course
            guides you through the essentials of the Christian life. It&apos;s
            not just knowledge; it&rsquo;s heart transformation.,
          </h3>
        </Cards>
        <Cards className="flex-1/3 font-open-sans">
          <div className="gap-2 flex justify-between border-b-2 border-gray-200  p-2">
            <h1 className="text-2xl font-bold dark:text-white">Lesson Note</h1>
            <Button
              variant="outline"
              rightIcon={<DownloadIcon width={14} height={14} />}
            >
              <h3 className="font-semibold text-sm">Download Note</h3>
            </Button>
          </div>
        </Cards>
      </div>
    </div>
  );
}
