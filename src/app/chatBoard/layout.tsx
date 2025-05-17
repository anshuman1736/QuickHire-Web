import Header from "@/components/chatApp/headerChat";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { Role } from "@/types/user";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute roleType={Role.ROLE_QH}>
      <Header />
      <main>{children}</main>
    </ProtectedRoute>
  );
}
