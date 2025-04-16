"use client";
import Link from "next/link";
import React from "react";

function JobView() {
  const mockData = {
    STS: "200",
    MSG: "Job Fetched Successfully",
    CONTENT: {
      id: 1,
      jobTitle: "Android developer ",
      jobDescription: "this is the description ",
      jobAddress: "address",
      jobLocation: "Google mcom ",
      salary: "12345",
      jobType: "Remote",
      enabled: true,
      categoryId: 1,
      creationDate: 1727981098972,
      companyDTO: {
        id: 1,
        companyName: "Quickhire",
        cinNumber: "123456789",
        cinCertificate:
          "https://firebasestorage.googleapis.com/v0/b/quickhire-1eba1.appspot.com/o/Certificates%2F1727930086740?alt=media&token=040d184b-e340-488c-8598-aa56d6b5debe",
        email: "quickhire@gmail.com",
        phoneNo: null,
        creationDate: 1727930096128,
        profile_Pic:
          "https://firebasestorage.googleapis.com/v0/b/quickhire-1eba1.appspot.com/o/ProfilePic%2FProvider%2F1727930073319?alt=media&token=7cea6270-74e7-4234-b656-c1b49228df48",
        completeProfile: false,
        categoryId: 1,
        categoryName: "Technology",
      },
      categoryDTO: {
        id: 1,
        categoryName: "Technology",
        categoryDescription: "This is the Technology",
      },
    },
  };

  const job = mockData.CONTENT;
  const company = job.companyDTO;
  const category = job.categoryDTO;

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 mt-10 to-gray-100 w-full p-4 pt-16 md:p-6 md:pt-16">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/user"
          className="flex items-center mb-6 text-gray-700 hover:text-[#FFBF2F] font-medium transition duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform hover:scale-[1.005] transition-all duration-300">
          <div className="bg-gradient-to-r from-[#FFBF2F] to-[#FFD700] h-24"></div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="relative -mt-16 md:mr-6">
                  <div className="w-24 h-24 rounded-xl border-4 border-white bg-white shadow-lg overflow-hidden">
                    <img
                      src={company.profile_Pic}
                      alt={company.companyName}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {job.jobTitle}
                  </h1>
                  <div className="flex items-center mt-2">
                    <p className="text-gray-600 text-lg">
                      {company.companyName}
                    </p>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {category.categoryName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex items-center">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-sm mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Active
                </span>
                <button className="bg-gradient-to-r from-[#FFBF2F] to-[#FFD700] hover:from-[#F0B020] hover:to-[#F0C000] text-white font-bold py-2 px-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center ml-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                    />
                  </svg>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg mb-8 p-1 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center p-4 sm:border-r sm:border-b md:border-b-0 border-gray-100">
              <div className="bg-amber-50 p-3 rounded-full mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-gray-800 font-medium truncate">
                  {job.jobLocation}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 sm:border-b md:border-b-0 md:border-r border-gray-100">
              <div className="bg-green-50 p-3 rounded-full mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">Salary</p>
                <p className="text-gray-800 font-medium truncate">
                  ${Number(job.salary).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 sm:border-r md:border-r border-gray-100">
              <div className="bg-yellow-50 p-3 rounded-full mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">Job Type</p>
                <p className="text-gray-800 font-medium truncate">
                  {job.jobType}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4">
              <div className="bg-blue-50 p-3 rounded-full mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">Posted On</p>
                <p className="text-gray-800 font-medium truncate">
                  {formatDate(job.creationDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Job Description
              </h2>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.jobDescription ||
                    "Join our team as an Android developer and contribute to exciting mobile projects. You'll be responsible for designing and building advanced applications for the Android platform, collaborating with cross-functional teams, and implementing new features."}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Office Address
              </h2>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex items-start">
                <p className="text-gray-700 leading-relaxed">
                  {job.jobAddress}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
                Apply for this Position
              </h2>
              <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ready to join {company.companyName}?
                  </h3>
                  <p className="text-gray-700">
                    Submit your application now and take the next step in your
                    career journey.
                  </p>
                  <div className="mt-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Quick application process
                    </span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Response within 48 hours
                    </span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-[#FFBF2F] to-[#FFD700] hover:from-[#F0B020] hover:to-[#F0C000] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-lg">Apply Now</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Application Process
              </h2>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center mr-4">
                    <div className="bg-[#FFBF2F] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Submit Application
                    </h3>
                    <p className="text-gray-600">
                      Fill out the application form with your personal details
                      and upload your resume.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center mr-4">
                    <div className="bg-[#FFBF2F] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Initial Screening
                    </h3>
                    <p className="text-gray-600">
                      Our hiring team will review your application and contact
                      you for an initial screening call.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center mr-4">
                    <div className="bg-[#FFBF2F] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Technical Assessment
                    </h3>
                    <p className="text-gray-600">
                      Complete a technical assessment to demonstrate your
                      Android development skills.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center mr-4">
                    <div className="bg-[#FFBF2F] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Final Interview & Offer
                    </h3>
                    <p className="text-gray-600">
                      Meet with the team for a final interview followed by an
                      offer if selected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-[#FFBF2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Company Profile
              </h2>

              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-xl mb-4 overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={company.profile_Pic}
                    alt={company.companyName}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {company.companyName}
                </h3>
                <div className="mt-1 px-3 py-1 bg-blue-50 rounded-full">
                  <p className="text-blue-700 text-sm font-medium">
                    {category.categoryName}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-amber-50 rounded-lg transition-all duration-300 hover:bg-amber-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#FFBF2F] mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-700">{company.email}</p>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <p className="text-gray-700">CIN: {company.cinNumber}</p>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-700">
                    Joined: {formatDate(company.creationDate)}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-8">
                <button className="w-full bg-gradient-to-r from-[#FFBF2F] to-[#FFD700] hover:from-[#F0B020] hover:to-[#F0C000] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                    />
                  </svg>
                  Apply Now
                </button>
              </div>

              {/* Company Rating */}
              <div className="mt-8 bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-2">
                  Company Rating
                </h3>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#FFBF2F]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-700">4.8 (120 reviews)</span>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-2">Why Join Us?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">
                      Competitive salary & benefits
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">
                      Professional growth opportunities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">
                      Dynamic and innovative work environment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobView;
