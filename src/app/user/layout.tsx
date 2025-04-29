import ProtectedRoute from "@/components/ProtectedRoutes";
import Footer from "@/components/user/footer";
import Header from "@/components/user/header";
import { Role } from "@/types/user";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute roleType={Role.ROLE_USER}>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
