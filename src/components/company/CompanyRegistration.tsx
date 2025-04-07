"use client";

import { useRef, useState } from "react";
import { Building2, Info, Check, File, X } from "lucide-react";
import { RegisterCompany } from "@/hooks/recruiter/Registration";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { ICompanyRegister } from "@/types/auth";

export default function CompanyRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneNo: "",
    cinNumber: 0,
    cinCertificate: "",
    password: "",
    confirmPassword: "",
    profile_pic: "",
    categoryId: 1,
    categoryName: "",
    creationData: "",
    fullName: "",
    completeProfile: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Refs for form inputs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const companyRegister = useMutation({
    mutationFn: RegisterCompany,
    onSuccess: (data) => {
      setCurrentStep(4);
      setRegistrationSuccess(data.STS === "200");
      setResponseMessage(data.MSG);
    },
    onError: (error) => {
      const errorData = error.response?.data || {
        STS: "500",
        MSG: "Network error. Please check your connection",
      };

      setErrors({
        formError: errorData.MSG,
      });

      if (currentStep === 3) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "companyProfilePic" | "cinCertificate"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "File size exceeds 5MB limit",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      if (errors[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));
      }

      if (fieldName === "cinCertificate") {
        simulateUpload();
      }
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } } as any, "cinCertificate");
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.companyName?.trim()) {
        newErrors.companyName = "Company name is required";
        isValid = false;
      }
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.phoneNo?.trim()) {
        newErrors.phoneNo = "Phone number is required";
        isValid = false;
      }
      if (!formData.cinNumber) {
        newErrors.cinNumber = "CIN number is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      // Clear form-level errors when moving to next step
      if (errors.formError) {
        setErrors((prev) => ({ ...prev, formError: "" }));
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    // Clear form-level errors when going back
    if (errors.formError) {
      setErrors((prev) => ({ ...prev, formError: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(3)) {
      const companyForm: ICompanyRegister = {
        companyName: formData.companyName || "",
        email: formData.email || "",
        phoneNo: formData.phoneNo || "",
        cinNumber: formData.cinNumber || 0,
        profile_pic: "123",
        cinCertificate: formData.cinCertificate || "123",
        password: formData.password || "",
        fullName: formData.companyName || "",
        categoryId: 1,
        creationData: new Date().toISOString(),
        completeProfile: true,
        categoryName: "Default",
      };
      companyRegister.mutate(companyForm);
    }
    // Additional schema validation
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              Register Your Company
            </h2>

            {errors.formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {errors.formError}
              </div>
            )}

            <div>
              <input
                type="text"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleInputChange}
                placeholder="Company Name"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.companyName ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="Company Email"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
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
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
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

            <div>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo || ""}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.phoneNo ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.phoneNo && (
                <p className="mt-1 text-xs text-red-500">{errors.phoneNo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CIN Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cinNumber"
                  value={formData.cinNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Company Identification Number"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                    errors.cinNumber ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              {errors.cinNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.cinNumber}</p>
              )}
            </div>

            <div>
              <p className="mb-2 font-medium">Upload CIN Certificate</p>
              <div
                className={`border-2 border-dashed ${
                  errors.cinCertificate ? "border-red-300" : "border-gray-200"
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
                  PDF, JPG or PNG (Max 5MB)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "cinCertificate")}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
              {errors.cinCertificate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.cinCertificate}
                </p>
              )}

              {formData.cinCertificate && !errors.cinCertificate && (
                <p className="mt-2 text-sm text-green-600">
                  File selected: {formData.cinCertificate}
                </p>
              )}

              {uploadProgress > 0 && !errors.cinCertificate && (
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
            <h2 className="text-2xl font-bold text-center">Company Logo</h2>

            {errors.formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {errors.formError}
              </div>
            )}

            <p className="text-gray-500">
              Upload your company logo to complete registration
            </p>

            <div
              className={`w-32 h-32 rounded-full bg-gray-100 border ${
                errors.companyProfilePic ? "border-red-500" : "border-gray-200"
              } flex items-center justify-center overflow-hidden`}
            >
              {formData.profile_pic ? (
                <Image
                  src={URL.createObjectURL()}
                  alt="Company Logo Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-16 h-16 text-gray-300" />
              )}
            </div>
            {errors.companyProfilePic && (
              <p className="text-xs text-red-500">{errors.companyProfilePic}</p>
            )}

            <label className="w-full">
              <div className="w-full py-3 px-4 bg-white border border-blue-500 text-blue-500 font-medium rounded-lg text-center cursor-pointer">
                Upload Logo
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "companyProfilePic")}
                accept="image/*"
              />
            </label>

            <div className="flex space-x-2">
              <button
                onClick={prevStep}
                className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={companyRegister.isPending}
                className={`w-full py-3 px-4 ${
                  companyRegister.isPending
                    ? "bg-blue-300"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-medium rounded-lg transition-colors flex items-center justify-center`}
              >
                {companyRegister.isPending ? (
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
                  "Complete Registration"
                )}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                registrationSuccess ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {registrationSuccess ? (
                <Check className="w-8 h-8 text-green-600" />
              ) : (
                <X className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {registrationSuccess
                ? "Registration Complete!"
                : "Registration Failed"}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">{responseMessage}</p>

            {registrationSuccess ? (
              <Link
                href="/login"
                className="w-full max-w-xs py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-center"
              >
                Login Now
              </Link>
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

  const steps = [
    {
      name: "Company Info",
      status:
        currentStep > 1
          ? "complete"
          : currentStep === 1
          ? "current"
          : "pending",
    },
    {
      name: "Legal Info",
      status:
        currentStep > 2
          ? "complete"
          : currentStep === 2
          ? "current"
          : "pending",
    },
    {
      name: "Branding",
      status:
        currentStep > 3
          ? "complete"
          : currentStep === 3
          ? "current"
          : "pending",
    },
    { name: "Complete", status: currentStep === 4 ? "current" : "pending" },
  ];

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
            Company Registration
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
}
