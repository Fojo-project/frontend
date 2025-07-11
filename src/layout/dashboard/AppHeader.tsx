'use client';
import {
  MenuBarCLose,
  MenuBarIcon,
  MenuIcon,
  SearchIcon,
} from '@/assets/icons';
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton';
import NotificationDropdown from '@/components/header/NotificationDropdown';
import UserDropdown from '@/components/header/UserDropdown';
import Profile from '@/components/user-profile/profile';
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import FojoLogo from '../../../public/images/home/FojoLogo.png';
import FojoDarkLogo from '../../../public/images/home/logo.png';

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 h-[92px] font-lora flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-10 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? <MenuBarIcon /> : <MenuBarCLose />}
          </button>

          <Link href="/" className="lg:hidden">
            <>
              <Image
                src={FojoLogo}
                alt="Fojo Logo"
                className="dark:hidden object-cover"
              />
              <Image
                src={FojoDarkLogo}
                alt="Fojo Logo Dark"
                className="hidden dark:block object-cover py-2"
              />
            </>
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-10 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <MenuIcon />
          </button>

          <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                  <SearchIcon />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search courses..."
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200  py-2.5 pl-12 pr-14 text-sm bg-gray-25 text-gray-950 shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 xl:w-[430px]"
                />
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${isApplicationMenuOpen ? 'flex' : 'hidden'
            } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeToggleButton />
            {/* <!-- Dark Mode Toggler --> */}

            <NotificationDropdown />
            {/* <!-- Notification Menu Area --> */}
          </div>
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
      <Profile />
    </header>
  );
};

export default AppHeader;
