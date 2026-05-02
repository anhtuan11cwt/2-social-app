import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import RightSidebar from "@/components/shared/RightSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-dark-1 min-h-screen text-white">
      <Navbar />

      <div className="flex justify-center pt-24">
        <div className="flex gap-6 px-4 w-full max-w-7xl">
          <aside className="hidden md:flex flex-shrink-0 w-64">
            <LeftSidebar />
          </aside>

          <main className="flex-1 w-full max-w-2xl">{children}</main>

          <aside className="hidden lg:flex flex-shrink-0 w-80">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
