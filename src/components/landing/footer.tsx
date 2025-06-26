import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
       <div>
      <footer className="bg-[#000000] text-white px-6 md:px-20 pt-56 pb-6 text-sm relative z-0">
  <div className="flex flex-col md:flex-row justify-between items-center gap-10">
    <div className="max-w-md mb-8 text-center mx-auto md:text-left md:mx-0">
      <Link href="#">
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
        <li><a href="#">Courses</a></li>
        <li><a href="#">About FOJO</a></li>
        <li><a href="#">Join Community</a></li>
      </ul>
      <ul className="space-y-2 font-lora text-[14px] lg:text-[16px]">
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">How FOJO Works</a></li>
      </ul>
    </div>
  </div>

  <div className="text-center text-sm font-lora text-white mt-12 border-t border-gray-800 pt-6">
    © 2025 FOJO. All rights reserved.
  </div>
</footer>

       </div>
  );
};

export default Footer;

