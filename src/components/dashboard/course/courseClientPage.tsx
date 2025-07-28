"use client";

import { useState } from "react";
import Header from '@/layout/dashboard/Header';
import CourseDetails from '@/components/dashboard/course/CourseDetails';
import { Modal } from '@/components/ui/modal';
import Certificate from '@/components/dashboard/course/Certificate';

interface Props {
  courseParam: string;
}

export default function CourseClientPage({ courseParam }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseTitle = decodeURIComponent(courseParam ?? "");

  return (
    <div className="flex flex-col gap-6">

      <div className="px-4 md:px-0 flex justify-between">
        <Header Heading={'My Courses'} link='/dashboard/my-courses' />

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white font-semibold px-6 py-2 rounded-md mt-2"
        >
          View Certificate
        </button>
      </div>

      <CourseDetails courseTitle={courseTitle} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-4xl mx-auto"
      >
        <Certificate
          name="Anthony Johnson"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed neque sed lorem hendrerit aliquet. Pellentesque vehicula placerat finibus.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed neque sed lorem hendrerit aliquet. Pellentesque vehicula placerat finibus."
          presidentName="CHARLES BLAKE"
          generalName="JULIE S. SMITH"
        />
      </Modal>
    </div>
  );
}
