'use client';

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-[#000000]">
      <footer className="text-white px-6 md:px-20 pt-56 pb-6 text-sm relative z-0 max-w-[1512px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-md mb-8 text-center mx-auto md:text-left md:mx-0">
            <Link href="/">
              <Image
                src="/images/home/logo.png"
                alt="FOJO Logo"
                width={90}
                height={40}
                className="object-contain mx-auto md:mx-0"
              />
            </Link>
            <p className="uppercase text-white font-lora text-sm mt-4">
              Followers of Jesus Only
            </p>
            <p className="text-gray-400 text-[20px] md:text-[16px] mt-2">
              Equipping believers with sound teaching for real discipleship and spiritual growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <ul className="space-y-2 font-lora text-[14px] lg:text-[16px]">
              <li><Link href='/dashboard/explore-courses'>Courses</Link></li>
              <li><Link href="/about">About FOJO</Link></li>
              <li><Link href="#">Join Community</Link></li>
            </ul>
            <ul className="space-y-2 font-lora text-[14px] lg:text-[16px]">
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="/about">How FOJO Works</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm font-lora text-white mt-12 border-t border-gray-800 pt-6">
          © {year} FOJO. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
