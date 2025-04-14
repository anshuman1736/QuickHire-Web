import CmpHeader from "@/components/company/CmpHeader";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <CmpHeader />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
