'use client'
import Image from "next/image";
import { courseCategories } from "@/utils/data";

const CoursesSection = () => {
    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-2 sm:mt-10 font-lora">Featured Courses</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase font-cormorant">
                    Grow in Christ, one course at a time.
                </h2>
                <p className="text-gray-600 text-base font-lora leading-relaxed max-w-2xl mx-auto break-words mb-12">
                    Whether you`re new to the faith or deepening your walk, these courses
                    <span className="hidden lg:inline"><br /></span>
                    <span className="inline lg:hidden"> </span>
                    are a great place to begin.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {courseCategories.map((course, index) => (
                        <div key={index} className="bg-white border shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
                            <div className="relative w-full h-[280px]">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 bg-gray-100 hover:bg-[#fff]">
                                <h3 className="font-bold font-cormorant text-lg text-gray-800">{course.title}</h3>
                                <p className="sm:text-sm  text-gray-600 mb-2 ">{course.description}</p>
                                <p className="sm:text-sm text-md font-semibold text-gray-900 cursor-pointer inline-block px-3 py-1 rounded">
                                    Start Course <span className="ml-1">→</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 flex justify-center">
                    <button className="bg-black text-white font-semibold text-sm sm:text-base px-5 sm:px-8 py-4 sm:py-4 rounded-xl hover:bg-gray-200 hover:text-black transition-all font-openSans">
                        Browse All Courses →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoursesSection;
