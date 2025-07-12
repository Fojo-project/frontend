import Image from "next/image";

const LearningSection = () => {
  return (
    <section className="bg-[#000000] text-white w-full py-16 sm:py-20 px-4 sm:px-6 md:px-20 text-center">
      <div className="max-w-[1512px] mx-auto">
        <p className="uppercase tracking-widest text-sm sm:text-[14px] font-lora mt-4 mb-2 sm:mb-2">
          Followers of Jesus Only
        </p>

        <h2 className="text-4xl sm:text-2xl md:text-[32px] font-cormorant uppercase font-bold">
          What Learning On FOJO Looks Like.
        </h2>

        <p className="max-w-2xl text-gray-300 mx-auto mb-14 md:mb-8 sm:mb-10 font-lora font-light text-[14px] sm:text-base break-words">
          Discipleship doesn’t have to be complicated. With FOJO, you can learn the
          <br /> way of Jesus in just three simple steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:pt-18 sm:gap-10 mb-10 sm:mb-12">
          <div className="hover:bg-gray-500  p-4 transition-all rounded-md group">
            <div className="mb-4 flex justify-center">
              <Image src="/images/home/bible_icon.svg" alt="Bible Icon" width={60} height={60} />
            </div>
            <h3 className="text-[22px] font-cormorant">Browse Biblical Courses.</h3>
            <p className="text-[14px] font-lora mb-2 leading-[1.5]">
              Explore our free library of Bible-based discipleship
              <br />
              courses created to help you grow in Christ.
            </p>
            <a href="#" className="relative inline-block text-white text-sm font-medium group">
              <span className="relative z-10">Explore Courses →</span>
              <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-white transition-all duration-700 group-hover:w-full"></span>
            </a>
          </div>
          <div className="hover:bg-gray-500  p-4 transition-all rounded-md group">
            <div className="mb-4 mt-12 md:mt-0 flex justify-center">
              <Image src="/images/home/video_icon.svg" alt="Video Icon" width={60} height={60} />
            </div>
            <h3 className="text-[22px] font-cormorant">Learn At Your Pace.</h3>
            <p className="text-[14px] sm:text-sm mb-2">
              Watch videos, listen to audio teachings, or read  <br /> notes
             
              all at your convenience.
            </p>
            <a href="#" className="relative inline-block text-white text-sm font-medium group">
              <span className="relative z-10">Browse Library →</span>
              <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-white transition-all duration-700 group-hover:w-full"></span>
            </a>
          </div>
          <div className="hover:bg-gray-500 p-4 transition-all rounded-md group">
            <div className="mb-4 mt-12 md:mt-0 flex justify-center">
              <Image src="/images/home/cross_icon.svg" alt="Cross Icon" width={60} height={60} />
            </div>
            <h3 className="text-[22px] font-cormorant">Grow In Christ.</h3>
            <p className="text-[14px] sm:text-sm mb-2">
              Apply what you learn as we help you become a
              <br />
              disciple who reflects Jesus in everyday life.
            </p>
            <a href="#" className="relative inline-block text-white text-sm font-medium group">
              <span className="relative z-10">Start Growing →</span>
              <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-white transition-all duration-700 group-hover:w-full"></span>
            </a>
          </div>
        </div>

        <button className="bg-white mt-10 sm:mb-8 text-black font-semibold text-sm sm:text-base px-6 sm:px-6 py-4 sm:py-3 rounded-lg hover:bg-gray-200 transition-all">
          Start Learning Now →
        </button>
      </div>
    </section>
  );
};

export default LearningSection;
