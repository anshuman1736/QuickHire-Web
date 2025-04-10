"use client";

import {
  Briefcase,
  MapPin,
  Star,
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

function JobPortal() {
  const [activeTab, setActiveTab] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleJobs, setVisibleJobs] = useState<
    {
      id: number;
      title: string;
      level: string;
      applicants: number;
      rating: number;
      salary: string;
      category: string;
      badge?: string;
      company: string;
      location: string;
      experience: string;
      type: string;
      postedDate: string;
      description: string;
      companyLogo: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const jobs = useMemo(() => [
    {
      id: 1,
      title: "Senior Frontend Developer",
      level: "Senior",
      applicants: 48,
      rating: 4.8,
      salary: "$90K - $120K",
      category: "development",
      badge: "Urgent",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      experience: "5+ years",
      type: "Full-time",
      postedDate: "2 days ago",
      description:
        "Lead the development of modern web applications using React and Next.js",
      companyLogo: "TC",
    },
    {
      id: 2,
      title: "Data Scientist",
      level: "Mid-Level",
      applicants: 36,
      rating: 4.7,
      salary: "$85K - $110K",
      category: "datascience",
      badge: "New",
      company: "Analytics Pro",
      location: "Remote",
      experience: "3-5 years",
      type: "Full-time",
      postedDate: "1 day ago",
      description:
        "Analyze complex datasets and build predictive models for business intelligence",
      companyLogo: "AP",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      level: "Junior",
      applicants: 64,
      rating: 4.5,
      salary: "$65K - $85K",
      category: "design",
      company: "Creative Studio",
      location: "New York, NY",
      experience: "1-3 years",
      type: "Full-time",
      postedDate: "5 days ago",
      description:
        "Create user-centered designs and prototypes for web and mobile applications",
      companyLogo: "CS",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      level: "Senior",
      applicants: 29,
      rating: 4.9,
      salary: "$100K - $130K",
      category: "development",
      company: "Cloud Systems Inc.",
      location: "Austin, TX",
      experience: "5+ years",
      type: "Full-time",
      postedDate: "3 days ago",
      description:
        "Manage CI/CD pipelines and cloud infrastructure on AWS and Azure",
      companyLogo: "CS",
    },
    {
      id: 5,
      title: "Machine Learning Engineer",
      level: "Senior",
      applicants: 42,
      rating: 4.8,
      salary: "$110K - $150K",
      category: "datascience",
      badge: "Featured",
      company: "AI Innovations",
      location: "Seattle, WA",
      experience: "4+ years",
      type: "Full-time",
      postedDate: "1 week ago",
      description:
        "Develop and deploy machine learning models for real-world applications",
      companyLogo: "AI",
    },
    {
      id: 6,
      title: "Marketing Specialist",
      level: "Mid-Level",
      applicants: 53,
      rating: 4.4,
      salary: "$60K - $80K",
      category: "marketing",
      company: "Growth Tactics",
      location: "Chicago, IL",
      experience: "2-4 years",
      type: "Full-time",
      postedDate: "4 days ago",
      description:
        "Plan and execute digital marketing campaigns and analyze performance metrics",
      companyLogo: "GT",
    },
    {
      id: 7,
      title: "Cybersecurity Analyst",
      level: "Senior",
      applicants: 31,
      rating: 4.7,
      salary: "$95K - $125K",
      category: "security",
      badge: "Urgent",
      company: "SecureNet Defense",
      location: "Washington, DC",
      experience: "5+ years",
      type: "Full-time",
      postedDate: "3 days ago",
      description:
        "Monitor and protect systems from cyber threats and implement security protocols",
      companyLogo: "SN",
    },
    {
      id: 8,
      title: "Product Manager",
      level: "Senior",
      applicants: 47,
      rating: 4.6,
      salary: "$100K - $130K",
      category: "management",
      company: "Innovate Products",
      location: "Boston, MA",
      experience: "4+ years",
      type: "Full-time",
      postedDate: "1 week ago",
      description:
        "Lead product development from concept to launch and manage the roadmap",
      companyLogo: "IP",
    },
    {
      id: 9,
      title: "Backend Developer",
      level: "Mid-Level",
      applicants: 39,
      rating: 4.5,
      salary: "$80K - $100K",
      category: "development",
      company: "ServerTech Solutions",
      location: "Denver, CO",
      experience: "3-5 years",
      type: "Remote",
      postedDate: "6 days ago",
      description:
        "Build scalable APIs and microservices using Node.js and Python",
      companyLogo: "ST",
    },
    {
      id: 10,
      title: "Financial Analyst",
      level: "Junior",
      applicants: 58,
      rating: 4.3,
      salary: "$55K - $75K",
      category: "finance",
      badge: "New",
      company: "Global Finance Corp",
      location: "Miami, FL",
      experience: "1-3 years",
      type: "Full-time",
      postedDate: "2 days ago",
      description:
        "Analyze financial data and prepare reports to guide business decisions",
      companyLogo: "GF",
    },
  ], []);

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
      setIsLoading(true);

      setTimeout(() => {
        let filtered = [...jobs];

        if (activeTab === "popular") {
          filtered = filtered.sort((a, b) => b.applicants - a.applicants);
        } else if (activeTab === "new") {
          filtered = filtered.filter(
            (job) => job.badge === "New" || job.postedDate.includes("day")
          );
        } else if (activeTab === "urgent") {
          filtered = filtered.filter(
            (job) => job.badge === "Urgent" || job.badge === "Featured"
          );
        }

        if (searchQuery) {
          filtered = filtered.filter(
            (job) =>
              job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (selectedCategory !== "all") {
          filtered = filtered.filter((job) => job.category === selectedCategory);
        }

        // Filter by experience
        if (experienceFilter !== "all") {
          if (experienceFilter === "entry") {
            filtered = filtered.filter((job) => job.experience.includes("0-1"));
          } else if (experienceFilter === "junior") {
            filtered = filtered.filter((job) => job.experience.includes("1-3"));
          } else if (experienceFilter === "mid") {
            filtered = filtered.filter((job) => job.experience.includes("3-5"));
          } else if (experienceFilter === "senior") {
            filtered = filtered.filter(
              (job) =>
                job.experience.includes("5+") || job.experience.includes("4+")
            );
          }
        }

        if (locationFilter !== "all") {
          filtered = filtered.filter((job) =>
            job.location.toLowerCase().includes(locationFilter.toLowerCase())
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
        setIsLoading(false);
      }, 500);
    };
    
    filterJobs();
  }, [
    activeTab,
    searchQuery,
    selectedCategory,
    experienceFilter,
    locationFilter,
    salaryFilter,
    jobs
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
    <section className="bg-white py-16 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <Header />
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 ">
          {/* Search Bar with Filters */}
          <div className="mt-6 md:mt-0 w-full flex flex-col justify-center items-center">
            <div className="relative w-full md:w-96 mb-4">
              <input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg shadow-lg transition duration-300 ease-in-out"
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

            {/* Advanced Filters */}
            {advancedFiltersOpen && (
              <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg p-4 mb-6 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="hidden md:flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "featured"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("featured")}
            >
              Featured
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "popular"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Popular
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "new"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Newest
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "urgent"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("urgent")}
            >
              Urgent
            </button>
          </div>

          {/* Mobile Tab Select */}
          <div className="md:hidden w-full mb-4">
            <select
              className="w-full p-2 rounded-lg border border-gray-200 bg-white"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="new">Newest</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto relative">
            <button
              className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white border border-gray-200 rounded-lg"
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
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {visibleJobs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  {"Try adjusting your search or filters to find what you're"}
                  {"looking for"}
                </p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {visibleJobs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col"
                  >
                    <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-700 relative">
                      {job.badge && (
                        <span className="absolute top-4 right-4 bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                          {job.badge}
                        </span>
                      )}
                      <div className="absolute bottom-4 left-4 bg-white backdrop-blur-sm px-3 py-1 rounded-full text-black text-sm font-medium">
                        {job.level}
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <div className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                          {job.type}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                          {job.companyLogo}
                        </div>
                        <span className="font-medium">{job.company}</span>
                      </div>

                      <div className="text-sm text-gray-500 mb-4">
                        <div className="flex items-center mb-1">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>Posted {job.postedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-auto mb-2">
                        <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                        <span className="font-medium">{job.rating}</span>
                        <span className="text-gray-500 text-sm">
                          ({job.applicants} applicants)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/user/${job.level}/${job.id}`}
                          className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          Apply Now
                        </Link>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
                          <BookmarkPlus className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {visibleJobs.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center mx-auto">
              Browse All Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobPortal;
