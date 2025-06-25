const HeroBanner = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-cover bg-center">
      <div className="relative z-10 text-center px-6 max-w-5xl text-white">
        <h1 className="text-4xl font-cormorant md:text-6xl font-medium leading-[1.2]">
          DISCIPLESHIP RESOURCES FOR FOLLOWERS OF JESUS ONLY.
        </h1>

        <p className="mt-4 text-[16px] md:text-[18px] font-lora text-gray-200">
          Access deep, Bible-based teaching designed to help you follow Jesus daily.
        </p>

        <div className="mt-6 flex flex-row  gap-2 justify-center">
          <button className="bg-white text-black  px-4 py-2 md:px-8 md:py-3 rounded-lg sm:text-[16px] font-medium hover:bg-gray-300 transition">
            Start Learning
          </button>
          <button className="border border-white px-4 py-2 md:px-8 md:py-3 rounded-lg text-[16px] font-medium hover:bg-white hover:text-black transition">
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
