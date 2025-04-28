"use client";

import {
  Briefcase,
  MapPin,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  BookmarkPlus,
  Calendar,
  DollarSign,
  Building2,
  BookOpen,
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import Header from "./header";
import Link from "next/link";
import { MatchedJob } from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import { getRecomdedJob } from "@/lib/queries";
import { useRouter } from "next/navigation";

export default function JobPortal() {
  const [activeTab, setActiveTab] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleJobs, setVisibleJobs] = useState<MatchedJob[]>([]);
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    skills: "",
    companyName: "",
    jobAddress: "",
  });

  const router = useRouter();

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
  };

  const handleInputChange = (
    field: keyof typeof searchParams,
    value: string
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  interface Category {
    value: string;
    label: string;
  }

  const handleCategoryChange = (category: Category["value"]): void => {
    setSelectedCategory(category);
    setFilterOpen(false);
  };

  function handleSearch() {
    const { jobTitle, skills, companyName, jobAddress } = searchParams;
    
    // Create a URLSearchParams object to build the query string
    const queryParams = new URLSearchParams();
    if (jobTitle) queryParams.append("jobTitle", jobTitle);
    if (skills) queryParams.append("skills", skills);
    if (companyName) queryParams.append("companyName", companyName);
    if (jobAddress) queryParams.append("jobAddress", jobAddress);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/jobs?${queryString}` : "/jobs";
    
    router.push(url);
  }

  return (
    <section className="bg-gray-50 py-16 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <Header />

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Find Your Next Opportunity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label
                htmlFor="jobTitle"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Job Title
              </label>
              <div
                className={`flex items-center border-2 ${
                  focusedField === "jobTitle"
                    ? "border-amber-500 shadow-md"
                    : "border-gray-200"
                } rounded-xl px-4 py-3 bg-white transition-all`}
              >
                <Briefcase
                  className={`w-5 h-5 ${
                    focusedField === "jobTitle"
                      ? "text-amber-600"
                      : "text-gray-400"
                  } mr-3`}
                />
                <input
                  id="jobTitle"
                  type="text"
                  placeholder="Software Engineer, Designer..."
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                  value={searchParams.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  onFocus={() => setFocusedField("jobTitle")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="skills"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Skills
              </label>
              <div
                className={`flex items-center border-2 ${
                  focusedField === "skills"
                    ? "border-amber-500 shadow-md"
                    : "border-gray-200"
                } rounded-xl px-4 py-3 bg-white transition-all`}
              >
                <BookOpen
                  className={`w-5 h-5 ${
                    focusedField === "skills"
                      ? "text-amber-600"
                      : "text-gray-400"
                  } mr-3`}
                />
                <input
                  id="skills"
                  type="text"
                  placeholder="React, Python, Design..."
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                  value={searchParams.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  onFocus={() => setFocusedField("skills")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="companyName"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Company
              </label>
              <div
                className={`flex items-center border-2 ${
                  focusedField === "companyName"
                    ? "border-amber-500 shadow-md"
                    : "border-gray-200"
                } rounded-xl px-4 py-3 bg-white transition-all`}
              >
                <Building2
                  className={`w-5 h-5 ${
                    focusedField === "companyName"
                      ? "text-amber-600"
                      : "text-gray-400"
                  } mr-3`}
                />
                <input
                  id="companyName"
                  type="text"
                  placeholder="Google, Microsoft..."
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                  value={searchParams.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  onFocus={() => setFocusedField("companyName")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="jobAddress"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Location
              </label>
              <div
                className={`flex items-center border-2 ${
                  focusedField === "jobAddress"
                    ? "border-amber-500 shadow-md"
                    : "border-gray-200"
                } rounded-xl px-4 py-3 bg-white transition-all`}
              >
                <MapPin
                  className={`w-5 h-5 ${
                    focusedField === "jobAddress"
                      ? "text-amber-600"
                      : "text-gray-400"
                  } mr-3`}
                />
                <input
                  id="jobAddress"
                  type="text"
                  placeholder="New York, Remote..."
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                  value={searchParams.jobAddress}
                  onChange={(e) =>
                    handleInputChange("jobAddress", e.target.value)
                  }
                  onFocus={() => setFocusedField("jobAddress")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-medium flex items-center justify-center transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-11"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-1.5" />
              <span className="text-sm">Search Jobs</span>
            </button>
          </div>
        </div>

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

        {isPending && (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

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

        {!isPending && !isError && (
          <>
            {visibleJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  {
                    "Try adjusting your search or filters to find what you're looking for"
                  }
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
                  const jobLevel = getJobLevelFromExperience(
                    job.job_experience
                  );
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
                              {"J"}
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
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                              {job.job_type}
                            </span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                              {jobLevel}
                            </span>
                            {job.job_location
                              .toLowerCase()
                              .includes("remote") && (
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
                        s{" "}
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
                              <span>{job.job_experience || "Entry Level"}</span>
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
