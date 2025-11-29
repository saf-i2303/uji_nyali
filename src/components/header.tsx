"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";

export default function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 w-full z-40 
        bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800
      "
    >
      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-5 py-5 lg:py-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 dark:text-gray-300"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>

      {/* MOBILE DROPDOWN OVERLAY - tidak menghalangi layout, hanya meniban */}
      {isOpen && (
        <div
          className="
            absolute left-0 top-full w-full 
            bg-white dark:bg-gray-900 shadow-lg
            flex items-center justify-between gap-4 px-5 py-4 lg:hidden
            z-[100]
          "
        >
          <NotificationDropdown />
          <UserDropdown />
        </div>
      )}
    </header>
  );
}
