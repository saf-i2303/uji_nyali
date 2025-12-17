"use client";

import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { useSidebar } from "@/context/SidebarContext";
import React from "react";

export default function AppHeader({ user }: { user: any }) {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 z-50">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6">

        {/* LEFT — HAMBURGER */}
        <button
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
          className="
            flex items-center justify-center
            w-10 h-10 lg:w-11 lg:h-11
            text-gray-600 dark:text-gray-400
            rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          {isMobileOpen ? (
            <span className="text-lg font-bold">×</span>
          ) : (
            <span className="text-2xl font-bold">≡</span>
          )}
        </button>

        {/* RIGHT — THEME TOGGLE + NOTIF + USER */}
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <NotificationDropdown />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
