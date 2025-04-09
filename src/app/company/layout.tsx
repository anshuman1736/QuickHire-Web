import CmpHeader from "@/components/company/CmpHeader";
import Footer from "@/components/user/footer";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <CmpHeader/>
      {children}
      <Footer />
    </div>
  );
}
