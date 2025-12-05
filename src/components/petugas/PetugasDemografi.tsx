"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieData {
  frequentBorrowers: number;
  infrequentBorrowers: number;
}

export default function PetugasDemografi() {
  const [data, setData] = useState<PieData>({
    frequentBorrowers: 0,
    infrequentBorrowers: 0,
  });

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/petugas/dashboard");
        const json = await res.json();
        setData({
          frequentBorrowers: json.frequentBorrowers || 0,
          infrequentBorrowers: json.infrequentBorrowers || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    }

    fetchDashboard();
  }, []);

  const pieData = [
    { name: "Sering Pinjam", value: data.frequentBorrowers },
    { name: "Jarang Pinjam", value: data.infrequentBorrowers },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Statistik Peminjaman Siswa</h2>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
            >
              <Cell fill="#2563eb" />
              <Cell fill="#fb923c" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          Sering Pinjam ({data.frequentBorrowers}%)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          Jarang Pinjam ({data.infrequentBorrowers}%)
        </div>
      </div>
    </div>
  );
}
