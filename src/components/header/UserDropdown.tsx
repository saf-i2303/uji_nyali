"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

const roleImages: Record<string, string> = {
  admin: "https://i.pinimg.com/736x/6c/aa/5f/6caa5f7c1ac7fdc407d9f0af1a0ede14.jpg",
  guru: "https://i.pinimg.com/736x/86/ef/b0/86efb04b36c37dc6269ad4fc9dd8e9c7.jpg",
  user: "https://i.pinimg.com/736x/38/e1/60/38e160c97916144d466c9e0e06a1f92b.jpg",
};

interface UserDropdownProps {
  isMobile?: boolean;
}

export default function UserDropdown({ isMobile }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user as
    | { name: string; role: "admin" | "guru" | "user"; identifier: string; image?: string }
    | undefined;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  // Untuk versi mobile tampil lebih simple
  if (isMobile) {
    return (
      <div className="relative w-11 h-11 rounded-full overflow-hidden">
        <Image
          src={user.image || roleImages[user.role]}
          alt={user.name}
          width={44}
          height={44}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 text-gray-700 dark:text-gray-400"
      >
        <span className="h-11 w-11 rounded-full overflow-hidden">
          <Image
            src={user.image || roleImages[user.role]}
            alt={user.name}
            width={44}
            height={44}
            className="object-cover"
          />
        </span>
        <span className="font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col gap-2 z-50">
          <span className="block font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
          <span className="text-gray-500 text-sm">NIPD: {user.identifier}</span>

          <a
            href="/profile"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Account settings
          </a>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
