"use client";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  FileText,
  Tag,
  DollarSign,
  Building,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updatejob } from "@/lib/postData";
import { successToast } from "@/lib/toast";
import { useRouter } from "next/navigation";

const Updatejob = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const jobTitle = searchParams.get("jobTitle") || "";
    const jobCategory = searchParams.get("jobCategory") || "";
    const categoryId = parseInt(searchParams.get("categoryId") || "");
    const id = parseInt(searchParams.get("id") || "");
    const jobType = searchParams.get("jobType") || "";
    const skills = searchParams.get("skills") || "";
    const jobLocation = searchParams.get("joblocation") || "";
    const jobAddress = searchParams.get("jobAddress") || "";
    const experience = searchParams.get("experience") || "";
    const jobDescription = searchParams.get("description") || "";
    const jobEligibility = searchParams.get("education") || "";
    const salary = searchParams.get("salary") || " 0";
    const token = localStorage.getItem("sessionId") || "";
    setFormData({
      jobTitle,
      jobCategory,
      categoryId,
      id,
      jobType,
      skills,
      jobLocation,
      jobAddress,
      experience,
      jobDescription,
      jobEligibility,
      salary,
      token: token, // You can fetch this from auth if needed
    });
  }, [searchParams]);

  const [popup, setpopup] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  type JobFormData = {
    jobTitle: string;
    jobCategory: string;
    categoryId: number;
    id: number;
    token: string;
    jobType: string;
    skills: string;
    jobLocation: string;
    jobAddress: string;
    experience: string;
    jobDescription: string;
    jobEligibility: string;
    salary: string;
  };

  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    jobCategory: "",
    categoryId: 0,
    id: 0,
    token: "",
    jobType: "",
    skills: "",
    jobLocation: "",
    jobAddress: "",
    experience: "",
    jobDescription: "",
    jobEligibility: "",
    salary: "",
  });

  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onsubmithandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setpopup(true);
  };

  const jobMutation = useMutation({
    mutationFn: updatejob,
    onSuccess: (data) => {
      setisSubmitting(false);
      successToast("Job Updated successfully!");
      router.push("/company/job-application");
    },
    onError: (error) => {
      console.error("Error updating job:", error);
    },
  });
  const handlejobUpdate = () => {
    jobMutation.mutate(formData);
    setisSubmitting(true);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-20 mt-6 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl text-gray-700">
            Post updating & <br /> redirecting to Home Page...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-20 mt-6">
      {/* popup for final submit */}
      <div
        className={`fixed inset-0 z-50 flex  items-center justify-center bg-black/30  transition-opacity ${
          popup ? "flex" : "hidden"
        }`}
      >
        <div className="  space-y-3 bg-white p-10">
          <h6 className="text-center">🧐</h6>
          <p className="text-base text-center font-semibold text-gray-800">
            Are you sure you want <br /> to update this job?
          </p>
          <p className="text-sm text-gray-400 font-light">
            Please review the details carefully before proceeding.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => setpopup(false)}
              className="text-base cursor-pointer px-4 py-2 rounded-lg border border-gray-400 "
            >
              Cancel Changes
            </button>
            <button
              type="button"
              onClick={() => {
                handlejobUpdate();
                setpopup(false);
              }}
              className="text-base cursor-pointer  px-4 py-2 rounded-lg text-white bg-blue-600"
            >
              {" "}
              Confirm Update
            </button>
          </div>
        </div>
      </div>
      {!formData ? (
        <div className=" font-semibold text-gray-600 text-2xl flex items-center justify-center">
          {" "}
          Something went Wrong 😒. <br />{" "}
        </div>
      ) : (
        <>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg text-white">
                <Briefcase className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Update Your Job
              </h1>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Share your opportunity with top talent and find the perfect
                match for your team
              </p>
            </div>
          </div>
          <form onSubmit={onsubmithandle} className="divide-y divide-gray-100">
            {/* Basic info  */}
            <div className="p-4 sm:p-6 md:p-8 ">
              <div className="flex justify-between items-center  cursor-pointer mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Job title*
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center bg-gray-200 px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300  text-gray-500">
                      <Briefcase size={16} className="sm:hidden" />
                      <Briefcase size={18} className="hidden sm:block" />
                    </span>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handlechange}
                      required
                      className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Job Category*
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center bg-gray-200 px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300  text-gray-500">
                      <Tag size={16} className="sm:hidden" />
                      <Tag size={18} className="hidden sm:block" />
                    </span>
                    <input
                      type="text"
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handlechange}
                      required
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Job Type*
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500">
                      <Tag size={16} className="sm:hidden" />
                      <Tag size={18} className="hidden sm:block" />
                    </span>
                    <input
                      type="text"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handlechange}
                      required
                      className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Required Skills
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border bg-gray-200 border-r-0 border-gray-300 text-gray-500">
                      <Tag size={16} className="sm:hidden" />
                      <Tag size={18} className="hidden sm:block" />
                    </span>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handlechange}
                      className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Location*
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500">
                      <MapPin size={16} className="sm:hidden" />
                      <MapPin size={18} className="hidden sm:block" />
                    </span>
                    <input
                      type="text"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handlechange}
                      required
                      className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Experience Level*
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500">
                      <Clock size={16} className="sm:hidden" />
                      <Clock size={18} className="hidden sm:block" />
                    </span>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handlechange}
                      required
                      className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Description*
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handlechange}
                    required
                    rows={4}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell employers about your professional background, skills, and what you're looking for..."
                  />
                </div>
              </div>
            </div>

            <div className="grid p-4 sm:p-6 md:p-8 grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Company Address*
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500">
                    <Building size={16} className="sm:hidden" />
                    <Building size={18} className="hidden sm:block" />
                  </span>
                  <input
                    type="text"
                    name="jobAddress"
                    value={formData.jobAddress}
                    onChange={handlechange}
                    required
                    placeholder="City, Country"
                    className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Education*
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500">
                    <FileText size={16} className="sm:hidden" />
                    <FileText size={18} className="hidden sm:block" />
                  </span>
                  <input
                    type="text"
                    name="jobEligibility"
                    value={formData.jobEligibility}
                    onChange={handlechange}
                    required
                    className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Annual Salery*
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500">
                    <DollarSign size={16} className="sm:hidden" />
                    <DollarSign size={18} className="hidden sm:block" />
                  </span>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handlechange}
                    required
                    placeholder="City, Country"
                    className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Section */}
            <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 text-center md:text-left">
                    Really want to update job ?
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
                    Make sure all required fields are filled
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                  <Link
                    href="/company"
                    className="flex-1 md:flex-none px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 md:flex-none px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Updatejob;
