'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../../context/SidebarContext';
import { CourseIcon, EventsIcon, ExploreIcon, HomeIcon } from '@/assets/icons';
import Image from 'next/image';
import Fojo from '../../../public/images/home/Fojo.png';
import FojoDark from '../../../public/images/home/logoDark.png';
import FojoLogo from '../../../public/images/home/FojoLogo.png';
import FojoDarkLogo from '../../../public/images/home/logo.png';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  const navItems: NavItem[] = [
    {
      icon: <HomeIcon width={16} height={18} className="" />,
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <CourseIcon width={16} height={17} className="" />,
      name: 'My Courses',
      path: '/dashboard/my-courses',
    },
    {
      icon: <ExploreIcon width={18} height={18} className="" />,
      name: 'Explore Courses',
      path: '/dashboard/explore-courses',
    },
    {
      icon: <EventsIcon width={20} height={20} className="" />,
      name: 'Events',
      path: '/dashboard/events',
    },
  ];

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col font-open-sans gap-5">
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`menu-item group flex items-center gap-3 rounded-md px-4 py-4 transition-colors ${active
                ? 'font-semibold text-sm bg-gray-25 border border-gray-200 text-black'
                : 'hover:bg-gray-25  border-gray-200 text-black-100 dark:text-white hover:text-black'
                }`}
            >
              <span
                className={`transition-colors ${active ? 'text-black' : 'group-hover:text-black text-inherit'
                  }`}
              >
                {item.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span
                  className={`menu-item-text transition-colors ${active ? 'text-black' : 'group-hover:text-black text-inherit'}`}
                >
                  {item.name}
                </span>
              )}

            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
    ${isExpanded || isMobileOpen ? 'w-[290px]' : 'w-[90px]'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >

      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
          }`}
      >
        <Link href="/">
          {isExpanded || isMobileOpen ? (
            <>
              <Image src={FojoLogo} alt="Fojo Logo" className="dark:hidden object-cover" />
              <Image src={FojoDarkLogo} alt="Fojo Logo Dark" className="hidden dark:block object-cover py-2" />
            </>
          ) : (
            <>
              <Image src={Fojo} alt="Fojo icon" className="dark:hidden object-cover" />
              <Image src={FojoDark} alt="Fojo Logo Dark" className="hidden dark:block object-cover py-2" />
            </>
          )}

        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto  no-scrollbar">
        <nav className="mb-6">
          <h2
            className={`mb-4 text-xs uppercase text-gray-400 ${!isExpanded ? 'lg:justify-center' : 'justify-start'} flex leading-[20px]`}
          >
            {''}
          </h2>

          {renderMenuItems(navItems)}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
