"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const roleImages: Record<string, string> = {
  admin: "https://i.pinimg.com/736x/6c/aa/5f/6caa5f7c1ac7fdc407d9f0af1a0ede14.jpg",
  guru: "https://i.pinimg.com/736x/86/ef/b0/86efb04b36c37dc6269ad4fc9dd8e9c7.jpg",
  user: "https://i.pinimg.com/736x/38/e1/60/38e160c97916144d466c9e0e06a1f92b.jpg",
};

interface User {
  name: string;
  role: "admin" | "guru" | "user";
  identifier: string; // NIPD
  image?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user as User;

  if (!user) return <p>Loading...</p>;

  const menu = [
    { title: "Favorit Buku", href: "#" },
    { title: "Riwayat Peminjaman", href: "#" },
    { title: "Pengaturan Notifikasi", href: "#" },
    { title: "Bantuan & FAQ", href: "#" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* User info */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={user.image || roleImages[user.role]}
            alt={user.name}
            width={96}
            height={96}
            className="object-cover"
          />
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
            <Image
              src={roleImages[user.role]}
              alt={user.role}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">NIPD: {user.identifier}</p>
          <p className="mt-1 text-sm font-medium text-gray-400">Role: {user.role.toUpperCase()}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        {menu.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >
            {item.title}
          </a>
        ))}
      </div>

      {/* Informasi tambahan */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-3">Informasi Tambahan</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Member sejak: 12 Januari 2023</li>
          <li>Total buku dipinjam: 24</li>
          <li>Status keanggotaan: Aktif</li>
          <li>Notifikasi email: Aktif</li>
        </ul>
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Sign out
      </button>
    </div>
  );
}
