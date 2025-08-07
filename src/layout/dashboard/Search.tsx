'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchCoursesAndLessonsQuery } from '@/store/dashboard/dashboard.api';
import { SearchIcon } from '@/assets/icons';

export default function SearchForm() {
  const router = useRouter();
  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data } = useSearchCoursesAndLessonsQuery(
    { query: searchTerm },
    { skip: searchTerm.trim().length < 2 }
  );

  const mergedResults = [
    ...(data?.data?.courses || []).map((item: any) => ({
      ...item,
      type: 'course',
    })),
    ...(data?.data?.lessons || []).map((item: any) => ({
      ...item,
      type: 'lesson',
      courseSlug: item.course_slug,
    })),
  ];

  const handleSelect = (item: any) => {
    if (item.type === 'course') {
      router.push(`/dashboard/my-courses/${item.slug}`);
    } else if (item.type === 'lesson') {
      router.push(`/dashboard/my-courses/${item.courseSlug}/lesson/${item.slug}`);
    }

    setShowDropdown(false);
    setQuery('');
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim().length >= 2) {
        setSearchTerm(query.trim());
        setShowDropdown(true);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-md w-full" ref={inputWrapperRef}>
      <div className="flex items-center space-x-2 border border-[#D0D5DD] rounded-md bg-white px-3 py-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search by course or lesson"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent focus:outline-none text-sm"
        />
      </div>

      {showDropdown && mergedResults.length > 0 && (
        <div className="absolute bg-white w-full mt-1 rounded-md border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
          {mergedResults.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 truncate">
                {item.subtitle || item.description || 'No description available'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
