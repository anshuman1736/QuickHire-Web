"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function Unauthorized() {
  const { isAuthenticated, role } = useAuth();
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "ROLE_USER") {
        setRedirectPath("/user");
      } else if (role === "ROLE_COMPANY") {
        setRedirectPath("/company");
      }
    } else {
      setRedirectPath("/");
    }
  }, [isAuthenticated, role]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to access this page. This area requires
          different user privileges.
        </p>
        <div className="border-t border-gray-200 pt-6">
          <Link
            href={redirectPath}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
