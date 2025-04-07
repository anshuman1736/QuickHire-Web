import Footer from "@/components/user/footer";
import Header from "@/components/user/header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      {children}
      <Footer />
    </div>
  );
}
