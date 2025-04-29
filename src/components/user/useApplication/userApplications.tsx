"use client"

import { getAppliedJobs } from "@/lib/queries";
import { JobApplication } from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export default function UserApplications() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    setToken(localStorage.getItem("sessionId") || "");
    setUserId(Number(localStorage.getItem("userId")));
  }, []);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { isPending, isError, data } = useQuery({
    queryKey: ["appliedJobs", userId],
    queryFn: () => getAppliedJobs(userId, token),
    enabled: !!token && userId > 0,
  });

  const applications: JobApplication[] = useMemo(() => {
    return data?.CONTENT || [];
  }, [data]);

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
  
    const statusFiltered = applications.filter((app) => {
      if (statusFilter === "all") return true;
      
      if (statusFilter === "pending") return app.status === null;
      if (statusFilter === "accepted") return app.status === true;
      if (statusFilter === "rejected") return app.status === false;
      
      return true;
    });
  
    const searchFiltered = statusFiltered.filter((app) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        app.jobDTO?.jobTitle?.toLowerCase().includes(query) ||
        app.jobDTO?.companyDTO?.companyName?.toLowerCase().includes(query) ||
        app.jobDTO?.jobLocation?.toLowerCase().includes(query) ||
        (app.jobDTO?.skills && app.jobDTO.skills.toLowerCase().includes(query))
      );
    });
  
    return searchFiltered.sort((a, b) => {
      if (sortBy === "newest") {
        return b.applicationDate - a.applicationDate;
      } else {
        return a.applicationDate - b.applicationDate;
      }
    });
  }, [applications, statusFilter, searchQuery, sortBy]);

  const counts = useMemo(() => {
    return {
      all: applications.length,
      pending: applications.filter((app) => app.status === null ).length,
      accepted: applications.filter((app) => app.status === true ).length,
      rejected: applications.filter((app) => app.status === false ).length,
    };
  }, [applications]);

  const StatusBadge = ({ status }: { status: boolean | string | null }) => {
    let statusValue = "";
    if (status === null) statusValue = "pending";
    else if (status === true) statusValue = "accepted";
    else if (status === false) statusValue = "rejected";
    else statusValue = status;

    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
        text: "Pending",
      },
      accepted: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Accepted",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
        text: "Rejected",
      },
    };

    const config = statusConfig[statusValue as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        <span className="ml-1">{config.text}</span>
      </span>
    );
  };

  const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-20 flex items-center justify-center ">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl font-medium text-gray-700">Loading your job Applications...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <main className="pt-20 w-full bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg text-red-600">Failed to load applications</p>
            <p className="text-sm text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 w-full bg-gray-50 min-h-screen mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Job Applications</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Track all your job applications in one place
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
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
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
                <Briefcase className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{counts.all}</p>
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
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{counts.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Accepted</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{counts.accepted}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-red-100 text-red-600">
                <XCircle className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{counts.rejected}</p>
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
                  <div className="px-3 py-3 sm:px-6 sm:py-4 space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        {/* Company logo/avatar */}
                        {application.jobDTO.companyDTO.profile_Pic ? (
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
                            <img
                              src={application.jobDTO.companyDTO.profile_Pic}
                              alt={application.jobDTO.companyDTO.companyName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm sm:font-medium">
                            {application.jobDTO.companyDTO.companyName.charAt(0)}
                          </div>
                        )}
                        <div className="ml-3 sm:ml-4">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-0">
                            <h3 className="text-base sm:text-lg font-medium text-blue-600 hover:text-blue-800 mr-2">
                              {application.jobDTO.jobTitle}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {application.jobDTO.jobType}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2 sm:gap-0 sm:flex-row sm:mt-0 sm:space-x-4">
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <Briefcase className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                              {application.jobDTO.companyDTO.companyName}
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                              {application.jobDTO.jobLocation}
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <DollarSign className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                              {application.jobDTO.salary}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                        <StatusBadge status={application.status} />
                      </div>
                    </div>
                    <div className=" sm:mt-1  sm:justify-between">
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <p>
                          Applied on{" "}
                          <time dateTime={new Date(application.applicationDate).toISOString()}>
                            {formatDate(application.applicationDate)}
                          </time>
                        </p>
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