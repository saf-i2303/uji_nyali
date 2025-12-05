"use client";

import { useEffect, useState } from "react";
import { BookOpen, Users, ClipboardList, RefreshCcw } from "lucide-react";

export default function PetugasStats() {
  const [statsData, setStatsData] = useState({
    totalBooks: 0,
    totalUsers: 0,
    activeBorrow: 0,
    returnToday: 0,
  });

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/petugas/dashboard");
        const data = await res.json();
        setStatsData({
          totalBooks: data.totalBooks || 0,
          totalUsers: data.totalUsers || 0,
          activeBorrow: data.activeBorrow || 0,
          returnToday: data.returnToday || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    }

    fetchDashboard();
  }, []);

  const stats = [
    {
      title: "Total Buku",
      value: statsData.totalBooks,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Siswa",
      value: statsData.totalUsers,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Peminjaman Aktif",
      value: statsData.activeBorrow,
      icon: ClipboardList,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Pengembalian Hari Ini",
      value: statsData.returnToday,
      icon: RefreshCcw,
      color: "bg-red-100 text-red-600",
    },
  ];

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
