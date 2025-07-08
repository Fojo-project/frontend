import DiscipleshipSection from "../components/landing/discipleship";
import HeroBanner from "../components/landing/HeroBanner";
import Navbar from "../layout/home/Navbar";
import React from "react";
import LearningSection from "../components/landing/learning";
import CoursesSection from "../components/landing/courses";
import NewsLetterSection from "../components/landing/newsletter";
import Footer from "../layout/home/Footer";

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover text-white bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/home/hero-banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Navbar />
      <div className="relative z-10 h-full flex items-center justify-center">
        <HeroBanner />
      </div>
      <DiscipleshipSection />
      <LearningSection />
      <CoursesSection />
      <section className="followersbg relative h-[500px] max-w-full lg:max-w-7xl mx-auto px-4 mb-10 md:mb-20">
        <div className="relative w-full h-full">
          <div className="absolute  bg-black/60 z-0" />
          <div className="absolute bg-[#00000] inset-0 flex justify-center items-center px-4 z-10">
            <div className="max-w-md text-white text-center sm:text-left sm:ml-auto sm:mr-20">
              <p className="uppercase text-xs font-lora tracking-widest text-gray-300">
                Followers of Jesus Only
              </p>
              <h1 className="text-4xl md:text-5xl font-cormorant font-semibold leading-snug">
                <span className="block sm:inline">READY TO GROW</span>{' '}
                <span className="block sm:inline">IN YOUR WALK</span>{' '}
                <span className="block sm:inline">WITH JESUS?</span>
              </h1>
              <p className="text-md text-gray-300 font-cormorant leading-relaxed">
                Start learning today with free, Bible-centered courses
                <span className="block sm:inline sm:mt-0">
                  made to deepen your faith and disciple others.
                </span>
              </p>
              <button className="bg-white mt-4 text-black text-xs md:text-[14px] font-semibold py-2 px-4 sm:px-5 sm:py-3 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 mx-auto sm:mx-0">
                Start Learning Now!
                <span className="transform -translate-y-[1px] font-bold">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-0">
        <NewsLetterSection />
        <Footer />
      </div>

    </div>
  );
}
