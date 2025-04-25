"use client";

import {
  Briefcase,
  MapPin,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  LucideSearch,
  BookmarkPlus,
  Calendar,
  DollarSign,
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import Header from "./header";
import Link from "next/link";
import { MatchedJob } from "../../types/job";
import { useQuery } from "@tanstack/react-query";
import { getRecomdedJob } from "@/lib/queries";

export default function JobPortal() {
  const [activeTab, setActiveTab] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleJobs, setVisibleJobs] = useState<MatchedJob[]>([]);
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getRecomdedJob"],
    queryFn: () => {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");
      return getRecomdedJob(Number(userId));
    },
    enabled: typeof window !== "undefined" && !!localStorage.getItem("userId"),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const getJobLevelFromExperience = (experience: string | null): string => {
    if (!experience) return "Entry-Level";

    if (experience.includes("5+") || experience.includes("4+")) {
      return "Senior";
    } else if (experience.includes("3-5")) {
      return "Mid-Level";
    } else if (experience.includes("1-3")) {
      return "Junior";
    } else {
      return "Entry-Level";
    }
  };

  const getPostedDateText = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const categoryMap = useMemo<Record<number, string>>(
    () => ({
      1: "development",
      2: "datascience",
      3: "design",
      4: "marketing",
      5: "security",
      6: "management",
      7: "finance",
    }),
    []
  );

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "development", label: "Development" },
    { value: "datascience", label: "Data Science" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "security", label: "Security" },
    { value: "management", label: "Management" },
    { value: "finance", label: "Finance" },
  ];

  const experienceLevels = [
    { value: "all", label: "All Experience" },
    { value: "entry", label: "Entry Level (0-1 years)" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid", label: "Mid-Level (3-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "remote", label: "Remote" },
    { value: "san francisco", label: "San Francisco, CA" },
    { value: "new york", label: "New York, NY" },
    { value: "austin", label: "Austin, TX" },
    { value: "seattle", label: "Seattle, WA" },
    { value: "chicago", label: "Chicago, IL" },
    { value: "boston", label: "Boston, MA" },
  ];

  const salaryRanges = [
    { value: "all", label: "All Salaries" },
    { value: "under60k", label: "Under $60K" },
    { value: "60k-80k", label: "$60K - $80K" },
    { value: "80k-100k", label: "$80K - $100K" },
    { value: "100k-120k", label: "$100K - $120K" },
    { value: "above120k", label: "$120K+" },
  ];

  useEffect(() => {
    const filterJobs = () => {
      if (isPending) return;

      if (!data) {
        setVisibleJobs([]);
        return;
      }

      let jobsArray: MatchedJob[] = [];

      if ("matched_jobs" in data && Array.isArray(data.matched_jobs)) {
        jobsArray = data.matched_jobs;
      } else {
        setVisibleJobs([]);
        return;
      }

      if (jobsArray.length === 0) {
        setVisibleJobs([]);
        return;
      }

      let filtered = jobsArray;

      if (activeTab === "new") {
        const recentJobs = filtered.filter((job) => {
          const postedDate = getPostedDateText(job.creation_date);
          return postedDate.includes("day") || postedDate === "Today";
        });
        filtered = recentJobs.length > 0 ? recentJobs : filtered;
      } 

      if (searchQuery) {
        filtered = filtered.filter(
          (job) =>
            job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.job_description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            job.job_location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (job) => categoryMap[job.category_id] === selectedCategory
        );
      }

      if (experienceFilter !== "all") {
        if (experienceFilter === "entry") {
          filtered = filtered.filter(
            (job) => job.job_experience?.includes("0-1") || !job.job_experience
          );
        } else if (experienceFilter === "junior") {
          filtered = filtered.filter((job) =>
            job.job_experience?.includes("1-3")
          );
        } else if (experienceFilter === "mid") {
          filtered = filtered.filter((job) =>
            job.job_experience?.includes("3-5")
          );
        } else if (experienceFilter === "senior") {
          filtered = filtered.filter(
            (job) =>
              job.job_experience?.includes("5+") ||
              job.job_experience?.includes("4+")
          );
        }
      }

      if (locationFilter !== "all") {
        filtered = filtered.filter((job) =>
          job.job_location.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      if (salaryFilter !== "all") {
        if (salaryFilter === "under60k") {
          filtered = filtered.filter((job) => {
            const minSalary = parseInt(job.salary.split("$")[1].split("K")[0]);
            return minSalary < 60;
          });
        } else if (salaryFilter === "60k-80k") {
          filtered = filtered.filter((job) => {
            const minSalary = parseInt(job.salary.split("$")[1].split("K")[0]);
            const maxSalary = parseInt(job.salary.split("$")[2].split("K")[0]);
            return (
              (minSalary >= 60 && minSalary <= 80) ||
              (maxSalary >= 60 && maxSalary <= 80)
            );
          });
        } else if (salaryFilter === "80k-100k") {
          filtered = filtered.filter((job) => {
            const minSalary = parseInt(job.salary.split("$")[1].split("K")[0]);
            const maxSalary = parseInt(job.salary.split("$")[2].split("K")[0]);
            return (
              (minSalary >= 80 && minSalary <= 100) ||
              (maxSalary >= 80 && maxSalary <= 100)
            );
          });
        } else if (salaryFilter === "100k-120k") {
          filtered = filtered.filter((job) => {
            const minSalary = parseInt(job.salary.split("$")[1].split("K")[0]);
            const maxSalary = parseInt(job.salary.split("$")[2].split("K")[0]);
            return (
              (minSalary >= 100 && minSalary <= 120) ||
              (maxSalary >= 100 && maxSalary <= 120)
            );
          });
        } else if (salaryFilter === "above120k") {
          filtered = filtered.filter((job) => {
            const maxSalary = parseInt(job.salary.split("$")[2].split("K")[0]);
            return maxSalary > 120;
          });
        }
      }

      setVisibleJobs(filtered);
    };

    filterJobs();
  }, [
    activeTab,
    searchQuery,
    selectedCategory,
    experienceFilter,
    locationFilter,
    salaryFilter,
    data,
    isPending,
    categoryMap,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setExperienceFilter("all");
    setLocationFilter("all");
    setSalaryFilter("all");
    setActiveTab("featured");
    setAdvancedFiltersOpen(false);
  };

  interface Category {
    value: string;
    label: string;
  }

  const handleCategoryChange = (category: Category["value"]): void => {
    setSelectedCategory(category);
    setFilterOpen(false);
  };

  return (
    <section className="bg-gray-50 py-16 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <Header />
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mt-6 md:mt-0 w-full flex flex-col justify-center items-center">
            <div className="relative w-full md:w-96 mb-4">
              <input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg shadow-sm transition duration-300 ease-in-out"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <LucideSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {advancedFiltersOpen && (
              <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                  >
                    {experienceLevels.map((exp) => (
                      <option key={exp.value} value={exp.value}>
                        {exp.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    {locations.map((loc) => (
                      <option key={loc.value} value={loc.value}>
                        {loc.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={salaryFilter}
                    onChange={(e) => setSalaryFilter(e.target.value)}
                  >
                    {salaryRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs and Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="hidden md:flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "featured"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("featured")}
            >
              Featured
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "popular"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Popular
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "new"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Newest
            </button>
          </div>

          <div className="md:hidden w-full mb-4">
            <select
              className="w-full p-2 rounded-lg border border-gray-200 bg-white shadow-sm"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="new">Newest</option>
            </select>
          </div>

          <div className="w-full md:w-auto relative">
            <button
              className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                {
                  categories.find((cat) => cat.value === selectedCategory)
                    ?.label
                }
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {filterOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.value
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                    onClick={() => handleCategoryChange(category.value)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
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
            <h3 className="text-xl font-bold mb-2">Error loading jobs</h3>
            <p className="text-gray-500 mb-4">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again later."}
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => resetFilters()}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Success State */}
        {!isPending && !isError && (
          <>
            {visibleJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  {"Try adjusting your search or filters to find what you're looking for"}
                </p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleJobs.map((job) => {
                  const jobLevel = getJobLevelFromExperience(job.job_experience);
                  const postedDate = getPostedDateText(job.creation_date);

                  return (
                    <div
                      key={job.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 flex flex-col h-full"
                    >
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Company/Job Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-4">
                              { 'J'}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                                {job.job_title}
                              </h3>
                              
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-blue-500 transition-colors">
                            <BookmarkPlus className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Job Details */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                              {job.job_type}
                            </span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                              {jobLevel}
                            </span>
                            {job.job_location.toLowerCase().includes('remote') && (
                              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                Remote
                              </span>
                            )}
                          </div>

                          <div className="h-1 w-full bg-gray-300 mb-4"></div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {job.job_description}
                          </p>
                        </div>

                        {/* Meta Information */}
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center w-1/2">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{job.job_location}</span>
                            </div>
                            <div className="flex items-center w-1/2">
                              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center w-1/2">
                              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{job.job_experience || 'Entry Level'}</span>
                            </div>
                            <div className="flex items-center w-1/2">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              <span>Posted {postedDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            
                            <Link
                              href={`/user/${job.job_title}/${job.id}`}
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

        {/* View More Button */}
        {!isPending && !isError && visibleJobs.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center mx-auto shadow-sm hover:shadow-md">
              Browse All Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}