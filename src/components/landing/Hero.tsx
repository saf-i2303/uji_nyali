"use client";

import { IconSearch } from "@tabler/icons-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-[90%] mx-auto bg-white pt-[100px] pb-20 font-sans overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div data-aos="zoom-out-right" className="space-y-5">
          <h1 className="text-4xl font-extrabold text-[#281A14] leading-snug">
            Perpusan yuk !!
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            Tempat nyaman buat belajar, baca buku seru, dan nambah
            wawasan bareng sobat baca lainnya.
          </p>

          {/* SEARCH BAR – cleaned */}
          <div className="mt-6 flex items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-md w-full max-w-md">
            <input
              type="text"
              placeholder="Cari buku kesukaanmu…"
              className="flex-1 outline-none text-gray-700 text-base"
            />
            <IconSearch size={22} className="text-[#281A14]" />
          </div>

          {/* JAM LAYANAN */}
          <div className="bg-[#281A14] text-white rounded-xl p-4 shadow-md w-max mt-6">
            <p className="font-bold">Jam layanan</p>
            <p>Senin – Jumat : 07.00 – 15.30 WIB</p>
            <p>Istirahat : 11.30 – 12.30 WIB</p>
            <p>Sabtu & Minggu : Tutup</p>
          </div>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div data-aos="fade-left" className="flex justify-center md:justify-end">
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
