"use client";
import { loginUser } from "@/lib/postData";
import { ILogin } from "@/types/auth";
import { loginSchema } from "@/types/schema";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';


export default function Login() {
  const [showpwd, setshowpwd] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rememberMe = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data.CONTENT.token);
      localStorage.setItem("sessionId", data.CONTENT.token);
      localStorage.setItem("role", data.CONTENT.userRole);
      if (data.CONTENT.userRole === "ROLE_COMPANY") {
        localStorage.setItem("companyId", data.CONTENT.userId);
        router.push("/company");
      }
      if (data.CONTENT.userRole === "ROLE_USER") {
        router.push("/user");
      }
    },
    onError(error) {
      if (error) {
        console.error(error);
      }
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData: ILogin = {
      email: email.current?.value as string,
      password: password.current?.value as string,
    };

    const loginData = loginSchema.safeParse(userData);

    if (!loginData.success) {
      const errorMessages = loginData.error.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));
      console.error("Validation errors:", errorMessages);
      return;
    }

    loginMutation.mutate(loginData.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200 mx-4 relative overflow-hidden">
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
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        <form className="mt-8 space-y-5 relative">
          <div className="space-y-4">
            {/* Email Field */}
            {email && (
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
                    name="email"
                    ref={email}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            {password && (
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span onClick={()=>setshowpwd(!showpwd )} className="text-xs text-red-400  cursor-pointer absolute right-5 top-3.5">{showpwd? <Eye />: <EyeOff />}</span>
                  <input
                    type={`${showpwd ? 'text':'password'}`}
                    id="password"
                    name="password"
                    ref={password}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {rememberMe && (
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  ref={rememberMe}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-base font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.01]"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Apple
          </button>
        </div>

        <div className="text-center text-sm mt-6">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
