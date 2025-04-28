"use client";
import { getFilteredJob } from "@/lib/queries";
import { IFiterJobParams, JobPosting } from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  AlertCircle,
  Building,
  X,
  Loader,
} from "lucide-react";

export default function FilterJobs() {
  const searchParams = useSearchParams();
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [salaryFilter, setSalaryFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const initialQuery: IFiterJobParams = {
    jobTitle: searchParams.get("jobTitle") || "",
    skills: searchParams.get("skills") || "",
    companyName: searchParams.get("companyName") || "",
    jobAddress: searchParams.get("jobAddress") || "",
  };

  const [searchQuery, setSearchQuery] = useState<IFiterJobParams>(initialQuery);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["filterJobs", searchQuery],
    queryFn: () => getFilteredJob(searchQuery),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    // Set initial search term from URL parameters
    if (initialQuery.jobTitle) {
      setSearchTerm(initialQuery.jobTitle);
    }
  }, [initialQuery.jobTitle]);

  const jobs: JobPosting[] = data?.CONTENT || [];

  // Filter jobs based on local filters
  const filteredJobs = jobs.filter((job) => {
    // Filter by job type
    if (jobTypeFilter !== "all" && job.jobType !== jobTypeFilter) {
      return false;
    }

    // Filter by experience
    if (experienceFilter !== "all") {
      const exp = job.experience.toLowerCase();
      if (
        experienceFilter === "entry" &&
        !exp.includes("0-1") &&
        !exp.includes("entry")
      ) {
        return false;
      }
      if (experienceFilter === "junior" && !exp.includes("1-3")) {
        return false;
      }
      if (experienceFilter === "mid" && !exp.includes("3-5")) {
        return false;
      }
      if (
        experienceFilter === "senior" &&
        !exp.includes("5+") &&
        !exp.includes("4+")
      ) {
        return false;
      }
    }

    // Filter by location
    if (
      locationFilter &&
      !job.jobLocation.toLowerCase().includes(locationFilter.toLowerCase())
    ) {
      return false;
    }

    // Filter by salary
    if (salaryFilter !== "all") {
      try {
        const salaryText = job.salary;
        const minSalary = parseInt(
          salaryText.split("$")[1]?.split("K")[0] || "0"
        );
        const maxSalary = parseInt(
          salaryText.split("$")[2]?.split("K")[0] || "0"
        );

        if (salaryFilter === "under60k" && minSalary >= 60) {
          return false;
        }
        if (
          salaryFilter === "60k-80k" &&
          (minSalary < 60 || minSalary > 80) &&
          (maxSalary < 60 || maxSalary > 80)
        ) {
          return false;
        }
        if (
          salaryFilter === "80k-100k" &&
          (minSalary < 80 || minSalary > 100) &&
          (maxSalary < 80 || maxSalary > 100)
        ) {
          return false;
        }
        if (salaryFilter === "above100k" && maxSalary <= 100) {
          return false;
        }
      } catch (e) {
        console.error("Error parsing salary:", e);
      }
    }

    // If passed all filters
    return true;
  });

  const handleSearch = () => {
    setSearchQuery({
      ...searchQuery,
      jobTitle: searchTerm,
    });
  };

  const resetFilters = () => {
    setJobTypeFilter("all");
    setExperienceFilter("all");
    setSalaryFilter("all");
    setLocationFilter("");
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Listings
          </h1>
          <p className="text-gray-600">Find your next career opportunity</p>
        </div>

        {/* Search and filter section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center border-2 border-gray-200 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search job title or keywords"
                  className="w-full outline-none text-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors"
            >
              Search Jobs
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 rounded-lg px-6 py-2 hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Advanced filters */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Remote">Remote</option>
                    <option value="Onsite">On-Site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="entry">Entry Level (0-1 years)</option>
                    <option value="junior">Junior (1-3 years)</option>
                    <option value="mid">Mid-Level (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <select
                    value={salaryFilter}
                    onChange={(e) => setSalaryFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Ranges</option>
                    <option value="under60k">Under $60K</option>
                    <option value="60k-80k">$60K - $80K</option>
                    <option value="80k-100k">$80K - $100K</option>
                    <option value="above100k">Above $100K</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="Enter location..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center"
                >
                  <X className="w-4 h-4 mr-1" /> Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Job listings */}
        <div className="space-y-6">
          {isPending ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center">
                <Loader className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                <p className="text-gray-500">Loading jobs...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-red-50 p-8 rounded-xl text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error loading jobs
              </h3>
              <p className="text-red-600 mb-4">
                {(error as Error)?.message ||
                  "An unexpected error occurred. Please try again later."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No matching jobs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to see more
                results.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">{filteredJobs.length}</span>{" "}
                  job{filteredJobs.length !== 1 ? "s" : ""}
                </p>
              </div>

              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <Building className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                              {job.jobTitle}
                            </h2>
                            <p className="text-gray-600 text-sm">
                              {job.companyDTO.companyName}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mt-3 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{job.jobLocation}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{job.jobType}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{job.experience || "Not specified"}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {job.jobDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {/* {job.skills.split(",").map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                            >
                              {skill.trim()}
                            </span>
                          ))} */}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                        <span className="text-sm text-gray-500 mb-3 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(job.creationDate)}
                        </span>
                        <Link
                          href={`/user/${encodeURIComponent(job.jobTitle)}/${
                            job.id
                          }`}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          View Job
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Just a custom search icon component for the empty state
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
