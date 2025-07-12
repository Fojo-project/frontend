'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NAV_LINKS } from '@/utils/constant';
import { Hamburger, ArrowIcon, AccountIcon, HomeIcon } from '@/assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Logout from '../../components/auth/Logout';

const navbarVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
  },
  hidden: {
    y: 0,
    opacity: 0,
    transition: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
  },
};

const mobileMenuVariants: Variants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: { type: 'tween', duration: 0.4, ease: 'easeInOut' },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.4, ease: 'easeInOut' },
  },
};

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset;
      const down = prevScrollPos < current;
      const threshold = (document.documentElement.scrollHeight - window.innerHeight) * 0.15;
      setScrolled(current > 20);
      setVisible(!(down && current > threshold));
      setPrevScrollPos(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <AnimatePresence>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all ${scrolled ? 'bg-[#000000] shadow-lg' : 'bg-transparent'
          }`}
        initial="visible"
        animate={visible ? 'visible' : 'hidden'}
        variants={navbarVariants}
      >
        <nav className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6 font-openSans max-w-[1512px] mx-auto text-white">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/home/logo.png"
              alt="FOJO Logo"
              width={60}
              height={40}
              className="object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <li key={link.label} className="relative group">
                    <span className="flex items-center gap-1 text-sm font-medium cursor-pointer text-white transition-colors duration-200 group-hover:text-gray-300">
                      {link.label}
                      <span className="transition-transform duration-300 group-hover:rotate-180">
                        <ArrowIcon width={20} height={20} />
                      </span>
                    </span>
                    <ul className="absolute left-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-200 translate-y-2 z-10">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors duration-200 ${pathname === link.href
                        ? 'text-white font-semibold'
                        : 'text-white hover:text-gray-300'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Account Dropdown */}
            {isLoggedIn ? (
              <li className="relative group list-none">
                <span className="flex items-center gap-1 text-sm font-medium cursor-pointer text-white transition-colors duration-200 group-hover:text-gray-300">
                  <AccountIcon width={24} height={24} />
                  <span className="transition-transform duration-300 group-hover:rotate-180">
                    <ArrowIcon width={16} height={16} />
                  </span>
                </span>
                <ul className="absolute right-0 mt-2 h-30 w-44 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-200 translate-y-2 z-10">
                  <li className="flex items-center gap-2  mt-5 hover:bg-gray-100 px-3 py-2 rounded-md">
                    <HomeIcon width={24} height={24} />
                    <Link
                      href="/dashboard"
                      className="block  text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>

                  </li>

                  <li>
                    <Logout />
                  </li>
                </ul>
              </li>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/signup"
                  className="text-sm px-6 py-2 border rounded-lg bg-white text-black font-medium transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="text-sm px-6 py-2 border rounded-lg text-white font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Hamburger />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed top-0 right-0 w-full h-[500px] bg-[#000000] bg-opacity-90 px-6 py-6 overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/">
                  <Image
                    src="/images/home/logo.png"
                    alt="FOJO Logo"
                    width={60}
                    height={40}
                  />
                </Link>
                <button
                  className="text-white text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
              </div>

              <ul className="space-y-4">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <li key={link.label}>
                      <div
                        onClick={() => setResourcesOpen((prev) => !prev)}
                        className="flex items-center justify-between text-white font-medium mb-2 cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <span
                          className={`transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''
                            }`}
                        >
                          <ArrowIcon width={16} height={16} />
                        </span>
                      </div>
                      {resourcesOpen && (
                        <ul className="pl-4 space-y-2">
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className="block text-sm text-white hover:text-gray-300"
                                onClick={() => setMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block text-lg text-white font-medium hover:text-gray-300 transition-colors duration-200"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>

              {/* Mobile Auth Dropdown */}
              <div className="mt-8 flex flex-col gap-3">
                {isLoggedIn ? (
                  <div>
                    <div
                      className="flex items-center justify-between text-white font-medium cursor-pointer"
                      onClick={() => setAccountOpen((prev) => !prev)}
                    >
                      <div className="flex items-center gap-1">
                        <AccountIcon width={24} height={24} />
                        <span>Account</span>
                      </div>
                      <span
                        className={`transition-transform duration-300 ${accountOpen ? 'rotate-180' : ''
                          }`}
                      >
                        <ArrowIcon width={16} height={16} />
                      </span>
                    </div>
                {accountOpen && (
  <ul className="mt-4 w-full bg-white text-black rounded-md shadow-lg py-2 px-4 space-y-2">
    <li className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-md">
      <HomeIcon width={24} height={24} className="fill-black" />
      <Link href="/dashboard" className="text-sm" onClick={() => setMenuOpen(false)}>
        Dashboard
      </Link>
    </li>
    <li>
      <Logout />
    </li>
  </ul>
)}



                  </div>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="block text-center text-sm text-black bg-white px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/signin"
                      className="block text-center text-sm border border-white px-6 py-2 rounded-lg text-white font-medium hover:bg-white hover:text-black transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
