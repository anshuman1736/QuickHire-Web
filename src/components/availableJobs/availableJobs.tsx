"use client";

import {
  Briefcase,
  MapPin,
  ArrowRight,
  Lock,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import React, { useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "@/lib/config";
import { JobPosting } from "@/types/job";

interface AvailableJobsProps {
  jobTitle?: string;
  skills?: string;
  companyName?: string;
  jobAddress?: string;
}

function AvailableJobs({
  jobTitle,
  skills,
  companyName,
  jobAddress,
}: AvailableJobsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const searchParams: {
    jobTitle?: string;
    skills?: string;
    companyName?: string;
    jobAddress?: string;
  } = {};
  if (jobTitle) searchParams.jobTitle = jobTitle;
  if (skills) searchParams.skills = skills;
  if (companyName) searchParams.companyName = companyName;
  if (jobAddress) searchParams.jobAddress = jobAddress;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobs", searchParams],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/home/filterJobs`, {
        params: searchParams,
      });
      return response.data;
    },
    enabled: true,
  });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white py-10 sm:py-16 overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Searching Jobs...
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full bg-white py-10 sm:py-16 overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4 text-red-600">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Error Loading Jobs
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {error?.message ||
                "Something went wrong while fetching jobs. Please try again."}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!data?.CONTENT || data.CONTENT.length === 0) {
    return (
      <section className="w-full bg-white py-10 sm:py-16 overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              No Jobs Found
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {`We couldn't find any jobs matching your search criteria. Try
              broadening your search or check back later.`}
            </p>
          </div>
          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="bg-amber-50 p-4 sm:p-6 md:p-8 rounded-xl max-w-xl w-full text-center">
              <div className="mb-4 text-blue-700">
                <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Tips for your job search
              </h3>
              <ul className="text-gray-700 text-left list-disc pl-5 space-y-1 sm:space-y-2">
                <li>Try using more general keywords</li>
                <li>Check for spelling errors in your search terms</li>
                <li>Remove location filter to see more opportunities</li>
                <li>Consider removing company name to see similar positions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const jobs = data.CONTENT;

  return (
    <section className="w-full bg-white py-10 sm:py-16 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Available Job Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover your next career move with our curated selection of{" "}
            {jobs.length} top positions from leading companies
          </p>
        </div>

        <div className="relative w-full">
          {jobs.length > 1 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg hover:bg-gray-100 hidden sm:block"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg hover:bg-gray-100 hidden sm:block"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>
            </>
          )}

          <div
            ref={scrollContainerRef}
            className="grid grid-cols-1 sm:flex sm:overflow-x-auto pb-6 gap-4 sm:gap-5 md:gap-6 w-full scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {jobs.map((job : JobPosting) => (
              <Link
                href="/login"
                key={job.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col relative group w-full sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px] max-w-none sm:max-w-[340px] snap-start"
              >
                <div className="h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-700 relative">
                  {job.jobType && (
                    <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white text-amber-600 text-xs font-bold px-2 py-1 rounded-full">
                      {job.jobType}
                    </span>
                  )}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-black text-xs sm:text-sm font-medium">
                    {job.categoryDTO?.categoryName || "Uncategorized"}
                  </div>
                </div>

                <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center p-4 transform transition-transform duration-300 group-hover:scale-105">
                    <div className="bg-white/90 rounded-xl p-4 shadow-lg">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <span className="inline-block py-2 px-4 bg-amber-600 text-white rounded-lg font-medium mt-2 hover:bg-amber-700 transition-colors">
                        Login to View
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-base sm:text-lg">
                      {job.jobTitle}
                    </h3>
                    <div className="bg-amber-50 text-amber-700 text-xs font-medium px-2 py-1 rounded hidden sm:block">
                      {job.jobType}
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {job.jobDescription}
                  </p>

                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-600">
                      {job.companyDTO?.companyName?.charAt(0) || "C"}
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      {job.companyDTO?.companyName}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                      <span className="truncate">{job.jobAddress}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                      <span className="truncate">{job.skills}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                      <span>
                        Posted {new Date(job.creationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/login"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center justify-center mx-auto w-full max-w-xs sm:max-w-sm"
          >
            Login to Access All Jobs
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AvailableJobs;
