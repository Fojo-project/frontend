'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../../context/SidebarContext';
import { CourseIcon, EventsIcon, ExploreIcon, HomeIcon } from '@/assets/icons';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <HomeIcon width={16} height={18} />,
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <CourseIcon width={16} height={17} />,
    name: 'My Courses',
    path: '/courses',
  },
  {
    icon: <ExploreIcon width={18} height={18} />,
    name: 'Explore Courses',
    path: '/Explore',
  },
  {
    icon: <EventsIcon width={20} height={20} />,
    name: 'Events',
    path: '/events',
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-8">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.path}
            className={`menu-item group ${
              isActive(item.path)
                ? 'font-semibold text-sm bg-gray-25'
                : 'menu-item-inactive'
            }`}
          >
            <span
              className={`${
                isActive(item.path)
                  ? 'menu-item-icon-active bg-gray-25'
                  : 'menu-item-icon-inactive'
              }`}
            >
              {item.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{item.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? 'w-[290px]'
            : isHovered
            ? 'w-[290px]'
            : 'w-[90px]'
        }
        ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? 'Fojo LOGO' : 'jre'}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <h2
            className={`mb-4 text-xs uppercase text-gray-400 ${
              !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
            } flex leading-[20px]`}
          ></h2>
          {renderMenuItems(navItems)}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
