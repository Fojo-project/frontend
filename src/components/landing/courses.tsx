'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useHomepageCoursesQuery } from '@/store/dashboard/dashboard.api';

const CoursesSection = () => {
    const { data, isLoading, isError } = useHomepageCoursesQuery();
    const courses = data?.data || [];

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-2 font-lora">
                    Featured Courses
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 uppercase font-cormorant">
                    Grow in Christ, one course at a time.
                </h2>
                <p className="text-gray-600 text-base font-lora leading-relaxed max-w-2xl mx-auto mb-12">
                    Whether you`re new to the faith or deepening your walk, these courses are a great place to begin.
                </p>

                {isLoading ? (
                    <p className="text-gray-400">Loading courses...</p>
                ) : isError ? (
                    <p className="text-red-500">Failed to load courses.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-[#F6F6F6] border border-gray-200 rounded-lg overflow-hidden transition-all hover:bg-[#ffffff]"
                            >
                                <div className="relative w-full h-[240px]">
                                    <Image
                                        src={course.course_image}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-[20px] mt-1 text-gray-900 font-cormorant leading-snug group-hover:text-gray-900 transition-colors">
                                            {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
                                        </h3>

                                        <span className="text-[11px] font-semibold text-[#E5E5E5] bg-white px-3 py-2 rounded-md font-openSans">
                                            {course.lesson_count || 0} Lessons
                                        </span>
                                    </div>

                                    <p className="text-sm text-start text-gray-600 font-openSans leading-relaxed group-hover:text-gray-900 transition-colors">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-14 flex justify-center">
                    <Link href="/signup" className="bg-black text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-200 hover:text-black transition-all font-openSans">
                        Start Learning →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
