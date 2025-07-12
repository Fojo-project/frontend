import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface DashboardResponse {
  message: string;
}
interface AllCourse {
  completed_lesson: number;
  slug: string;
  id: number;
  title: string;
  about_course: string;
  course_image: string;
  description: string;
  lesson_count?: number;
  lesson_progress?: {
    completed_lessons: number;
    total_lessons: number;
  };
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
  isStarted: boolean;
  lesson_progress?: {
    completed_lessons: number;
    total_lessons: number;
  };
  completed_lessons: number;
  total_lesson: number;
  total_lessons_duration: number;
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
  isCompleted: any;
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
interface StartCoursePayload {
  course: string;
}

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Course', 'AllCourses'],
  endpoints: (builder) => ({
    allCourses: builder.query<AllCourseResponse, void>({
      query: () => ({
        url: '/api/courses/user/course',
        method: 'GET',
      }),
      providesTags: ['AllCourses'],
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
      providesTags: (result, error, arg) => [
        { type: 'Course', id: arg.course },
      ],
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
      invalidatesTags: ['AllCourses'],
    }),
    StartCourse: builder.mutation<DashboardResponse, StartCoursePayload>({
      query: ({ course }) => ({
        url: `/api/courses/${course}/start`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Course', id: arg.course },
      ],
    }),
  }),
});

export const {
  useAllCoursesQuery,
  useCourseQuery,
  useShowALessonQuery,
  useMarkLessonMutation,
  useExploreCoursesQuery,
  useStartCourseMutation,
} = DashboardApi;
