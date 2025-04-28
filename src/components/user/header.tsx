"use client"

import React, { useEffect, useState } from "react";
import { User, Menu, X, ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/queries";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const activePath = usePathname();
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState("");

  const router = useRouter();
  
  // Fetch user data with proper error handling
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getUserById", userId],
    queryFn: () => getUserById(userId as number, token),
    enabled: !!userId && !!token,
    retry: 1,
  });

  useEffect(() => {
    // Use try/catch to handle potential localStorage errors
    try {
      const storedToken = localStorage.getItem("sessionId");
      const storedUserId = localStorage.getItem("userId");
      
      if (storedToken) setToken(storedToken);
      if (storedUserId) setUserId(Number(storedUserId));
      
      // If no auth data is found, redirect to login
      if (!storedToken || !storedUserId) {
        router.push('/');
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      router.push('/');
    }
  }, [router]);

  // Use safe fallbacks for user data
  const userName = data?.CONTENT?.fullName || 'User';
  const userRole = data?.CONTENT?.role
  
  const user = {
    name: userName,
    avatar: null,
    role: userRole,
  };

  const getInitials = (name: string): string => {
    if (!name || name === 'User') return 'U';
    return name
      .split(' ')
      .map((part: string) => part[0])
      .join('')
      .toUpperCase();
  };

  interface TabStylesProps {
    path: string;
  }

  const getTabStyles = (path: TabStylesProps["path"]): string => {
    const baseStyles = "font-medium px-3 py-2 rounded-md transition-colors duration-200";
    if (path === activePath) {
      return `${baseStyles} bg-blue-50 text-black`;
    }
    return `${baseStyles} text-gray-700 hover:text-black hover:bg-gray-50`;
  };

  interface MobileTabStylesProps {
    path: string;
  }

  const getMobileTabStyles = (path: MobileTabStylesProps["path"]): string => {
    const baseStyles = "font-medium py-2 px-4 hover:bg-blue-50 rounded-lg";
    if (path === activePath) {
      return `${baseStyles} bg-blue-50 text-black`;
    }
    return `${baseStyles} text-gray-700 hover:text-black`;
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      router.push('/');
    } catch (error) {
      console.error("Error during logout:", error);
      router.push('/');
    }
  }

  // Show loading state while fetching user data
  if (isPending) {
    return (
      <header className="bg-white w-screen shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/user" className="font-bold text-xl md:text-2xl flex items-center">
              <div className="flex items-center">
                <span className="text-[#FFBF2F]">Q</span>
                <span className="text-black">H</span>
                <span className="ml-1 inline-flex items-center justify-center h-5 w-12 md:h-6 md:w-14 rounded-full text-black text-xs bg-gray-100">
                  jobs
                </span>
              </div>
            </Link>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  if (isError) {
    console.error("Error fetching user data:", error);
  }

  return (
    <header className="bg-white w-screen shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/user" className="font-bold text-xl md:text-2xl flex items-center">
            <div className="flex items-center">
              <span className="text-[#FFBF2F]">Q</span>
              <span className="text-black">H</span>
              <span className="ml-1 inline-flex items-center justify-center h-5 w-12 md:h-6 md:w-14 rounded-full text-black text-xs bg-gray-100">
                jobs
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/user" className={getTabStyles("/user")}>Dashboard</Link>
            <Link href="/user/applications" className={getTabStyles("/user/applications")}>My Applications</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-5">
            {/* User Profile */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2"
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-black font-medium">
                  {user.avatar ? (
                    <div className="relative w-8 h-8">
                      <Image 
                        src={user.avatar} 
                        alt={user.name} 
                        fill
                        sizes="32px"
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : getInitials(user.name)}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                  <Link href="/user/account" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50">
                    <User className="w-4 h-4 mr-2" />
                    <span>Account </span>
                  </Link>
                  
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button onClick={handleLogout} className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-black"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4">
            <div className="py-3 px-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-black font-medium">
                  {user.avatar ? (
                    <div className="relative w-10 h-10">
                      <Image 
                        src={user.avatar} 
                        alt={user.name} 
                        fill
                        sizes="40px"
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : getInitials(user.name)}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-1 py-2">
              <Link href="/user" className={getMobileTabStyles("/user")}>Dashboard</Link>
              <Link href="/user/applications" className={getMobileTabStyles("/user/applications")}>My Applications</Link>
              <Link href="/user/account" className={getMobileTabStyles("/user/account")}>Account</Link>
            </nav>
            
            <div className="pt-2 border-t border-gray-100 mt-2">
              <button onClick={handleLogout} className="flex items-center px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;