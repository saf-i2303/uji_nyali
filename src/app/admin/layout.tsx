"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useSidebar } from "@/context/SidebarContext";

import AppSidebar from "@/components/sidebar";
import AppHeader from "@/components/header/AppHeader";
import Backdrop from "@/layout/Backdrop";

export default function PetugasLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user || null;

  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar admin */}
      <AppSidebar userRole="admin" />

      <Backdrop />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        {/* Header menerima user */}
        <AppHeader user={user} />

        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
