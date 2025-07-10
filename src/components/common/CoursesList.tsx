interface CoursesListProps {
  title: string;
  description: string;
  lessons: number;
  image: string;
}

export default function CoursesList({
  title,
  description,
  lessons,
  image,
}: CoursesListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between bg-[#F9F9F9]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold lora">{title}</h3>
            <span className="text-xs bg-gray-300 text-gray-600 px-2 py-1.5 rounded-sm lora">
              {lessons} lessons
            </span>
          </div>
          <p className="text-[13px] text-gray-600 lora">{description}</p>
        </div>
        <a
          href="#"
          className="mt-3 text-[14px] text-black font-medium"
        >
          View Course →
        </a>
      </div>
    </div>
  );
}
