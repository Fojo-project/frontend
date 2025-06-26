/* import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext"; */
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 gap-28 cormorant-garamond  bg-white z-1 dark:bg-gray-900 sm:p-0">
        <div className="relative flex lg:flex-row-reverse w-full h-screen justify-center flex-col  sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full authbg py-[50px] lg:grid items-end hidden">
            <div className="relative items-end justify-center  flex z-1">
            <div className="flex flex-col items-start h-full uppercase text-white px-11">
            <h3 className="font-bold text-[64px] -tracking-tighter leading-[70px]">begin your walk with Jesus today.</h3>
                <p className="text-start lora  italic font-normal text-[22px]">
                “Come, follow me, and I will make you fishers of men.”
                — Matthew 4:19 (NIV)                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
          </div>
        </div>
    </div>
  );
}
