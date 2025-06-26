import React from "react";

const NewsLetterSection = () => {
  return (
       <div
          className="w-full max-w-5xl mx-auto -mb-20 z-10 relative bg-[url('/images/home/home-cloud.png')] bg-cover bg-center py-14 px-6 md:px-16  text-center shadow-lg"
        >
          <h2 className="text-2xl sm:text-4xl font-semibold font-cormorant mb-2">JOIN THE FOJO COMMUNITY!</h2>
          <p className="text-sm text-[#424242] font-lora sm:text-base  max-w-md mx-auto">
            Get Bible-based encouragement, new course alerts, and spiritual resources sent to your inbox.
          </p>

          <div className="flex flex-col  sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto mt-6">
              <form className="max-w-lg mx-auto">
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full bg-white px-4 py-2 font-lora  text-md pr-48 rounded-md border border-gray-300"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 w-24 right-1 bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition text-sm"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
  );
};

export default NewsLetterSection;
;
