"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Briefcase,
  ArrowLeft,
  Search,
  Clock,
  Check,
  CircleX,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApplicationByJobId } from "@/lib/queries";
import { JobApplication } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import { respondApplication } from "@/lib/postData";
import { successToast } from "@/lib/toast";

export default function CandidatesCompo({ jobId }: { jobId: number }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [token, setToken] = useState<string>("");
  const [swipingCard, setSwipingCard] = useState<number | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const MIN_SWIPE_DISTANCE = 80; // Minimum distance to register swipe intention
  const DECISION_THRESHOLD = 120; // Distance for accepting/rejecting
  const MAX_SWIPE_DISTANCE = 150; // Maximum allowed swipe distance

  useEffect(() => {
    const storedToken = localStorage.getItem("sessionId");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token not found in local storage.");
    }
  }, []);

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["jobApplications", jobId, token],
    queryFn: () => getApplicationByJobId(jobId, token),
    enabled: !!token,
  });

  const applicationMutation = useMutation({
    mutationFn: respondApplication,
    onSuccess: () => {
      successToast("Application response sent successfully!");
      refetch(); // Refetch data after successful mutation
      setSwipingCard(null);
      setSwipeDistance(0);
    },
    onError: (error) => {
      console.error("Error responding to application:", error);
      setSwipingCard(null);
      setSwipeDistance(0);
    },
  });

  const applications: JobApplication[] = data?.CONTENT || [];

  applications.sort((a, b) => b.applicationScore - a.applicationScore);

  const formatApplicationDate = (timestamp: number) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown date";
    }
  };

  const filteredApplications = applications.filter((application) => {
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

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "approved" && application.status === true) ||
      (activeTab === "rejected" && application.status === false) ||
      (activeTab === "pending" && application.status === null);

    return matchesSearch && matchesStatus && matchesTab;
  });

  async function handleAcceptApplication(applicationId: number) {
    if (!applicationId || !token) return;

    const form = {
      applicationId: applicationId,
      token: token,
      status: true,
    };

    applicationMutation.mutate(form);
  }

  async function handleRejectApplication(applicationId: number) {
    if (!applicationId || !token) return;

    const form = {
      applicationId: applicationId,
      token: token,
      status: false,
    };

    applicationMutation.mutate(form);
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent, applicationId: number) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipingCard(applicationId);
    setSwipeDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipingCard === null) return;

    touchEndX.current = e.touches[0].clientX;
    const distance = touchEndX.current - touchStartX.current;

    // Apply boundaries to the swipe distance
    const boundedDistance = Math.max(
      Math.min(distance, MAX_SWIPE_DISTANCE),
      -MAX_SWIPE_DISTANCE
    );

    setSwipeDistance(boundedDistance);
  };

  const handleTouchEnd = (applicationId: number) => {
    if (swipingCard === null) return;

    const distance = touchEndX.current - touchStartX.current;

    if (distance > DECISION_THRESHOLD) {
      handleAcceptApplication(applicationId);
    } else if (distance < -DECISION_THRESHOLD) {
      handleRejectApplication(applicationId);
    } else {
      setSwipeDistance(0);
      setTimeout(() => {
        setSwipingCard(null);
      }, 200);
    }
  };

  if (isPending) {
    return (
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen  flex justify-center items-center">
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

  // Count applications by status
  const counts = {
    all: applications.length,
    approved: applications.filter((app) => app.status === true).length,
    rejected: applications.filter((app) => app.status === false).length,
    pending: applications.filter((app) => app.status === null).length,
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen ">
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

        {/* Status Tabs */}
        <div className="flex overflow-x-auto border-b">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 whitespace-nowrap font-medium text-sm transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 whitespace-nowrap font-medium text-sm transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === "pending"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-2 whitespace-nowrap font-medium text-sm transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === "approved"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Approved ({counts.approved})
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-4 py-2 whitespace-nowrap font-medium text-sm transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === "rejected"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Rejected ({counts.rejected})
          </button>
        </div>

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
        </div>

        <div className="md:hidden bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mb-6">
          <p className="font-medium mb-1">Swipe to respond:</p>
          <p className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Swipe left to reject
          </p>
          <p className="flex items-center gap-2 mt-1">
            <ChevronRight className="w-4 h-4" /> Swipe right to accept
          </p>
        </div>

        <div className="text-gray-600 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => {
            const isBeingSwiped = swipingCard === application.id;
            const swipeAmount = isBeingSwiped ? swipeDistance : 0;

            return (
              <div key={application.id} className="relative overflow-hidden">
                {/* Card container with boundaries */}
                <div className="relative">
                  {/* Actual card with swipe effect */}
                  <div
                    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md ${
                      isBeingSwiped ? "cursor-grabbing" : ""
                    }`}
                    style={{
                      transform: `translateX(${swipeAmount}px) rotate(${
                        swipeAmount / 20
                      }deg)`,
                      transition: isBeingSwiped
                        ? "none"
                        : "transform 0.3s ease",
                      zIndex: isBeingSwiped ? 10 : 1,
                      backgroundColor: isBeingSwiped
                        ? swipeAmount > MIN_SWIPE_DISTANCE
                          ? "#f0fdf4" // Light green for accept
                          : swipeAmount < -MIN_SWIPE_DISTANCE
                          ? "#fef2f2" // Light red for reject
                          : "white"
                        : "white",
                      touchAction: "pan-y",
                      willChange: "transform",
                    }}
                    onTouchStart={(e) => handleTouchStart(e, application.id)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(application.id)}
                  >
                    {/* Visual indicators for swipe direction */}
                    {isBeingSwiped && (
                      <>
                        {swipeAmount > MIN_SWIPE_DISTANCE && (
                          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green-500 rounded-full p-2 z-20">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        )}
                        {swipeAmount < -MIN_SWIPE_DISTANCE && (
                          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500 rounded-full p-2 z-20">
                            <CircleX className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </>
                    )}

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

                    <div className="flex items-center justify-between border-t pt-4 pb-2">
                      <div>
                        <p className="text-gray-500 text-sm">
                          {formatApplicationDate(application.applicationDate)}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            application.status === true
                              ? "bg-green-100 text-green-800"
                              : application.status === false
                              ? "bg-gray-200 text-black"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {application.status === true
                            ? "Approved"
                            : application.status === false
                            ? "Rejected"
                            : "Pending"}
                        </span>
                      </div>
                      <Link
                        href={{
                          pathname: `/company/view-application/candidate-details`,
                          query: {
                            id: application.id,
                            fullName: application.userDTO.fullName,
                            email: application.userDTO.email,
                            phoneNo: application.userDTO.phoneNo,
                            resume: application.userDTO.resume,
                            profile_pic: application.userDTO.profile_pic,
                            majorIntrest: application.userDTO.majorIntrest,
                            completeProfile:
                              application.userDTO.completeProfile,
                            categoryName: application.userDTO.categoryName,
                          },
                        }}
                      >
                        <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors duration-200">
                          View Application
                        </button>
                      </Link>
                    </div>

                    {/* Show buttons only on desktop/tablet */}
                    <div className="hidden md:flex justify-between border-t pt-4 gap-2">
                      <button
                        className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2"
                        onClick={() => handleRejectApplication(application.id)}
                      >
                        <CircleX className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2"
                        onClick={() => handleAcceptApplication(application.id)}
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action feedback indicators that appear underneath the card */}
                {isBeingSwiped && (
                  <>
                    {swipeAmount > DECISION_THRESHOLD && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-50 rounded-xl">
                        <div className="bg-green-500 rounded-full p-4 shadow-lg">
                          <Check className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    )}
                    {swipeAmount < -DECISION_THRESHOLD && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-xl">
                        <div className="bg-red-500 rounded-full p-4 shadow-lg">
                          <CircleX className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
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
                setActiveTab("all");
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
