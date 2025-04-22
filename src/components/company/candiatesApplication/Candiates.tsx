"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, ArrowLeft, Search, Clock, Filter } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getApplicationByJobId } from "@/lib/queries";
import { JobApplication } from "@/types/job";
import { formatDistanceToNow } from "date-fns";

export default function CandiatesCompo({ jobId }: { jobId: number }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("sessionId");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token not found in local storage.");
    }
  }, []);

  const { isPending, isError, data } = useQuery({
    queryKey: ["jobApplications", jobId, token],
    queryFn: () => getApplicationByJobId(jobId, token),
    enabled: !!token,
  });

  const applications: JobApplication[] = data?.CONTENT || [];

  const formatApplicationDate = (timestamp: number) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown date";
    }
  };

  const filteredApplications = applications.filter((application) => {
    console.log("application", application);
    const matchesSearch =
      application.userDTO.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.userDTO.majorIntrest
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "approved" && application.status) ||
      (filterStatus === "pending" && !application.status);

    return matchesSearch && matchesStatus;
  });

  if (isPending) {
    return (
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen mt-11 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen mt-11 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500">
            Error loading applications. Please try again later.
          </p>
          <Link
            href="/company/job-application"
            className="mt-4 text-blue-500 hover:text-blue-700 block"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const jobTitle = applications[0]?.jobDTO.jobTitle || "This Position";

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen mt-11">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-gray-600 mb-4 transition-all hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" />
          <Link
            href="/company/job-application"
            className="text-blue-500 hover:text-blue-700"
          >
            Back to Applications
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Applications for {jobTitle}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search candidates..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>

        <div className="text-gray-600 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4 items-start mb-6">
                <div className="flex-shrink-0">
                  {application.userDTO.profile_pic ? (
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={application.userDTO.profile_pic}
                        alt={application.userDTO.fullName}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {application.userDTO.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="space-y-1 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {application.userDTO.fullName}
                  </h2>
                  <p className="text-blue-600 font-medium">
                    {application.userDTO.majorIntrest || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Applicant ID: {application.userId}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    {formatApplicationDate(application.applicationDate)}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      application.status
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {application.status ? "Approved" : "Pending"}
                  </span>
                </div>
                <Link
                  href={`/company/job-application/${jobId}/${application.id}`}
                >
                  <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors duration-200">
                    View Application
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No applications found matching your search criteria.
            </p>
            <button
              className="mt-4 text-blue-500 hover:text-blue-700"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
