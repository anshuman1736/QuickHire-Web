"use client";

import useAuth from "@/hooks/useAuth";
import { Role } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function AuthProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [routePath, setRoutePath] = useState<"user" | "company" | null>(null);

  useEffect(() => {
    if (isAuthenticated === false && localStorage.getItem("sessionId")) {
      return;
    }

    const roleType = localStorage.getItem("role")?.toString() as Role;

    if (roleType === Role.ROLE_COMPANY) {
      setRoutePath("company");
    }
    if (roleType === Role.ROLE_USER) {
      setRoutePath("user");
    }

    setIsLoading(false);
    if (role === roleType && isAuthenticated && routePath) {
      router.push(routePath);
    }
  }, [isAuthenticated, role, routePath, router]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
