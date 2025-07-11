import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface DashboardResponse {
  message: string;
}
interface AllCourse {
  id: number;
  title: string;
  about_course: string;
  course_image: string;
  description: string;
  lesson_count?: number;
}
interface AllCourseResponse {
  success: boolean;
  message?: string;
  data: AllCourse[];
}
interface Course {
  title: string;
  about: string;
  bgColor: string;
  badgeColor: string;
  bgImage: string;
  thumbnail: string;
  totalLessons: number;
  totalDuration: string;
  lessons: Lesson[];
  about_course: string;
  slug: string;
  description: string;
  color_code: string;
  lesson_count: number;
  course_video: string;
}
interface CourseResponse {
  success: boolean;
  message?: string;
  data: Course;
}
interface ShowLessonResponse {
  lesson_order: number;
  content: string;
  success: boolean;
  message?: string;
  data: {
    lesson: Lesson;
    next_lessons: Lesson[];
  };
}
interface Lesson {
  slug: string;
  title: string;
  lesson_content: string;
  lesson_note: string;
  lesson_order: number;
  description: string;
  color_code: string;
  lesson_count: number;
  lesson_video: string;
}
interface LessonQueryArg {
  lesson: string;
}
interface CourseQueryArg {
  course: string;
}
interface MarkLessonPayload {
  lesson: string;
}

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    allCourses: builder.query<AllCourseResponse, void>({
      query: () => ({
        url: '/api/courses/user/course',
        method: 'GET',
      }),
    }),
    ExploreCourses: builder.query<AllCourseResponse, void>({
      query: () => ({
        url: '/api/courses',
        method: 'GET',
      }),
    }),
    Course: builder.query<CourseResponse, CourseQueryArg>({
      query: ({ course }) => ({
        url: `/api/courses/${course}`,
        method: 'GET',
      }),
    }),

    ShowALesson: builder.query<ShowLessonResponse, LessonQueryArg>({
      query: ({ lesson }) => ({
        url: `/api/lessons/${lesson}`,
        method: 'GET',
      }),
    }),
    MarkLesson: builder.mutation<DashboardResponse, MarkLessonPayload>({
      query: ({ lesson }) => ({
        url: `/api/lessons/${lesson}/complete`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useAllCoursesQuery,
  useCourseQuery,
  useShowALessonQuery,
  useMarkLessonMutation,
  useExploreCoursesQuery,
} = DashboardApi;
