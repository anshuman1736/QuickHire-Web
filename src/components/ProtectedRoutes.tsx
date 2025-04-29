"use client";

import useAuth from "@/hooks/useAuth";
import { Role } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleType: Role;
}

export default function ProtectedRoute({
  children,
  roleType,
}: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false && localStorage.getItem("sessionId")) {
      return;
    }

    setIsLoading(false);

    if (!isAuthenticated && !localStorage.getItem("sessionId")) {
      router.push("/login");
    } else if (role !== roleType && isAuthenticated) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, role, roleType, router]);

  if (isLoading || !isAuthenticated || role !== roleType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
