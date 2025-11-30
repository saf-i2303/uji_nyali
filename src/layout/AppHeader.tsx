"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Swal from "sweetalert2";
import { User, LogOut } from "lucide-react";

const AppHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { data: session } = useSession();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) signOut({ callbackUrl: "/" });
  };

  const user = session?.user || {
    name: "User",
    role: "Admin",
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">

        {/* LEFT */}
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg dark:border-gray-800 dark:text-gray-400 lg:flex lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <span className="text-lg font-bold">×</span>
            ) : (
              <span className="text-2xl font-bold">≡</span>
            )}
          </button>

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

          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 11C6.83 11 7.5 11.67 7.5 12.5C7.5 13.33 6.83 14 6 14C5.17 14 4.5 13.33 4.5 12.5C4.5 11.67 5.17 11 6 11ZM18 11C18.83 11 19.5 11.67 19.5 12.5C19.5 13.33 18.83 14 18 14C17.17 14 16.5 13.33 16.5 12.5C16.5 11.67 17.17 11 18 11ZM12 12.5C12 11.67 11.33 11 10.5 11C9.67 11 9 11.67 9 12.5C9 13.33 9.67 14 10.5 14C11.33 14 12 13.33 12 12.5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* RIGHT */}
        <div
          className={`${isOpen ? "flex" : "hidden"} items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <NotificationDropdown />

            {/* USER DROPDOWN */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Image
                  src="/images/icons/profile-icon.png"
                  width={32}
                  height={32}
                  alt="Profile"
                  className="rounded-full"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 z-50 overflow-hidden">

                  {/* USER INFO */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.role}
                    </p>
                  </div>

                  {/* PROFILE */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 
                      hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 
                      text-red-600 hover:bg-red-50 dark:text-red-400 
                      dark:hover:bg-gray-800 transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;
