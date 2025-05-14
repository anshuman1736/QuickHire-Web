"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  LogOut,
  Home,
  PlusCircle,
  MessageSquare,
  FileText,
  Settings,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function CmpHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = {
    name: "Quick-Hire Pvt Ltd",
    avatar: null,
    role: "Software Developer",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check and set sidebar state from local storage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  // Save sidebar state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString());

    // Update main content margin
    const mainElement = document.querySelector("main");
    if (mainElement) {
      if (sidebarCollapsed) {
        mainElement.classList.remove("lg:ml-64");
        mainElement.classList.add("lg:ml-20");
      } else {
        mainElement.classList.remove("lg:ml-20");
        mainElement.classList.add("lg:ml-64");
      }
    }
  }, [sidebarCollapsed]);

  // Set initial main content margin on component mount
  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.classList.add(sidebarCollapsed ? "lg:ml-20" : "lg:ml-64");
      mainElement.classList.add("transition-all", "duration-300");
    }

    return () => {
      // Clean up classes when component unmounts
      if (mainElement) {
        mainElement.classList.remove(
          "lg:ml-64",
          "lg:ml-20",
          "transition-all",
          "duration-300"
        );
      }
    };
  }, []);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part: string) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-slate-900 text-white z-50 transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className={`p-6 flex ${sidebarCollapsed ? "justify-center" : ""}`}>
          <Link href="/company" className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="font-bold text-xl">QH</span>
            </div>
            {!sidebarCollapsed && (
              <span className="ml-3 font-bold text-xl">QuickHire</span>
            )}
          </Link>
        </div>

        {/* Toggle sidebar button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-5 -right-3 bg-slate-700 rounded-full p-1 text-gray-300 hover:text-white border border-slate-600 shadow-md"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className={`flex-1 ${sidebarCollapsed ? "px-2" : "px-4"} mt-6`}>
          <div className="space-y-1">
            <Link
              href="/company"
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : ""
              } px-4 py-3 text-sm font-medium rounded-lg ${
                pathname === "/company"
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
              title={sidebarCollapsed ? "Dashboard" : ""}
            >
              <Home className={`w-5 h-5 ${sidebarCollapsed ? "" : "mr-3"}`} />
              {!sidebarCollapsed && "Dashboard"}
            </Link>

            <Link
              href="/company/create-job"
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : ""
              } px-4 py-3 text-sm font-medium rounded-lg ${
                pathname === "/company/create-job"
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
              title={sidebarCollapsed ? "Post New Job" : ""}
            >
              <PlusCircle
                className={`w-5 h-5 ${sidebarCollapsed ? "" : "mr-3"}`}
              />
              {!sidebarCollapsed && "Post New Job"}
            </Link>

            <Link
              href="/company/job-application"
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : ""
              } px-4 py-3 text-sm font-medium rounded-lg ${
                pathname === "/company/job-application"
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
              title={sidebarCollapsed ? "Applications" : ""}
            >
              <FileText
                className={`w-5 h-5 ${sidebarCollapsed ? "" : "mr-3"}`}
              />
              {!sidebarCollapsed && "Applications"}
            </Link>
          </div>

          <div className="mt-10">
            {!sidebarCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Company
              </h3>
            )}
            <div className="mt-3 space-y-1">
              <Link
                href="/company/account"
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : ""
                } px-4 py-3 text-sm font-medium rounded-lg ${
                  pathname === "/company/account"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
                title={sidebarCollapsed ? "Company Profile" : ""}
              >
                <Settings
                  className={`w-5 h-5 ${sidebarCollapsed ? "" : "mr-3"}`}
                />
                {!sidebarCollapsed && "Company Profile"}
              </Link>
            </div>
          </div>

          <div className="mt-10">
            {!sidebarCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Sales
              </h3>
            )}
            <div className="mt-3 space-y-1">
              <Link
                href="/company/saleschat"
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : ""
                } px-4 py-3 text-sm font-medium rounded-lg ${
                  pathname === "/company/saleschat"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
                title={sidebarCollapsed ? "Company saleschat" : ""}
              >
                <MessageSquare
                  className={`w-5 h-5 ${sidebarCollapsed ? "" : "mr-3"}`}
                />
                {!sidebarCollapsed && "Chat"}
              </Link>
            </div>
          </div>
        </nav>

        {/* User profile */}
        <div
          className={`${
            sidebarCollapsed ? "p-2 mx-2" : "p-4 mx-4"
          } mt-6 mb-6 rounded-lg bg-slate-800`}
        >
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium shadow-md">
              {getInitials(user.name)}
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`mt-4 w-full flex items-center ${
              sidebarCollapsed ? "justify-center" : ""
            } ${
              sidebarCollapsed ? "px-2 py-2" : "px-4 py-2"
            } bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white`}
            title={sidebarCollapsed ? "Sign out" : ""}
          >
            <LogOut className={`w-4 h-4 ${sidebarCollapsed ? "" : "mr-2"}`} />
            {!sidebarCollapsed && "Sign out"}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/company" className="flex items-center">
              <div className="h-9 w-9 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="font-bold text-lg text-white">QH</span>
              </div>
              <span className="ml-2 font-bold text-lg text-gray-900">
                QuickHire
              </span>
            </Link>

            {/* User profile and menu button */}
            <div className="flex items-center space-x-2" ref={dropdownRef}>
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-md"
                >
                  {getInitials(user.name)}
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/company/settings"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Settings className="w-5 h-5 mr-3 text-teal-500" />
                        Company Profile
                      </Link>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {/* Navigation */}
                <nav className="py-4">
                  <div className="px-4 space-y-1">
                    <Link
                      href="/company"
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                        pathname === "/company"
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Home className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>

                    <Link
                      href="/company/create-job"
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                        pathname === "/company/create-job"
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusCircle className="w-5 h-5 mr-3" />
                      Post New Job
                    </Link>

                    <Link
                      href="/company/job-application"
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                        pathname === "/company/job-application"
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Briefcase className="w-5 h-5 mr-3" />
                      Applications
                    </Link>
                  </div>
                </nav>

                {/* Company section */}
                <div className="py-4">
                  <p className="px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Company
                  </p>

                  <div className="mt-3 px-4 space-y-1">
                    <Link
                      href="/company/account"
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                        pathname === "/company/account"
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Company Profile
                    </Link>
                  </div>
                </div>

                {/* chat section */}
                <div className="py-4">
                  <p className="px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sles
                  </p>

                  <div className="mt-3 px-4 space-y-1">
                    <Link
                      href="/company/saleschat"
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                        pathname === "/company/saleschat"
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MessageSquare className="w-5 h-5 mr-3" />
                      Chat
                    </Link>
                  </div>
                </div>
                {/* User profile */}
                <div className="py-6 px-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-lg font-medium shadow-md">
                      {getInitials(user.name)}
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-5 w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg text-base font-medium text-red-600"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile header padding */}
      <div className="lg:hidden h-16"></div>
    </>
  );
}

export default CmpHeader;
