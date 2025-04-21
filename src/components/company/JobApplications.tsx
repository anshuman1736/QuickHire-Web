"use client";

import { getJobByCompanyId } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function JobApplicaiton() {
  const token = localStorage.getItem("sessionId") || "";
  const companyId = Number(localStorage.getItem("companyId"));
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["jobByCompanyId"],
    queryFn: () => getJobByCompanyId(companyId, token),
    enabled: !!token,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-20 mt-6 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl text-gray-700">Loading job posts...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-20 mt-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500 max-w-lg">
          <h2 className="text-2xl text-red-600 font-bold mb-4">
            Error Loading Jobs
          </h2>
          <p className="text-gray-700">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getPostedTime = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Recently";
    }
  };

  const jobPosts = data?.CONTENT || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-20 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Job History Dashboard
        </h1>

        {jobPosts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">
              No job postings found
            </h2>
            <p className="text-gray-500 mb-6">
              Start creating job listings to attract candidates
            </p>
            <Link
              href="/company/post-job"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md"
            >
              Create Job Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {jobPosts.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {job.jobTitle}
                        </h2>
                        <h3 className="text-lg text-gray-600">
                          {job.companyDTO?.companyName || "Company Name"}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(job.skills?.split(",") || []).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
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
                          <span className="text-gray-600">
                            {job.jobLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-600">
                            {job.experience || "Not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-600">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-600">
                            {getPostedTime(job.creationDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div className="bg-green-100 px-4 py-2 rounded-lg">
                        <span className="text-green-800 font-semibold">
                          {0} Applications
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                          {job.jobType}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {job.enabled ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md">
                      Update Post
                    </button>
                    <Link
                      href={`/company/job-application/${job.id}/candidates`}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md"
                    >
                      View Candidates
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
