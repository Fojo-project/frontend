"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "#" },
  { label: "Courses", href: "#" },
  { label: "About", href: "#" },
  { label: "Support Us", href: "#" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 font-openSans">
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 text-white w-full">
        {/* Logo */}
        <Link href="#">
          <Image
            src="/images/home/logo.png"
            alt="FOJO Logo"
            width={60}
            height={40}
            className="object-contain"
          />
        </Link>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-lg">☰</span>
        </button>

        <div className="hidden md:flex items-center gap-12">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label} className="font-openSans">
                <Link
                  href={href}
                  className="text-sm font-medium hover:text-gray-300 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="text-sm px-6 py-2 border rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
            <Link
              href="#"
              className="text-sm px-6 py-2 border rounded-lg text-white font-medium hover:bg-gray-200 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Navigation Links - Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 px-6 py-4 space-y-4">
          <ul className="space-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="block text-sm text-white font-medium hover:text-gray-300 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="#"
              className="block text-sm text-black bg-white px-6 py-2 rounded-lg text-center font-medium hover:bg-gray-200"
            >
              Sign Up
            </Link>
            <Link
              href="#"
              className="block text-sm border border-white px-2 py-2 rounded-lg text-white text-center font-medium hover:bg-white hover:text-black"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
