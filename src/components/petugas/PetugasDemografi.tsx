"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Sering Pinjam", value: 65 },
  { name: "Jarang Pinjam", value: 35 },
];

export default function PetugasDemografi() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Statistik Siswa & Peminjaman</h2>

      {/* GRID STAT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-blue-600">430</p>
          <p className="text-gray-600 text-sm">Total Siswa</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-green-600">280</p>
          <p className="text-gray-600 text-sm">Siswa Aktif</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-purple-600">1,250</p>
          <p className="text-gray-600 text-sm">Total Buku</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-orange-500">120</p>
          <p className="text-gray-600 text-sm">Pinjaman Bulan Ini</p>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={3}
            >
              <Cell fill="#2563eb" /> {/* Biru */}
              <Cell fill="#fb923c" /> {/* Orange */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          Sering Pinjam (65%)
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          Jarang Pinjam (35%)
        </div>
      </div>
    </div>
  );
}
