"use client";

import { getJobByCompanyId } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JobApplication() {
  const [token, setToken] = useState("");
  const [companyId, setCompanyId] = useState<number>(0);

  useEffect(() => {
    setToken(localStorage.getItem("sessionId") || "");
    setCompanyId(Number(localStorage.getItem("companyId")));
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["jobByCompanyId"],
    queryFn: () => getJobByCompanyId(companyId, token),
    enabled: !!token,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20 flex items-center justify-center ">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl font-medium text-gray-700">Loading your job postings...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-red-500 max-w-lg w-full mx-4">
          <h2 className="text-2xl text-red-600 font-bold mb-4">
            Error Loading Jobs
          </h2>
          <p className="text-gray-700">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90 transition duration-200 shadow-lg font-medium"
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {jobPosts.length === 0 ? (
          <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-lg text-center border border-gray-100 mx-4">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 sm:h-20 w-16 sm:w-20 text-blue-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                No Job Postings Found
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Create your first job listing to start attracting talented candidates to your company.
              </p>
              <Link
                href="/company/post-job"
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90 transition duration-200 shadow-lg font-medium"
              >
                Post Your First Job
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 px-2">
              <p className="text-gray-600 font-medium mb-2 sm:mb-0">
                Displaying {jobPosts.length} job {jobPosts.length === 1 ? 'posting' : 'postings'}
              </p>
              <div className="text-gray-500 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            
            {jobPosts.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden mx-1 sm:mx-0"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            {job.jobTitle}
                          </h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {job.enabled ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <h3 className="text-lg text-gray-600 mt-1">
                          {job.companyDTO?.companyName || "Company Name"}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(job.skills?.split(",") || []).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500 flex-shrink-0"
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
                          <span className="text-gray-700 font-medium">
                            {job.jobLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-700 font-medium truncate">
                            {job.experience || "Experience not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500 flex-shrink-0"
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
                          <span className="text-gray-700 font-medium truncate">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500 flex-shrink-0"
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
                          <span className="text-gray-700 font-medium">
                            Posted {getPostedTime(job.creationDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap mt-4 lg:mt-0 lg:flex-col lg:items-end gap-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-lg text-sm font-medium">
                          {job.jobType}
                        </span>
                        <span className="text-gray-500 text-sm font-medium">
                          {job.categoryDTO.categoryName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Education: </span>
                      <span className="text-gray-700 font-medium">{job.jobEligibility}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={{
                          pathname: "/company/update-job",
                          query: {
                            id: job.id,
                            jobTitle: job.jobTitle,
                            categoryId: job.categoryId,
                            jobCategory: job.categoryDTO.categoryName,
                            jobType: job.jobType,
                            skills: job.skills,
                            joblocation: job.jobLocation,
                            experience: job.experience,
                            salary: job.salary,
                            description: job.jobDescription,
                            education: job.jobEligibility,
                            jobAddress: job.jobAddress,
                          },
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition duration-200 font-medium flex items-center justify-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <Link
                        href={`/company/job-application/${job.id}/candidates`}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90 transition duration-200 shadow-md font-medium flex items-center justify-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        View Candidates
                      </Link>
                    </div>
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