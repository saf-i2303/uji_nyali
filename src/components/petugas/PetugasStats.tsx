"use client";

import { BookOpen, Users, ClipboardList, RefreshCcw } from "lucide-react";

const stats = [
  {
    title: "Total Buku",
    value: 320,
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Siswa",
    value: 120,
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Peminjaman Aktif",
    value: 45,
    icon: ClipboardList,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Pengembalian Pending",
    value: 12,
    icon: RefreshCcw,
    color: "bg-red-100 text-red-600",
  },
];

export default function PetugasStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${item.color}`}
          >
            <item.icon size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <h3 className="text-xl font-semibold">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
