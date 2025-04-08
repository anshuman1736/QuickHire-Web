"use client"
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Add scroll event listener for header style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      mobileMenuOpen &&
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
      setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`py-4 px-4 md:px-8 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl md:text-2xl flex items-center">
          <div className="flex items-center">
            <span className="text-[#FFBF2F]">Q</span>
            <span className="text-black">H</span>
            <span className="ml-1 inline-flex items-center justify-center h-5 w-12 md:h-6 md:w-14 rounded-full text-black text-xs bg-gray-100">
              jobs
            </span>
          </div>
        </Link>

        {/* Desktop Auth Buttons - Consistent Design */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium"
          >
            Create Profile
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
          
          {/* Mobile dropdown menu - Consistent Design */}
          {mobileMenuOpen && (
            <div className="absolute right-0 top-10 w-56 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-3 space-y-2">
                <Link
                  href="/login"
                  className="block w-full py-2.5 text-center border border-gray-300 text-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full py-2.5 text-center border border-gray-300 text-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}