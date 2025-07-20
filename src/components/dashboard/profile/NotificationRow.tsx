"use client";

import { ChevronRight } from "lucide-react";

const NotificationRow = ({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <div onClick={onClick} className="cursor-pointer group py-2 space-y-1">
    <div className="flex items-center gap-1">
      <p className={`text-sm font-semibold ${active ? "text-black" : "text-gray-700"}`}>
        {label}
      </p>
      <ChevronRight
        className={`transition duration-200 ${
          active ? "text-black" : "text-gray-400 group-hover:text-black"
        }`}
        size={16}
      />
    </div>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

export default NotificationRow;
