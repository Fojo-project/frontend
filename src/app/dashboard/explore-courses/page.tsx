import CoursesList from "@/components/common/CoursesList";

const courses = [
  {
    title: "Foundations",
    description:
      "Start your journey with core teachings on salvation, prayer, and Scripture.",
    lessons: 4,
    image: "/images/home/disciple-large.png",
  },
  {
    title: "Discipleship",
    description: "Grow in daily obedience and intimacy with Christ.",
    lessons: 5,
    image: "/images/home/disciple-large.png",
  },
  {
    title: "Ministry",
    description: "Serve others with clarity and purpose.",
    lessons: 4,
    image: "/images/home/disciple-large.png",
  },
  {
    title: "Leadership",
    description: "Lead with courage, humility, and wisdom.",
    lessons: 6,
    image: "/images/home/disciple-large.png",
  },
];

export default function Page() {
  return (
    <div className="px-2 py-2">
      <h1 className="text-2xl font-semibold mb-3 lora">Explore Courses</h1>
      <div className="flex flex-wrap gap-6">
        {courses.map((course, index) => (
          <div key={index} className="w-full md:w-[48%]">
            <CoursesList {...course} />
          </div>
        ))}
      </div>
    </div>
  );
}
