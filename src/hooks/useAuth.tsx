"use client";

import { Role } from "@/types/user";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("sessionId")?.toString();
    const roleString = localStorage.getItem("role")?.toString();
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
      if (roleString === Role.ROLE_COMPANY) {
        setActiveRole(Role.ROLE_COMPANY);
      } else if (roleString === Role.ROLE_USER) {
        setActiveRole(Role.ROLE_USER);
      }
    } else {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  return {
    token: token,
    role: activeRole,
    isAuthenticated: isAuthenticated,
  };
}
