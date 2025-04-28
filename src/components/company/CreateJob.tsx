"use client";
import { BACKEND_URL } from "@/lib/config";
import { postJob } from "@/lib/postData";
import { successToast } from "@/lib/toast";
import { ICategory, ICategoryResponse } from "@/types/auth";
import { IJobPost } from "@/types/job";
import { jobPostSchema } from "@/types/schema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Briefcase,
  MapPin,
  Clock,
  FileText,
  Building,
  DollarSign,
  Tag,
  ChevronDown,
  Send,
  CheckCircle2,
  Laptop,
  LucideRefreshCw,
  Info,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const Postjob = () => {
  const [jobData, setJobdata] = useState({
    jobTitle: "",
    jobDescription: "",
    jobAddress: "",
    jobLocation: "",
    salary: "",
    jobType: "",
    categoryId: 0,
    categoryName: "",
    skills: "",
    experience: "",
    jobEligibility: "",
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState(1);
  const [showTip, setShowTip] = useState(true);

  const selectCategory = (category: ICategory) => {
    setJobdata({
      ...jobData,
      categoryId: category.id,
      categoryName: category.name,
    });
    setCategoryOpen(false);
    if (formErrors.categoryId) {
      setFormErrors({ ...formErrors, categoryId: "" });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/category/`);

      if (response.data.STS === "200") {
        setCategories(
          response.data.CONTENT.map((category: ICategoryResponse) => {
            return {
              id: category.id,
              name: category.categoryName,
            };
          })
        );
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const jobMutation = useMutation({
    mutationFn: postJob,
    onSuccess: (data) => {
      setIsSubmitting(false);
      successToast("Job posted successfully!");
      setJobdata(data);
      setActiveStep(1);
    },
    onError: (error) => {
      setIsSubmitting(false);
      console.error("Error posting job:", error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJobdata((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};

    if (activeStep === 1) {
      if (!jobData.jobTitle.trim()) errors.jobTitle = "Job title is required";
      if (!jobData.categoryId) errors.categoryId = "Please select a category";
      if (!jobData.jobType) errors.jobType = "Please select a job type";
    } else if (activeStep === 2) {
      if (!jobData.jobDescription.trim())
        errors.jobDescription = "Job description is required";
    } else if (activeStep === 3) {
      if (!jobData.jobAddress.trim())
        errors.jobAddress = "Job address is required";
      if (!jobData.jobLocation.trim())
        errors.jobLocation = "Job location is required";
      if (!jobData.salary.trim()) errors.salary = "Salary is required";
      if (!jobData.skills.trim()) errors.skills = "Skills are required";
      if (!jobData.experience.trim())
        errors.experience = "Experience is required";
      if (!jobData.jobEligibility.trim())
        errors.jobEligibility = "Education requirement is required";
    }

    return errors;
  };

  const validateForm = (data: IJobPost) => {
    const errors: Record<string, string> = {};

    if (!data.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!data.jobDescription.trim())
      errors.jobDescription = "Job description is required";
    if (!data.jobAddress.trim()) errors.jobAddress = "Job address is required";
    if (!data.jobLocation.trim())
      errors.jobLocation = "Job location is required";
    if (!data.salary.trim()) errors.salary = "Salary is required";
    if (!data.jobType) errors.jobType = "Please select a job type";
    if (!data.categoryId) errors.categoryId = "Please select a category";
    if (!data.skills.trim()) errors.skills = "Skills are required";
    if (!data.experience.trim()) errors.experience = "Experience is required";
    if (!data.jobEligibility.trim())
      errors.jobEligibility = "Education requirement is required";

    return errors;
  };

  const nextStep = () => {
    const errors = validateCurrentStep();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleOnsubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IJobPost = {
      jobTitle: jobData.jobTitle,
      jobDescription: jobData.jobDescription,
      jobAddress: jobData.jobAddress,
      jobLocation: jobData.jobLocation,
      salary: jobData.salary,
      jobType: jobData.jobType,
      categoryId: jobData.categoryId,
      skills: jobData.skills, // New field
      experience: jobData.experience, // New field
      jobEligibility: jobData.jobEligibility, // New field
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      if (
        validationErrors.jobTitle ||
        validationErrors.categoryId ||
        validationErrors.jobType
      ) {
        setActiveStep(1);
      } else if (validationErrors.jobDescription) {
        setActiveStep(2);
      } else if (
        validationErrors.jobAddress ||
        validationErrors.jobLocation ||
        validationErrors.salary ||
        validationErrors.skills ||
        validationErrors.experience ||
        validationErrors.jobEligibility
      ) {
        setActiveStep(3);
      }
      return;
    }

    const token = localStorage.getItem("sessionId");
    const companyId = localStorage.getItem("companyId");

    const inputData = jobPostSchema.safeParse(data);

    if (!inputData.success) {
      console.log(inputData.error.format());
      return;
    }

    setIsSubmitting(true);

    const finalData = {
      ...inputData.data,
      token: token as string,
      companyId: Number(companyId),
    };

    console.log("Final Data:", finalData);

    jobMutation.mutate(finalData);
  };
  const renderError = (field: string) => {
    return formErrors[field] ? (
      <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
    ) : null;
  };

  const progressPercentage = (activeStep - 1) * 33.3;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 ">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg text-white">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Post a New Job</h1>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            Share your opportunity with top talent and find the perfect match
            for your team
          </p>
        </div>

        {showTip && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-start">
            <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-blue-800">Pro Tip</h3>
              <p className="text-sm text-blue-700">
                Be specific about job requirements and benefits to attract
                qualified candidates. Clear descriptions lead to better matches!
              </p>
            </div>
            <button
              onClick={() => setShowTip(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="px-6 pt-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Step {activeStep} of 4</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 pb-4">
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    activeStep >= 1
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } mb-1`}
                >
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-xs hidden md:block">Basics</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    activeStep >= 2
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } mb-1`}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs hidden md:block">Description</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    activeStep >= 3
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } mb-1`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs hidden md:block">Details</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  activeStep >= 4 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    activeStep >= 4
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  } mb-1`}
                >
                  <Send className="w-4 h-4" />
                </div>
                <span className="text-xs hidden md:block">Review</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleOnsubmitData} className="w-full">
            <div className="p-6 border-t border-gray-100">
              {activeStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Basic Information
                  </h2>

                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        value={jobData.jobTitle}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.jobTitle
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                        placeholder="e.g. Senior React Developer"
                      />
                    </div>
                    {renderError("jobTitle")}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Job Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div
                        className={`w-full py-3 pl-10 border ${
                          formErrors.categoryId
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm bg-white flex justify-between items-center cursor-pointer hover:border-blue-400 transition-colors`}
                        onClick={() => setCategoryOpen(!categoryOpen)}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Tag className="h-5 w-5 text-gray-400" />
                        </div>
                        <span
                          className={
                            jobData.categoryName
                              ? "text-gray-900"
                              : "text-gray-400"
                          }
                        >
                          {jobData.categoryName || "Select Category"}
                        </span>
                        <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                      </div>

                      {categoryOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {categories.length > 0 ? (
                            categories.map((category, index) => (
                              <div
                                key={index}
                                className="p-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-0 flex items-center justify-between"
                                onClick={() => selectCategory(category)}
                              >
                                <span>{category.name}</span>
                                {jobData.categoryId === category.id && (
                                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-gray-500 text-center">
                              Loading categories...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {renderError("categoryId")}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        onClick={() =>
                          setJobdata({ ...jobData, jobType: "Remote" })
                        }
                        className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
                          jobData.jobType === "Remote"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <Laptop className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">Remote</span>
                      </div>
                      <div
                        onClick={() =>
                          setJobdata({ ...jobData, jobType: "Onsite" })
                        }
                        className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
                          jobData.jobType === "Onsite"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <Building className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">On-Site</span>
                      </div>
                      <div
                        onClick={() =>
                          setJobdata({ ...jobData, jobType: "Hybrid" })
                        }
                        className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
                          jobData.jobType === "Hybrid"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <LucideRefreshCw className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">Hybrid</span>
                      </div>
                    </div>
                    {renderError("jobType")}
                    <select
                      id="jobType"
                      name="jobType"
                      value={jobData.jobType}
                      onChange={handleChange}
                      className="hidden"
                    >
                      <option value="" disabled>
                        Select Job Type
                      </option>
                      <option value="Remote">Remote</option>
                      <option value="Onsite">On-Site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Job Description
                  </h2>

                  <div>
                    <label
                      htmlFor="jobDescription"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="jobDescription"
                      rows={12}
                      name="jobDescription"
                      value={jobData.jobDescription}
                      onChange={handleChange}
                      className={`w-full border ${
                        formErrors.jobDescription
                          ? "border-red-300 ring-1 ring-red-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Describe the role, responsibilities, requirements, and benefits..."
                    />
                    {renderError("jobDescription")}

                    <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded text-sm text-amber-800">
                      <p className="font-medium">Writing Tips:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>
                          Include key responsibilities and day-to-day tasks
                        </li>
                        <li>List required skills and qualifications</li>
                        <li>Mention career growth opportunities</li>
                        <li>Highlight company culture and benefits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Location, Qualifications & Compensation
                  </h2>

                  <div>
                    <label
                      htmlFor="jobAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="jobAddress"
                        name="jobAddress"
                        value={jobData.jobAddress}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.jobAddress
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                        placeholder="Enter complete company address"
                      />
                    </div>
                    {renderError("jobAddress")}
                  </div>

                  <div>
                    <label
                      htmlFor="jobLocation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Job Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="jobLocation"
                        name="jobLocation"
                        value={jobData.jobLocation}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.jobLocation
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                        placeholder="City, State or Google Maps URL"
                      />
                    </div>
                    {renderError("jobLocation")}
                  </div>

                  {/* New field for skills */}
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Required Skills <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="skills"
                        name="skills"
                        value={jobData.skills}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.skills
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                        placeholder="e.g. C, C++, HTML (comma separated)"
                      />
                    </div>
                    {renderError("skills")}
                  </div>

                  {/* New field for experience */}
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Required Experience{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="experience"
                        name="experience"
                        value={jobData.experience}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.experience
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                        placeholder="e.g. 5 years"
                      />
                    </div>
                    {renderError("experience")}
                  </div>

                  {/* New field for jobEligibility */}
                  <div>
                    <label
                      htmlFor="jobEligibility"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Education Requirement{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="jobEligibility"
                        name="jobEligibility"
                        value={jobData.jobEligibility}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.jobEligibility
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                        placeholder="e.g. Bachelor's Degree"
                      />
                    </div>
                    {renderError("jobEligibility")}
                  </div>

                  <div>
                    <label
                      htmlFor="salary"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Annual Salary <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="salary"
                        name="salary"
                        placeholder="Enter annual salary"
                        value={jobData.salary}
                        onChange={handleChange}
                        className={`pl-10 w-full py-3 border ${
                          formErrors.salary
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        type="text"
                      />
                    </div>
                    {renderError("salary")}
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Review Your Job Post
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-5 space-y-4">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Job Title</h3>
                        <p className="text-gray-700">
                          {jobData.jobTitle || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Tag className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Category</h3>
                        <p className="text-gray-700">
                          {jobData.categoryName || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Job Type</h3>
                        <p className="text-gray-700">
                          {jobData.jobType || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Location</h3>
                        <p className="text-gray-700">
                          {jobData.jobLocation || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Address</h3>
                        <p className="text-gray-700">
                          {jobData.jobAddress || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* New review items */}
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Required Skills
                        </h3>
                        <p className="text-gray-700">
                          {jobData.skills || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Required Experience
                        </h3>
                        <p className="text-gray-700">
                          {jobData.experience || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Education Requirement
                        </h3>
                        <p className="text-gray-700">
                          {jobData.jobEligibility || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Salary</h3>
                        <p className="text-gray-700">
                          ₹{jobData.salary || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Description
                        </h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {jobData.jobDescription || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                    <p>
                      Ready to publish? This job will be visible to all job
                      seekers once posted.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {activeStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              ) : (
               <></>
              )}

              {
                activeStep === 4 && (
                  <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Posting Job...
                    </>
                  ) : (
                    <>
                      Post Job
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Postjob;
