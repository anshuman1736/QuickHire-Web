"use client";

import { useState } from "react";
import { User, Building2 } from "lucide-react";
import UserRegistration from "./user/UserRegistration";
import CompanyRegistration from "./company/CompanyRegistration";
import SalesRegister from "./chatApp/SalesRegister";

export default function Register() {
  const [userType, setUserType] = useState<"individual" | "company" | "sales">(
    "individual"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex justify-center space-x-4 pt-8">
        <button
          type="button"
          onClick={() => setUserType("individual")}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            userType === "individual"
              ? "bg-blue-500 text-white shadow-md"
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
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Company
        </button>
        <button
          type="button"
          onClick={() => setUserType("sales")}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            userType === "sales"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Building2 className="h-4 w-4 mr-2" />
          sales
        </button>
      </div>

      {userType === "individual" ? (
        <UserRegistration />
      ) : userType === "company" ? (
        <CompanyRegistration />
      ) : (
        <SalesRegister />
      )}
    </div>
  );
}
