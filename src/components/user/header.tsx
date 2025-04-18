"use client"

import React, { useState, useEffect } from "react";
import { Briefcase, Bell, MessageSquare, User, Menu, X, ChevronDown, Bookmark, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [activePath, setActivePath] = useState("/user");

  const router = useRouter()

  const user = {
    name: "Alex Johnson",
    avatar: null,
    role: "Software Developer",
    unreadNotifications: 3,
    unreadMessages: 2
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part: string) => part[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

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


  const handleLogout = ()=>{
      localStorage.clear()
      router.push('/')
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
            <Link href="/saved" className={getTabStyles("/saved")}>Saved Jobs</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-5">
            <div className="relative">
              <button 
                className="relative text-gray-500 hover:text-black"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setMessagesOpen(false);
                  setProfileDropdownOpen(false);
                }}
              >
                <Bell className="w-5 h-5" />
                {user.unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {user.unreadNotifications}
                  </span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-xs text-black hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <Link href="#" className="block px-4 py-3 hover:bg-blue-50 border-l-2 border-blue-500">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-4 h-4 text-black" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Your profile was viewed by a recruiter at TechCorp</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="#" className="block px-4 py-3 hover:bg-blue-50 border-l-2 border-blue-500">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Briefcase className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Application status updated for Senior Frontend Developer</p>
                          <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="#" className="block px-4 py-3 hover:bg-blue-50">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Bookmark className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">New job matching your preferences: UX Designer at Creative Studio</p>
                          <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2">
                    <Link href="/notifications" className="text-sm text-black hover:underline">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Messages */}
            <div className="relative">
              <button 
                className="relative text-gray-500 hover:text-black"
                onClick={() => {
                  setMessagesOpen(!messagesOpen);
                  setNotificationsOpen(false);
                  setProfileDropdownOpen(false);
                }}
              >
                <MessageSquare className="w-5 h-5" />
                {user.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {user.unreadMessages}
                  </span>
                )}
              </button>
              
              {messagesOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium">Messages</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <Link href="#" className="block px-4 py-3 hover:bg-blue-50 border-l-2 border-blue-500">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          RS
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Rachel Smith</p>
                          <p className="text-xs text-gray-500 truncate">Hi Alex, I&apos;d like to discuss the position...</p>
                          <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="#" className="block px-4 py-3 hover:bg-blue-50 border-l-2 border-blue-500">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          TT
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">TechCorp Team</p>
                          <p className="text-xs text-gray-500 truncate">Thanks for your application! We&apos;d like to schedule...</p>
                          <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2">
                    <Link href="/messages" className="text-sm text-black hover:underline">View all messages</Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2"
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                  setMessagesOpen(false);
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
              className="relative text-gray-500 hover:text-black"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-5 h-5" />
              {user.unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {user.unreadNotifications}
                </span>
              )}
            </button>
            
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
              <Link href="/saved" className={getMobileTabStyles("/saved")}>Saved Jobs</Link>
              <Link href="/messages" className={`${getMobileTabStyles("/messages")} flex items-center justify-between`}>
                Messages
                {user.unreadMessages > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {user.unreadMessages}
                  </span>
                )}
              </Link>
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