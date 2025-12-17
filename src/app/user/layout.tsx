"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { useSidebar } from "@/context/SidebarContext";
import AppSidebar from "@/components/sidebar";
import AppHeader from "@/components/header/AppHeader";
import Backdrop from "@/layout/Backdrop";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user || null;

  const userRole =
    (user?.role as "admin" | "guru" | "siswa") || "siswa";

  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar */}
      <AppSidebar userRole={userRole} />

      {/* Backdrop for mobile */}
      <Backdrop />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader user={user} />

        <main className="p-4 md:p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
