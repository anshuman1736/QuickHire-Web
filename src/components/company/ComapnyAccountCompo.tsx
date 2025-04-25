"use client";

import { ChangeEvent, useState } from "react";
import {
  Mail,
  Phone,
  Tag,
  Upload,
  Camera,
  Save,
  X,
  Briefcase,
  Award,
  Eye,
  ChevronDown,
  ChevronUp,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Building,
  Calendar,
} from "lucide-react";
import { uploadCinCertificate, uploadResume } from "@/lib/uploadTofirebase";
import { errorToast } from "@/lib/toast";

export default function ComapnyAccountCompo() {
  // State management
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [activeSection, setActiveSection] = useState("all");
  const [isUploading, setIsUploading] = useState(false);

  // Form data with company specific fields
  const [formData, setFormData] = useState({
    comapanyName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phoneNo: "+1 (555) 987-6543",
    cinNumber: "L17110MH1973PLC019786",
    cinCertificate: "",
    profile_pic: "",
    establishedYear: "2020",
    bio: "Passionate developer with 5+ years of experience building modern web applications. Specialized in React ecosystem and responsive design.",
    website: "https://alexjohnson.dev",
    linkedin: "alexjohnson",
    github: "alexjohnson",
    twitter: "alexjohnson",
  });

  // const [newSkill, setNewSkill] = useState("");

  // Use type instead of empty interfaces
  type InputChangeEvent = ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  // type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type FileChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type SubmitEvent = React.FormEvent<HTMLFormElement>;

  // Handlers
  const handleInputChange = (e: InputChangeEvent): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleCheckboxChange = (e: CheckboxChangeEvent): void => {
  //   const { name, checked, value } = e.target;
  //   let updatedValues: string[] = [
  //     ...(formData[name as keyof typeof formData] as string[]),
  //   ];

  //   if (checked) {
  //     updatedValues.push(value);
  //   } else {
  //     updatedValues = updatedValues.filter((item) => item !== value);
  //   }

  //   setFormData({ ...formData, [name]: updatedValues });
  // };

  type HandleFileChange = (
    e: FileChangeEvent,
    fileType: "certificate" | "profile_pic"
  ) => Promise<void>;

  const uploadProfilePic = async (file: File): Promise<string | null> => {
    return await uploadResume(file);
  };

  const handleFileChange: HandleFileChange = async (e, fileType) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      if (fileType === "certificate") {
        const certificateUrl = await uploadCinCertificate(file);
        if (!certificateUrl) {
          errorToast("Error uploading certificate. Please try again.");
          return;
        }
        setFormData({ ...formData, cinCertificate: certificateUrl });
      }
      if (fileType === "profile_pic") {
        const url = await uploadProfilePic(file);
        if (!url) {
          errorToast("Error uploading profile. Please try again.");
          return;
        }
        setFormData({ ...formData, profile_pic: url });
      }
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    console.log("Company Profile updated:", formData);
  };

  // Company types
  const companyTypes = [
    { id: "startup", label: "Startup" },
    { id: "sme", label: "SME" },
    { id: "enterprise", label: "Enterprise" },
    { id: "nonprofit", label: "Non-profit" },
    { id: "government", label: "Government" },
  ];

  // Industries
  const industries = [
    { id: "tech", label: "Technology" },
    { id: "finance", label: "Finance" },
    { id: "healthcare", label: "Healthcare" },
    { id: "education", label: "Education" },
    { id: "retail", label: "Retail" },
    { id: "manufacturing", label: "Manufacturing" },
  ];

  type ToggleSectionHandler = (section: string) => void;

  const toggleSection: ToggleSectionHandler = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? "" : section));
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-4 sm:py-6 md:py-8 px-2 sm:px-4 mt-12 sm:mt-20 md:mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
            Company Profile
          </h1>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg">
            Manage your company profile and be visible to top talent
          </p>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 sm:gap-6 md:gap-8 border-b border-gray-200">
            <div className="relative mx-auto md:mx-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-xl overflow-hidden border-4 border-white">
                <div className="relative w-full h-full">
                  <img
                    src="/api/placeholder/400/400"
                    alt="Company Logo"
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsEditingPhoto(true)}
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-600 p-1 sm:p-2 rounded-full text-white shadow-md hover:bg-blue-700 transition-all transform hover:scale-110"
              >
                <Camera size={16} className="sm:hidden" />
                <Camera size={18} className="hidden sm:block" />
              </button>

              {isEditingPhoto && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full">
                  <div className="flex gap-2 sm:gap-3">
                    <label className="p-2 sm:p-3 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-all">
                      <Upload size={16} className="sm:hidden" />
                      <Upload size={18} className="hidden sm:block" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "profile_pic")}
                      />
                    </label>
                    <button
                      onClick={() => setIsEditingPhoto(false)}
                      className="p-2 sm:p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all"
                    >
                      <X size={16} className="sm:hidden" />
                      <X size={18} className="hidden sm:block" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full md:w-auto text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {formData.comapanyName}
                  </h2>
                  <p className="text-base sm:text-lg text-blue-600 font-medium">
                    Est. {formData.establishedYear}
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center mx-auto md:mx-0"
                >
                  <Eye size={16} className="sm:hidden mr-1" />
                  <Eye size={18} className="hidden sm:block mr-2" />
                  <span className="text-sm sm:text-base">
                    View Public Profile
                  </span>
                </button>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex items-center">
                  <Tag size={16} className="sm:hidden mr-1 text-blue-500" />
                  <Tag
                    size={18}
                    className="hidden sm:block mr-2 text-blue-500"
                  />
                  <span>CIN: {formData.cinNumber}</span>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="sm:hidden mr-1 text-blue-500" />
                  <Globe
                    size={18}
                    className="hidden sm:block mr-2 text-blue-500"
                  />
                  <a
                    href={formData.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formData.website?.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 justify-center md:justify-start">
                {formData.linkedin && (
                  <a
                    href={`https://linkedin.com/company/${formData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin size={16} className="sm:hidden" />
                    <Linkedin size={18} className="hidden sm:block" />
                  </a>
                )}
                {formData.github && (
                  <a
                    href={`https://github.com/${formData.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Github size={16} className="sm:hidden" />
                    <Github size={18} className="hidden sm:block" />
                  </a>
                )}
                {formData.twitter && (
                  <a
                    href={`https://twitter.com/${formData.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-blue-50 text-blue-400 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Twitter size={16} className="sm:hidden" />
                    <Twitter size={18} className="hidden sm:block" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
            {/* Basic Information Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6"
                onClick={() => toggleSection("basic")}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Building
                    size={20}
                    className="sm:hidden mr-2 text-blue-600"
                  />
                  <Building
                    size={22}
                    className="hidden sm:block mr-3 text-blue-600"
                  />
                  Company Information
                </h3>
                {activeSection === "basic" ? (
                  <ChevronUp size={20} className="sm:hidden text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                )}
                {activeSection === "basic" ? (
                  <ChevronUp
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                ) : (
                  <ChevronDown
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                )}
              </div>

              {(activeSection === "basic" || activeSection === "all") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company Name*
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Building size={16} className="sm:hidden" />
                        <Building size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="comapanyName"
                        value={formData.comapanyName}
                        onChange={handleInputChange}
                        required
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company Email*
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Mail size={16} className="sm:hidden" />
                        <Mail size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Phone size={16} className="sm:hidden" />
                        <Phone size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      CIN Number*
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Tag size={16} className="sm:hidden" />
                        <Tag size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="cinNumber"
                        value={formData.cinNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Company Identification Number"
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Established Year*
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Calendar size={16} className="sm:hidden" />
                        <Calendar size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="establishedYear"
                        value={formData.establishedYear}
                        onChange={handleInputChange}
                        required
                        placeholder="Year company was founded"
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company Website
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Globe size={16} className="sm:hidden" />
                        <Globe size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://company.com"
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company Bio*
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell about your company, mission, vision, and what you're looking for..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Company Type & Industry Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6"
                onClick={() => toggleSection("company_details")}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Award size={20} className="sm:hidden mr-2 text-blue-600" />
                  <Award
                    size={22}
                    className="hidden sm:block mr-3 text-blue-600"
                  />
                  Company Details
                </h3>
                {activeSection === "company_details" ? (
                  <ChevronUp size={20} className="sm:hidden text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                )}
                {activeSection === "company_details" ? (
                  <ChevronUp
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                ) : (
                  <ChevronDown
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                )}
              </div>

              {(activeSection === "company_details" ||
                activeSection === "all") && (
                <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
                  {/* Company Type */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">
                      Company Type*
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm">
                      {companyTypes.map((type) => (
                        <label
                          key={type.id}
                          className="inline-flex items-center"
                        >
                          <input
                            type="radio"
                            name="companyType"
                            value={type.id}
                            // checked={formData.companyType === type.id}
                            onChange={handleInputChange}
                            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 sm:ml-2 text-gray-700">
                            {type.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">
                      Industry*
                    </h4>
                    <select
                      name="industry"
                      // value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6"
                onClick={() => toggleSection("documents")}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Briefcase
                    size={20}
                    className="sm:hidden mr-2 text-blue-600"
                  />
                  <Briefcase
                    size={22}
                    className="hidden sm:block mr-3 text-blue-600"
                  />
                  Documents
                </h3>
                {activeSection === "documents" ? (
                  <ChevronUp size={20} className="sm:hidden text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                )}
                {activeSection === "documents" ? (
                  <ChevronUp
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                ) : (
                  <ChevronDown
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                )}
              </div>

              {(activeSection === "documents" || activeSection === "all") && (
                <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {/* CIN Certificate Upload */}
                  <div className="border-2 border-dashed border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-blue-50">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 mb-3 sm:mb-4">
                        <Upload size={20} className="sm:hidden text-blue-600" />
                        <Upload
                          size={24}
                          className="hidden sm:block text-blue-600"
                        />
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
                        Upload CIN Certificate*
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Required for company verification
                      </p>
                      <label className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center cursor-pointer shadow-sm">
                        {isUploading ? "Uploading..." : "Select Certificate"}
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "certificate")}
                          disabled={isUploading}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2 sm:mt-3">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  </div>

                  {/* Company Logo */}
                  <div className="border-2 border-dashed border-indigo-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-indigo-50">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-indigo-100 mb-3 sm:mb-4">
                        <Camera
                          size={20}
                          className="sm:hidden text-indigo-600"
                        />
                        <Camera
                          size={24}
                          className="hidden sm:block text-indigo-600"
                        />
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
                        Company Logo
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Upload your company logo (high resolution)
                      </p>
                      <label className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center cursor-pointer shadow-sm">
                        {isUploading ? "Uploading..." : "Select Logo"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "profile_pic")}
                          disabled={isUploading}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2 sm:mt-3">
                        JPG, PNG (Min 400x400px)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6"
                onClick={() => toggleSection("social")}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Globe size={20} className="sm:hidden mr-2 text-blue-600" />
                  <Globe
                    size={22}
                    className="hidden sm:block mr-3 text-blue-600"
                  />
                  Social Profiles
                </h3>
                {activeSection === "social" ? (
                  <ChevronUp size={20} className="sm:hidden text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                )}
                {activeSection === "social" ? (
                  <ChevronUp
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                ) : (
                  <ChevronDown
                    size={22}
                    className="hidden sm:block text-gray-500"
                  />
                )}
              </div>

              {(activeSection === "social" || activeSection === "all") && (
                <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      LinkedIn Company Page
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Linkedin size={16} className="sm:hidden" />
                        <Linkedin size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="companyname"
                        className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      GitHub Organization
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Github size={16} className="sm:hidden" />
                        <Github size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="organization-name"
                        className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Twitter/X Handle
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Twitter size={16} className="sm:hidden" />
                        <Twitter size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="companyname"
                        className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Section */}
            <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 text-center md:text-left">
                    Ready to update your company profile?
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
                    Make sure all required fields are filled
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    className="flex-1 md:flex-none px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 md:flex-none px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    <Save size={16} className="sm:hidden mr-1" />
                    <Save size={18} className="hidden sm:block mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
