"use client";

import {
  Briefcase,
  MapPin,
  Search,
  ArrowRight,
  Calendar,
  DollarSign,
  Trash2,
} from "lucide-react";
import { getBookmarkJobs } from "@/lib/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { removeBookmarkJob } from "@/lib/postData";
import { errorToast, successToast } from "@/lib/toast";
// import { useRouter } from "next/navigation";

export function SavedJobsComp() {
  //   const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: () =>
      getBookmarkJobs(
        Number(localStorage.getItem("userId")),
        localStorage.getItem("sessionId") as string
      ),
    refetchOnWindowFocus: false,
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: removeBookmarkJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
      setTimeout(() => {
        successToast("Job removed from bookmarks successfully!");
      }, 1000);
    },
    onError: (error) => {
      errorToast("Error removing bookmark. Please try again.");
      console.error("Remove bookmark error:", error);
    },
  });

  const handleRemoveBookmark = (jobId: number) => {
    const form = {
      jobId: jobId,
      userId: Number(localStorage.getItem("userId")),
      token: localStorage.getItem("sessionId") as string,
    };
    removeBookmarkMutation.mutate(form);
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Saved Jobs
          </h2>

          <div className="w-full md:w-64 relative">
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-2 bg-white">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search saved jobs..."
                className="w-full outline-none text-gray-800"
              />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Error loading saved jobs</h3>
            <p className="text-gray-500 mb-4">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again later."}
            </p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {data?.CONTENT.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No saved jobs found</h3>
                <p className="text-gray-500 mb-4">
                  You haven&apos;t saved any jobs yet. Browse jobs and bookmark
                  the ones you&apos;re interested in!
                </p>
                <Link
                  href="/user/jobs"
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  Browse Jobs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.CONTENT.map((job) => {
                  return (
                    <div
                      key={job.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 flex flex-col h-full"
                    >
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-4">
                              {job.jobTitle?.[0] || "J"}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                                {job.jobTitle}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {job.companyDTO.companyName || "Company"}
                              </p>
                            </div>
                          </div>
                          <button
                            className="text-red-400 hover:text-red-600 transition-colors"
                            onClick={() => handleRemoveBookmark(job.id)}
                            title="Remove from saved jobs"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                              {job.jobEligibility}
                            </span>

                            {job.jobAddress
                              .toLowerCase()
                              .includes("remote") && (
                              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                Remote
                              </span>
                            )}
                          </div>

                          <div className="h-1 w-full bg-gray-300 mb-4"></div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {job.jobDescription}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="flex flex-col gap-y-2 text-sm text-gray-500 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                                <span className="truncate">
                                  {job.jobLocation}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                                <span>
                                  {job.jobEligibility || "Entry Level"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                                <span>Posted {job.creationDate}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <Link
                              href={`/user/${job.jobTitle}/${job.id}`}
                              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-end"
                            >
                              Apply Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
