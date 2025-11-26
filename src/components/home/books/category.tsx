"use client";

import Link from "next/link";

export default function RekomendasiSection({
  categories,
}: {
  categories: string[];
}) {
  return (
    <div className="w-full">

      {/* HEADER & BADGE */}
      <div className="flex items-start justify-between mb-6">
        {/* Left Text */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Rekomendasi Buku</h2>
          <p className="text-gray-600">Temukan inspirasi baca kamu!</p>
        </div>

        {/* Badge */}
        <span className="px-4 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-medium h-fit">
          Direkomendasikan
        </span>
      </div>

      {/* CATEGORY BADGES */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/category/${encodeURIComponent(cat)}`}
            className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
