"use client"

import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  ArrowRight,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export default function UserApplications() {
  // Application status filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Mock data for applied jobs
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$90K - $120K",
      appliedDate: "2023-05-15",
      status: "interview", // pending, rejected, offered
      interviewDate: "2023-06-10",
      jobType: "Full-time",
      companyLogo: "TC",
    },
    {
      id: 2,
      jobTitle: "Product Designer",
      company: "Creative Studio",
      location: "Remote",
      salary: "$85K - $110K",
      appliedDate: "2023-05-20",
      status: "pending",
      jobType: "Full-time",
      companyLogo: "CS",
    },
    {
      id: 3,
      jobTitle: "DevOps Engineer",
      company: "Cloud Systems Inc.",
      location: "Austin, TX",
      salary: "$100K - $130K",
      appliedDate: "2023-04-28",
      status: "rejected",
      jobType: "Full-time",
      companyLogo: "CS",
    },
    {
      id: 4,
      jobTitle: "Data Scientist",
      company: "Analytics Pro",
      location: "New York, NY",
      salary: "$95K - $125K",
      appliedDate: "2023-06-01",
      status: "offered",
      jobType: "Contract",
      companyLogo: "AP",
    },
    {
      id: 5,
      jobTitle: "Marketing Specialist",
      company: "Growth Tactics",
      location: "Chicago, IL",
      salary: "$65K - $85K",
      appliedDate: "2023-05-10",
      status: "interview",
      interviewDate: "2023-05-25",
      jobType: "Full-time",
      companyLogo: "GT",
    },
  ];

  // Filter applications based on status and search query
  const filteredApplications = applications
    .filter((app) => {
      if (statusFilter === "all") return true;
      return app.status === statusFilter;
    })
    .filter((app) => {
      if (!searchQuery) return true;
      return (
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      } else {
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      }
    });

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
        text: "Pending",
      },
      interview: {
        color: "bg-blue-100 text-blue-800",
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Interview",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
        text: "Rejected",
      },
      offered: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Offered",
      },
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status].color}`}
      >
        {statusConfig[status].icon}
        <span className="ml-1">{statusConfig[status].text}</span>
      </span>
    );
  };

  // Format date
  const formatDate = (dateString : number) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main className="pt-20 w-full bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Job Applications</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Track all your job applications in one place
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-full sm:max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="w-full sm:w-auto">
                <label htmlFor="status-filter" className="sr-only">
                  Filter by status
                </label>
                <select
                  id="status-filter"
                  className="block w-full pl-3 pr-8 py-1.5 sm:py-2 text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="interview">Interview</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="w-full sm:w-auto">
                <label htmlFor="sort-by" className="sr-only">
                  Sort by
                </label>
                <select
                  id="sort-by"
                  className="block w-full pl-3 pr-8 py-1.5 sm:py-2 text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Application Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
                <Briefcase className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Pending</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {applications.filter(a => a.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Interviews</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {applications.filter(a => a.status === "interview").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Offers</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {applications.filter(a => a.status === "offered").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Briefcase className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">
                No applications found
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                {statusFilter === "all"
                  ? "You haven't applied to any jobs yet."
                  : `You don't have any ${statusFilter} applications.`}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <li key={application.id}>
                  <div className="px-3 py-3 sm:px-6 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm sm:font-medium">
                          {application.companyLogo}
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-0">
                            <h3 className="text-base sm:text-lg font-medium text-blue-600 hover:text-blue-800 mr-2">
                              {application.jobTitle}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {application.jobType}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2 sm:gap-0 sm:flex-row sm:mt-0 sm:space-x-4">
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <Briefcase className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                              {application.company}
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                              {application.location}
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <DollarSign className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                              {application.salary}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                        <StatusBadge status={application.status} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 sm:flex sm:justify-between">
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <p>
                          Applied on <time dateTime={application.appliedDate}>{formatDate(application.appliedDate)}</time>
                          {application.interviewDate && (
                            <>
                              {' • '}
                              <span className="font-medium">
                                Interview: {formatDate(application.interviewDate)}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}