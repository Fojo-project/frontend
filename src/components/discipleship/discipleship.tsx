import React from "react";

const DiscipleshipSection = () => {
  return (
    <section className="md:mt-8 text-black px-6 sm:px-6 lg:px-20 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
      <div className="relative ">
        <img
          src="/images/home/disciple-cross.png"
          alt=""
          className="absolute -top-20 sm:-top-28 md:-top-36 left-1 sm:left-6 w-[250px] sm:w-[300px] md:w-[400px] opacity-10 -z-10 select-none pointer-events-none"
          aria-hidden="true"
        />

        <p className="uppercase text-lg sm:text-xs font-cormorant tracking-widest font-bold">
          What is FOJO?
        </p>
        <h2 className="text-4xl sm:text-2xl md:text-[32px] lg:text-[40px] font-cormorant uppercase font-bold mt-2 relative z-10 leading-snug">
          Discipleship For Those <br className="hidden sm:block" /> Who Follow Jesus.
        </h2>

        <p className="sm:mt-4  text-lg sm:text-base font-lora leading-relaxed">
          "Whoever wants to be my disciple must deny themselves and take up their cross and follow me."
          <br />
          <span className="font-semibold">- Matthew 16:24 (NIV)</span>
        </p>
        <p className="mt-4 text-lg sm:text-[16px] font-lora leading-[1.5] text-[#555555] w-[90%]">
          FOJO (Followers of Jesus Only) is a free discipleship platform committed to equipping believers
          with Bible-based teachings that lead to spiritual growth and deeper intimacy with Jesus.
          Whether you're a new believer or a seasoned saint, FOJO is here to guide your walk with Christ.
          We believe discipleship is not optional—it's foundational. That’s why FOJO exists: to help you follow Jesus only.
        </p>
      </div>

      <div className="flex justify-center lg:justify-end">
        <img
          src="/images/home/Discipleship-image.png"
          alt="Bible study"
          className="w-full max-w-sm sm:max-w-xl md:max-w-xl h-auto"
        />
      </div>
    </section>
  );
};

export default DiscipleshipSection;
