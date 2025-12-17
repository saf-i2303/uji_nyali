"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import { ChevronDown, User, LogOut } from "lucide-react";
import Link from "next/link";

interface UserType {
  name?: string;
  email?: string;
  role?: "admin" | "guru" | "user";
  image?: string;
}

export default function UserDropdown({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false);

  // Default images berdasarkan role
  const roleImages: Record<string, string> = {
    admin: "https://i.pinimg.com/736x/6c/aa/5f/6caa5f7c1ac7fdc407d9f0af1a0ede14.jpg",
    guru: "https://i.pinimg.com/736x/86/ef/b0/86efb04b36c37dc6269ad4fc9dd8e9c7.jpg",
    user: "https://i.pinimg.com/736x/38/e1/60/38e160c97916144d466c9e0e06a1f92b.jpg",
  };

  const fallbackAvatar =
    roleImages[user?.role || "user"] ??
    "https://i.pinimg.com/736x/86/ef/b0/86efb04b36c37dc6269ad4fc9dd8e9c7.jpg";

  const avatar =
    user?.image?.trim()
      ? user.image
      : fallbackAvatar;

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Apakah kamu yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full transition"
      >
        <Image
          src={avatar}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border z-50 animate-fadeIn">
          {/* User Info */}
          <div className="p-3 border-b">
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
