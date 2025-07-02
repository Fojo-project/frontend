'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NAV_LINKS } from '@/utils/constant';
import { Hamburger } from '@/assets/icons';

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
    <header className="absolute top-0 left-0 right-0 z-50 font-openSans">
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 text-white w-full max-w-[1512px] mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/home/logo.png"
            alt="FOJO Logo"
            width={60}
            height={40}
            className="object-contain"
          />
        </Link>
    <AnimatePresence>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all ${
          scrolled ? 'bg-gray-900 shadow-md' : 'bg-transparent'
        }`}
        initial="visible"
        animate={visible ? 'visible' : 'hidden'}
        variants={navbarVariants}
      >
        <nav className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6 font-openSans">
          <Link href="/">
            <Image
              src="/images/home/logo.png"
              alt="FOJO Logo"
              width={60}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* desktop */}
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      pathname === href ? 'text-white font-semibold' : 'text-white hover:text-gray-300'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Link
                href="/signup"
                className="text-sm px-6 py-2 border rounded-lg bg-black text-white font-medium  transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/signin"
                className="text-sm px-6 py-2 border rounded-lg text-white font-medium  transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* mobile toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen((o) => !o)}
          >
           <Hamburger/>
          </button>
        </nav>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed top-0 right-0 w-full h-[500px] bg-black bg-opacity-90 px-6 py-6"
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
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="block text-lg text-white font-medium hover:text-gray-300 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
    </nav>
    </header>
  );
};

export default Navbar;
