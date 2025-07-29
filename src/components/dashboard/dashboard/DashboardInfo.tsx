'use client';
import Cards from '@/components/ui/cards/Cards';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';
import dashboardImage from '../../../../public/images/home/homeimage.png';
import {
  Arrow,
  CertificateIcon,
  CompletedIcon,
  HourseSpentIcon,
  OngoingIcon,
} from '@/assets/icons';

export default function DashboardInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-2/3 w-full h-full">
        <Cards className="border-0 w-full md:h-[332px] dark:border-black-100 rounded-3xl  lora bg-black-100 pr-0 pl-6 pb-3 pt-6 text-white">
          <div className="flex w-full gap-2">
            <div className="w-full flex flex-col gap-10 md:gap-[87px]">
              <div>
                <h3 className="text-[46px] mb-2  font-normal">Good Morning,</h3>
                <p className="font-semibold w-[327px] leading-10 text-[40px] -mt-5">
                  Taiwo Akinfenwa
                </p>
                <p className="font-normal mt-3 font-lora tracking-normal text-sm">
                  Disciples make progress daily.
                </p>
              </div>
              <Button
                variant="outline"
                className="bg-white text-start py-4 rounded-xl w-[190px]"
                rightIcon={
                  <Arrow
                    width={14}
                    height={14}
                    className="dark:text-black-100"
                  />
                }
              >
                <span className="font-semibold dark:text-black-100  tracking-wider font-open-sans  text-sm ">
                  Browse Courses
                </span>
              </Button>
            </div>
            <div className="md:flex hidden w-full justify-end mt-8">
              <Image
                src={dashboardImage}
                alt=""
                className="rounded-xl h-[259px] w-[360px] "
              />
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
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">5</h3>
          </Cards>
          <Cards className="border-green-100 h-[84px]  py-2   bg-[#F3FFF7] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <CompletedIcon />
              <h3 className=" text-sm">Completed</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">5</h3>
          </Cards>
          <Cards className="border-purple-100 h-[84px]  py-2   bg-[#F5F0FF] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <HourseSpentIcon />
              <h3 className=" text-sm">Hours Spent</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">5</h3>
          </Cards>{' '}
          <Cards className="border-yellow-100 h-[84px] py-2 bg-[#FFF9E9] font-lora text-black-100 border[1px]">
            <div className="flex gap-2 items-center">
              <CertificateIcon />
              <h3 className=" text-sm">Certificates</h3>
            </div>
            <h3 className="mt-3 font-semibold text-2xl font-open-sans">5</h3>
          </Cards>{' '}
        </div>
        <Cards className="border-brown-100  bg-[#FFF9E9] py-2  font-lora text-black-100 border[1px]">
          <h3 className=" text-center text-brown-200 text-[29px] font-semibold  text-2xl font-open-sans">
            { }“ Remain in me, as I also remain .”
          </h3>
          <h3 className="text-brown-200 mt-2 text-sm text-center">
            John 15:4 (NIV)
          </h3>
        </Cards>
      </div>
    </div>
  );
}
