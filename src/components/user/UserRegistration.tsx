"use client";

import { useState, useRef, useEffect } from "react";
import { User, ChevronDown, File, Check, X, Plus } from "lucide-react";
import { RegisterUser } from "@/hooks/user/Registration";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { ICategory, ICategoryResponse, IUserRegister } from "@/types/auth";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { uploadProfilePic, uploadResume } from "@/lib/uploadTofirebase";

const UserRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    majorIntrest: [] as string[],
    categoryId: 0,
    resume: null as File | null,
    resumeUrl: "",
    profile_pic: null as File | null,
    profile_picUrl: "",
    address: "",
    categoryName: "",
    completeProfile: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [currentInterest, setCurrentInterest] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [emailVarificationMsg, setEmailVarificationMsg] =
    useState<boolean>(false);

  const [categories, setCategories] = useState<ICategory[]>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const interestInputRef = useRef<HTMLInputElement>(null);

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

  const { mutate: userRegister, isPending: isLoading } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: (data) => {
      setCurrentStep(4);
      setRegistrationSuccess(data.STS === "200");
      setResponseMessage(data.MSG);
      setEmailVarificationMsg(true);
    },
    onError: (error: Error | unknown) => {
      console.log(error);
      const errorData = (
        error as { response?: { data: { STS: string; MSG: string } } }
      )?.response?.data || {
        STS: "500",
        MSG: "Failed To Register Either this is Because of Server Error or User Already Exists",
      };

      setErrors({
        formError: errorData.MSG,
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "resume" | "profile_pic"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          [fieldName]: `File size exceeds 5MB limit`,
        });
        return;
      }

      setFormData({
        ...formData,
        [fieldName]: file,
      });

      if (errors[fieldName]) {
        setErrors({
          ...errors,
          [fieldName]: "",
        });
      }

      if (fieldName === "resume") {
        simulateUpload(file, fieldName);
      }

      if (fieldName === "profile_pic") {
        simulateUpload(file, fieldName);
      }
    }
  };

  const simulateUpload = async (
    file: File,
    fieldName: "resume" | "profile_pic"
  ) => {
    setUploadProgress(0);
    if (fieldName === "resume") {
      console.log("Uploading resume...");
      const url = await uploadResume(file);
      if (url) {
        setFormData({
          ...formData,
          resumeUrl: url,
        });
      } else {
        setErrors({
          ...errors,
          resume: "Failed to upload resume",
        });
      }
    }
    if (fieldName === "profile_pic") {
      console.log("Uploading profile picture...");
      const url = await uploadProfilePic(file);
      if (url) {
        setFormData({
          ...formData,
          profile_picUrl: url,
        });
      } else {
        setErrors({
          ...errors,
          profile_pic: "Failed to upload profile picture",
        });
      }
    }

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const selectCategory = (category: ICategory) => {
    setFormData({
      ...formData,
      categoryId: category.id,
      categoryName: category.name,
    });
    setCategoryOpen(false);
    if (errors.categoryId) {
      setErrors({
        ...errors,
        categoryId: "",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(
        {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>,
        "resume"
      );
    }
  };

  const addInterest = () => {
    if (
      currentInterest.trim() !== "" &&
      !interests.includes(currentInterest.trim())
    ) {
      const newInterests = [...interests, currentInterest.trim()];
      setInterests(newInterests);
      setFormData({
        ...formData,
        majorIntrest: newInterests,
      });
      setCurrentInterest("");
      if (interestInputRef.current) {
        interestInputRef.current.focus();
      }
      if (errors.majorIntrest) {
        setErrors({
          ...errors,
          majorIntrest: "",
        });
      }
    }
  };

  const removeInterest = (interest: string) => {
    const newInterests = interests.filter((item) => item !== interest);
    setInterests(newInterests);
    setFormData({
      ...formData,
      majorIntrest: newInterests,
    });
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest();
    }
  };

  const validateStep = (step: number) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
      if (!formData.phoneNo) {
        newErrors.phoneNo = "Phone number is required";
        isValid = false;
      } else if (!/^\d{10}$/.test(formData.phoneNo)) {
        newErrors.phoneNo = "Please enter a valid 10-digit phone number";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.categoryId) {
        newErrors.categoryId = "Category is required";
        isValid = false;
      }
      if (formData.majorIntrest.length === 0) {
        newErrors.majorIntrest = "At least one interest is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      if (errors.formError) {
        setErrors({ ...errors, formError: "" });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    if (errors.formError) {
      setErrors({ ...errors, formError: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      const registerData: IUserRegister = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        password: formData.password,
        majorIntrest: formData.majorIntrest.toString(),
        categoryId: formData.categoryId,
        resume: formData.resumeUrl,
        profile_pic: formData.profile_picUrl,
        categoryName: formData.categoryName,
        address: "",
        completeProfile: true,
      };

      userRegister(registerData);
    }
  };

  const steps = [
    {
      name: "Account Info",
      status:
        currentStep > 1
          ? "complete"
          : currentStep === 1
          ? "current"
          : "pending",
    },
    {
      name: "Professional Info",
      status:
        currentStep > 2
          ? "complete"
          : currentStep === 2
          ? "current"
          : "pending",
    },
    {
      name: "Profile Photo",
      status:
        currentStep > 3
          ? "complete"
          : currentStep === 3
          ? "current"
          : "pending",
    },
    { name: "Confirmation", status: currentStep === 4 ? "current" : "pending" },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              Hello! Register to get started
            </h2>

            {errors.formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {errors.formError}
              </div>
            )}

            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                placeholder="Mobile no"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.phoneNo ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phoneNo && (
                <p className="mt-1 text-xs text-red-500">{errors.phoneNo}</p>
              )}
            </div>

            <button
              onClick={nextStep}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Continue
            </button>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 font-medium">
                Login Now
              </Link>
            </p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {errors.formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {errors.formError}
              </div>
            )}

            <div className="relative">
              <div
                className={`w-full p-3 border ${
                  errors.categoryId ? "border-red-500" : "border-gray-200"
                } rounded-lg bg-white flex justify-between items-center cursor-pointer`}
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span
                  className={
                    formData.categoryId ? "text-gray-800" : "text-gray-400"
                  }
                >
                  {formData.categoryName
                    ? categories?.find(
                        (cat) => cat.id === Number(formData.categoryId)
                      )?.name ?? "Select Category"
                    : "Select Category"}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              {errors.categoryId && (
                <p className="mt-1 text-xs text-red-500">{errors.categoryId}</p>
              )}

              {categoryOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {categories &&
                    categories.map((category, index) => (
                      <div
                        key={index}
                        className={`p-3 cursor-pointer hover:bg-gray-50 ${
                          index % 2 === 1 ? "bg-gray-50" : ""
                        }`}
                        onClick={() => selectCategory(category)}
                      >
                        {category.name}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div>
              <p className="mb-2 font-medium">
                Upload Resume{" "}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </p>
              <div
                className={`border-2 border-dashed ${
                  errors.resume ? "border-red-300" : "border-gray-200"
                } rounded-lg p-8 text-center cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <File className="w-8 h-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drop and Drag File here or Choose file
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOC or DOCX (Max 5MB)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "resume")}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {errors.resume && (
                <p className="mt-1 text-xs text-red-500">{errors.resume}</p>
              )}

              {formData.resume && !errors.resume && (
                <p className="mt-2 text-sm text-green-600">
                  File selected: {formData.resume.name}
                </p>
              )}

              {uploadProgress > 0 && !errors.resume && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Your File is Uploading</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out shadow-sm"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm text-gray-500">
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="mb-2 font-medium">Major Interest</p>
              <div className="flex gap-2 flex-wrap mb-2">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <span className="text-blue-600 text-sm">{interest}</span>
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  ref={interestInputRef}
                  value={currentInterest}
                  onChange={(e) => setCurrentInterest(e.target.value)}
                  onKeyDown={handleInterestKeyDown}
                  placeholder="Add your interests"
                  className={`flex-1 px-4 py-3 rounded-l-lg bg-gray-50 border ${
                    errors.majorIntrest ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-r-lg flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {errors.majorIntrest && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.majorIntrest}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Press Enter or click + to add
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={prevStep}
                className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 font-medium">
                Login Now
              </Link>
            </p>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Upload Profile Photo
            </h2>

            {errors.formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {errors.formError}
              </div>
            )}
            <p className="text-gray-500">
              Upload Profile Photo{" "}
              <span className="font-medium">(Optional)</span>
            </p>

            <div
              className={`w-32 h-32 rounded-full bg-gray-100 border ${
                errors.profile_pic ? "border-red-500" : "border-gray-200"
              } flex items-center justify-center overflow-hidden`}
            >
              {formData.profile_pic ? (
                <Image
                  src={URL.createObjectURL(formData.profile_pic)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              ) : (
                <User className="w-16 h-16 text-gray-300" />
              )}
            </div>

            {errors.profile_pic && (
              <p className="text-xs text-red-500">{errors.profile_pic}</p>
            )}

            <label className="w-full">
              <div className="w-full py-3 px-4 bg-white border border-blue-500 text-blue-500 font-medium rounded-lg text-center cursor-pointer">
                Upload
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "profile_pic")}
                accept="image/*"
              />
            </label>

            <div className="w-full flex space-x-2">
              <button
                onClick={prevStep}
                className="w-1/2 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-1/2 py-3 px-4 ${
                  isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                } text-white font-medium rounded-lg transition-colors flex items-center justify-center`}
              >
                {isLoading ? (
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
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </button>
            </div>

            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 font-medium">
                Login Now
              </Link>
            </p>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {registrationSuccess ? (
                  <Check className="w-8 h-8 text-green-600" />
                ) : (
                  <X className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {registrationSuccess
                  ? "Registration Successful!"
                  : "Registration Failed"}
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                {responseMessage}
              </p>
            </div>

            {registrationSuccess ? (
              <p className="text-md font-bold">
                {emailVarificationMsg &&
                  "Please check your email for verification."}
              </p>
            ) : (
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full max-w-xs py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-center"
              >
                Try Again
              </button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-white px-8 pt-8 pb-4">
          <div className="flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-yellow-500 transition-transform hover:scale-110 duration-300">
              Q
            </span>
            <span className="text-3xl font-bold text-black transition-transform hover:scale-110 duration-300">
              H
            </span>
            <span className="ml-2 inline-flex items-center justify-center h-6 w-16 rounded-full text-xs font-medium bg-gray-100">
              jobs
            </span>
          </div>
          <p className="text-center text-base mb-6 text-gray-600">
            JobSeekers Registration
          </p>

          <div className="mb-8">
            <ol className="flex items-center w-full">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-center ${
                    index < steps.length - 1 ? "w-full" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step.status === "complete"
                        ? "bg-blue-600"
                        : step.status === "current"
                        ? "bg-blue-100 border-2 border-blue-600"
                        : "bg-gray-200"
                    } shrink-0`}
                  >
                    {step.status === "complete" ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span
                        className={`text-sm ${
                          step.status === "current"
                            ? "text-blue-600 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        step.status === "complete"
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
