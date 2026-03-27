import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] overflow-hidden items-stretch">
      <Sidebar />
      <div className="flex-1 lg:ml-64 relative bg-primary/30">
        {children}
      </div>
    </div>
  );
}
