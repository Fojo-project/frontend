// CourseClientPage.tsx

'use client';

import { useState } from "react";
import Header from '@/layout/dashboard/Header';
import CourseDetails from '@/components/dashboard/course/CourseDetails';
import { Modal } from '@/components/ui/modal';
import Certificate from '@/components/dashboard/course/Certificate';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  courseParam: string;
}

export default function CourseClientPage({ courseParam }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  const courseTitle = decodeURIComponent(courseParam ?? "");

  const user = useSelector((state: RootState) => state.profile.user);
  const userName = user?.full_name || "Student";

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 md:px-0 flex justify-between">
        <Header Heading={'My Courses'} link='/dashboard/my-courses' />

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!isCourseCompleted}
          className={`font-semibold px-6 py-2 rounded-md mt-2 ${
            isCourseCompleted
              ? 'bg-black text-white hover:bg-gray-900'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          View Certificate
        </button>
      </div>

      <CourseDetails
        courseTitle={courseTitle}
        onCompletionChange={(completed) => setIsCourseCompleted(completed)} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-4xl mx-auto"
      >
        <Certificate
          name={userName}
          text="For successful completion of the course and dedication to learning."
          presidentName="CHARLES BLAKE"
          generalName="JULIE S. SMITH"
        />
      </Modal>
    </div>
  );
}
