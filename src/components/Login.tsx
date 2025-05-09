"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginUser } from "@/lib/postData";
import { ILogin } from "@/types/auth";
import { loginSchema } from "@/types/schema";
import { errorToast } from "@/lib/toast";

export default function Login() {
    const [showpwd, setshowpwd] = useState(false);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const rememberMe = useRef<HTMLInputElement>(null);
    const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (
        data.MSG === " Invalid Username or Password  !!" ||
        data.STS === "500"
      ) {
        errorToast("Invalid Username or Password");
        return;
      }
      if (data.CONTENT.isEmailVerified !== true) {
        if(data.CONTENT.userRole !== "ROLE_QH"){
          router.push("/verify-email");
          return;
        }
      }
      localStorage.setItem("sessionId", data.CONTENT.token);
      localStorage.setItem("role", data.CONTENT.userRole);
      if (data.CONTENT.userRole === "ROLE_COMPANY") {
        localStorage.setItem("companyId", data.CONTENT.userId);
        localStorage.setItem("companyName", data.CONTENT.userName);
        router.push("/company");
        return;
      }
      if (data.CONTENT.userRole === "ROLE_USER") {
        localStorage.setItem("userId", data.CONTENT.userId);
        router.push("/user");
        return;
      }
      if (data.CONTENT.userRole === "ROLE_QH") {
        localStorage.setItem("userId", data.CONTENT.userId);
        router.push("/chatBoard");
        return;
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
            errorToast(errorMessages[0].message);
            return;
        }

        loginMutation.mutate(loginData.data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200 mx-4 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>

                <div className="text-center relative">
                    <div className="inline-flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-blue-500 transition-transform hover:scale-110 duration-300">
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
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
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
                                        className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <span
                                        onClick={() => setshowpwd(!showpwd)}
                                        className="text-xs text-red-400  cursor-pointer absolute right-5 top-3.5"
                                    >
                                        {showpwd ? <Eye /> : <EyeOff />}
                                    </span>
                                    <input
                                        type={`${
                                            showpwd ? "text" : "password"
                                        }`}
                                        id="password"
                                        name="password"
                                        ref={password}
                                        required
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
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
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
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
                            className="w-full px-6 py-3 text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                            onClick={handleLogin}
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm mt-6">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
