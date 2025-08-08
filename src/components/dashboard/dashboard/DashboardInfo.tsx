'use client';
import Cards from '@/components/ui/cards/Cards';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dashboardImage from '../../../../public/images/home/homeimage.png';
import { Duration, getGreeting, truncateText } from '@/utils/helper';
import {
  Arrow,
  CertificateIcon,
  CompletedIcon,
  HourseSpentIcon,
  OngoingIcon,
} from '@/assets/icons';
import Link from 'next/link';
import { BibleVerse } from '@/store/bible/bibleApi';
import { loadVerse } from '@/utils/loadVerse';
import { useDashboardQuery } from '@/store/dashboard/dashboard.api';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import DashboardSkeleton from '@/components/ui/skeleton/DashboardSkeleton';

export default function DashboardInfo() {
  const { data, refetch, isLoading } = useDashboardQuery();
  const userDetails = useSelector((state: RootState) => state.profile.user);
  const user = data?.data;
  const hasOngoingCourses = (user?.ongoing_course ?? 0) > 0;
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAndSetVerse = async () => {
    setLoading(true);
    const data = await loadVerse();
    if (data) setVerse(data);
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    fetchAndSetVerse();
    const interval = setInterval(fetchAndSetVerse, 2 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading)
    return (
      <div className="w-full ">
        <DashboardSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="flex-2/3 w-full h-full">
        <Cards className="border-0 w-full md:h-[332px] dark:border-black-100 rounded-3xl  lora bg-black-100 pr-0 pl-6 pb-3 pt-6 text-white">
          <div className="flex w-full gap-2">
            <div className="w-full flex flex-col gap-10 md:gap-[87px]">
              <div>
                <h3 className="text-[46px] mb-2  font-normal">
                  {getGreeting()},
                </h3>
                <p className="font-semibold w-[327px] leading-10 text-[40px] -mt-5">
                  {userDetails?.full_name}
                </p>
                <p className="font-normal mt-3 font-lora tracking-normal text-sm">
                  Disciples make progress daily.
                </p>
              </div>

              <Link
                href={
                  hasOngoingCourses
                    ? `/dashboard/my-courses/${user?.current_ongoing_course?.title}`
                    : '/dashboard/explore-courses'
                }
                className="bg-white text-black flex items-center gap-1 px-3 text-start py-4 rounded-xl w-[190px] font-semibold dark:text-black-100 tracking-wider font-open-sans text-sm"
              >
                {hasOngoingCourses ? 'Continue Courses' : 'Browse Courses'}
                <Arrow width={10} height={10} className="dark:text-black-100" />
              </Link>
            </div>
            <div
              className={`md:flex hidden w-full ${
                hasOngoingCourses ? 'justify-center' : 'justify-end'
              } mt-8`}
            >
              {hasOngoingCourses ? (
                <div className="flex justify-center w-full">
                  <div className="bg-white z-10 h-[276px] w-[243px] rounded-[15px]">
                    <div className="foundations flex flex-col justify-end h-[140px] m-3 p-3 rounded-sm">
                      <div className="flex-1"></div>

                      <div className="flex items-center bg-white gap-2 px-2 py-1 rounded-sm">
                        <div className="flex-1 h-[5px] rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full bg-brown-300 w-[44%]"
                            style={{
                              width: `${
                                user?.current_ongoing_course
                                  ?.percentage_completed ?? 0
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-brown-300 font-semibold text-[10px] font-open-sans">
                          {user?.current_ongoing_course?.percentage_completed}%
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-3 py-2">
                      <div className="flex justify-between items-center">
                        <h3 className=" text-black-100 capitalize font-cormorant font-bold text-[15px] ">
                          {user?.current_ongoing_course?.title}
                        </h3>
                        <p className="text-center bg-[#F6F6F6]  p-2 rounded-[6px] text-gray-100 text-[12px] font-open-sans">
                          {user?.current_ongoing_course?.completed_lessons}/
                          {user?.current_ongoing_course?.total_lessons} Lessons
                        </p>
                      </div>
                      <p className="text-gray-500 font-lora text-[12px] ">
                        {truncateText(
                          'Start your  journey with core teachings on salvation,prayer, and Scripture.',
                          75
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-[252px] mt-5 bg-gray-dark-100 rounded-r-[20px] -ml-3"></div>
                </div>
              ) : (
                <Image
                  src={dashboardImage}
                  alt=""
                  className="rounded-xl h-[259px] w-[360px] "
                />
              )}
            </div>
          </div>
        </Cards>
      </div>
      <div className="flex flex-1/3 flex-col  gap-4">
        <div className="grid grid-cols-2 w-full gap-4">
          <Cards className="border-blue-light-1000  py-2  h-[84px] bg-[#EFF4FF] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <OngoingIcon />
              <h3 className=" text-sm">Ongoing</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">
              {user?.ongoing_course}
            </h3>
          </Cards>
          <Cards className="border-green-100 h-[84px]  py-2   bg-[#F3FFF7] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <CompletedIcon />
              <h3 className=" text-sm">Completed</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">
              {user?.completed_course}
            </h3>
          </Cards>
          <Cards className="border-purple-100 h-[84px]  py-2   bg-[#F5F0FF] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <HourseSpentIcon />
              <h3 className=" text-sm">Hours Spent</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">
              {Duration(user?.hours_spent)}
            </h3>
          </Cards>{' '}
          <Cards className="border-yellow-100 h-[84px] py-2 bg-[#FFF9E9] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <CertificateIcon />
              <h3 className=" text-sm">Certificates</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">
              {user?.certificate}
            </h3>
          </Cards>{' '}
        </div>
        <Cards className="border-brown-100  bg-[#FFF9E9] py-2  font-lora text-black-100 border[1px]">
          <h3 className="text-center text-brown-200 text-[29px] font-semibold font-open-sans">
            “
            {loading
              ? truncateText('Remain in me, as I also remain in you.', 27)
              : truncateText(verse?.text?.trim() || '', 27)}
            ”
          </h3>

          <h3 className="text-brown-200 mt-2 text-sm text-center">
            {verse?.book_name} {verse?.chapter}:{verse?.verse} (NIV)
          </h3>
        </Cards>
      </div>
    </div>
  );
}
