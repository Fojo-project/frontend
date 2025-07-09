import Header from '@/layout/dashboard/Header';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Header Heading="My Courses" />
      {children}
    </div>
  );
}
