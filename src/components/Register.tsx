"use client";

import { useState } from "react";
import { User, Building2 } from "lucide-react";
import UserRegistration from "./user/UserRegistration";
import CompanyRegistration from "./company/CompanyRegistration";

export default function Register() {
  const [userType, setUserType] = useState<"individual" | "company">(
    "individual"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Account Type Selector */}
      <div className="flex justify-center space-x-4 pt-8">
        <button
          type="button"
          onClick={() => setUserType("individual")}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            userType === "individual"
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <User className="h-4 w-4 mr-2" />
          Individual
        </button>
        <button
          type="button"
          onClick={() => setUserType("company")}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            userType === "company"
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Company
        </button>
      </div>

      {/* Render appropriate registration form based on user type */}
      {userType === "individual" ? (
        <UserRegistration />
      ) : (
        <CompanyRegistration />
      )}
    </div>
  );
}
