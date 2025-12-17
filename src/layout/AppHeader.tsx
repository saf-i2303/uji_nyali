"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { data: session } = useSession();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  const user = session?.user || {
    name: "User",
    role: "Admin",
    image: "/images/icons/profile-icon.png",
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">

        {/* LEFT */}
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b 
          border-gray-200 dark:border-gray-800 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">

          {/* HAMBURGER */}
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg 
              dark:border-gray-800 dark:text-gray-400 lg:flex lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <span className="text-lg font-bold">×</span>
            ) : (
              <span className="text-2xl font-bold">≡</span>
            )}
          </button>

          {/* LOGO MOBILE */}
          <Link href="/" className="lg:hidden">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 px-5 py-3 lg:py-4 lg:px-0">

          <ThemeToggleButton />
          <NotificationDropdown />

          
        </div>

      </div>
    </header>
  );
};

export default AppHeader;
