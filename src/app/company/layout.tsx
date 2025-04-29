import CmpHeader from "@/components/company/CmpHeader";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { Role } from "@/types/user";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute roleType={Role.ROLE_COMPANY}>
      <div className="flex flex-col min-h-screen">
        <CmpHeader />
        <main className="flex-grow">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
