"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/lib/postData";
import { errorToast, successToast } from "@/lib/toast";
import { emailVerify } from "@/types/schema";

export default function VerifyEmailComp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [validationError, setValidationError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const emailVerificationMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      const message =
        data.CONTENT?.message || "Email verification link sent successfully!";
      setSuccessMessage(message);
      successToast(message);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
      if (error) {
        console.error(error);
        errorToast("Error sending verification email. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setSuccessMessage("");

    const inputData = emailVerify.safeParse({
      email: emailRef.current?.value as string,
    });
    if (!inputData.success) {
      const errorMessages = inputData.error.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));
      console.error("Validation errors:", errorMessages);
      if (errorMessages.length > 0) {
        setValidationError(errorMessages[0].message);
        errorToast(errorMessages[0].message);
      }
      return;
    }
    emailVerificationMutation.mutate(inputData.data.email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>

        <div className="text-center relative">
          <div className="inline-flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-yellow-500 transition-transform hover:scale-110 duration-300">
              Q
            </span>
            <span className="text-2xl font-bold text-black transition-transform hover:scale-110 duration-300">
              H
            </span>
            <span className="ml-1 inline-flex items-center justify-center h-5 w-12 rounded-full text-xs font-medium bg-gray-100">
              jobs
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Verify Your Email
          </h2>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{successMessage}</p>
            </div>
            <p className="text-sm mt-1">Redirecting to login page...</p>
          </div>
        )}

        <form className="mt-8 space-y-5 relative" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  required
                  disabled={
                    emailVerificationMutation.isPending || !!successMessage
                  }
                  className={`block w-full px-4 py-3 border ${
                    validationError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 disabled:bg-gray-100`}
                  placeholder="your@email.com"
                />
              </div>
              {validationError && (
                <p className="mt-1 text-sm text-red-600">{validationError}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={emailVerificationMutation.isPending || !!successMessage}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {emailVerificationMutation.isPending
                ? "Verifying..."
                : successMessage
                ? "Email Sent!"
                : "Verify Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
