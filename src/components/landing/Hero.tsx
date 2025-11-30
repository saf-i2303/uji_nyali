"use client";

import { DotPattern } from "@/components/ui/DotPattern";
import { AvatarCircles } from "@/components/ui/AvatarCircles";
import { Clock } from "lucide-react";

const avatarData = [
  { 
    name: "User 1",
    image: "https://i.pinimg.com/736x/86/ef/b0/86efb04b36c37dc6269ad4fc9dd8e9c7.jpg"
  },
  { 
    name: "User 2",
    image: "https://i.pinimg.com/736x/71/24/8d/71248d1f6cabfd2b798fab338b5e83e4.jpg"
  },
  { 
    name: "User 3",
    image: "https://i.pinimg.com/736x/ae/49/36/ae4936367f700534e9d270c8bbf2d451.jpg"
  },
  { 
    name: "User 4",
    image: "https://i.pinimg.com/736x/56/50/13/565013b84e660daf46ac39e941c51b23.jpg"
  },
  { 
    name: "User 5",
    image: "https://i.pinimg.com/736x/9c/c3/59/9cc359a99606e6acc3bd7f9bc0da5f32.jpg"
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-[90%] mx-auto bg-white pt-[120px] pb-20 font-sans overflow-hidden rounded-2xl"
    >
      {/* DOT PATTERN FULL WIDTH + HALF HEIGHT */}
      <div className="absolute inset-0 h-[55%] w-full overflow-hidden rounded-2xl pointer-events-none">
        <DotPattern
          width={22}
          height={22}
          cx={2}
          cy={2}
          cr={1.5}
          glow={false}
          className="text-[#281A14]/50 w-full h-full"
        />

        {/* GRADIENT FADE: Top solid → Middle fade → Bottom invisible */}
        <div className="absolute inset-0 bg-linear-to-b 
            from-white/0 
            via-white/60 
            to-white">
        </div>
      </div>

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div data-aos="zoom-out-right" className="space-y-5 relative z-10">
          <h1 className="text-4xl font-extrabold text-[#281A14] leading-snug">
            Perpusan yuk !!
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            Tempat nyaman buat belajar, baca buku seru, dan nambah
            wawasan bareng sobat baca lainnya.
          </p>

          {/* AVATAR + MEMBER */}
          <div className="flex items-center gap-3 py-2">
            <AvatarCircles people={avatarData} numPeople={5} />
            <span className="text-sm text-gray-600 font-medium">
              <span className="text-[#281A14] font-bold">100+</span> Sobat Baca Aktif
            </span>
          </div>

          {/* JAM LAYANAN BADGES */}
          <div className="flex flex-wrap gap-2 mt-6">

            <div className="inline-flex items-center gap-2 bg-[#281A14]/90 text-white rounded-full px-4 py-2 shadow-md">
             <Clock className="w-4 h-4" />
              <span className="text-sm">Senin – Jumat: 07.00 – 15.30 WIB</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-red-600 text-white rounded-full px-4 py-2 shadow-md">
              <span className="text-sm font-medium">Sabtu & Minggu: Tutup</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          data-aos="fade-left"
          className="flex justify-center md:justify-end relative z-10"
        >
          <img
            src="/images/picture/hero.png"
            alt="Perpustakaan"
            className="w-[480px] md:w-[550px] h-auto object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}