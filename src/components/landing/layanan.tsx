"use client";

import { BookOpen, Library, FileText } from "lucide-react";

export default function LayananSection() {
  const layanan = [
    {
      title: "PENYEDIAAN KOLEKSI BACAAN",
      desc: "Perpustakaan menyediakan beragam koleksi buku pelajaran, fiksi, nonfiksi, referensi, hingga bahan pengembangan diri untuk mendukung proses belajar siswa.",
      icon: <BookOpen size={42} />,
      side: "left",
    },
    {
      title: "RUANG BACA NYAMAN",
      desc: "Perpustakaan menghadirkan ruang baca yang tenang dan nyaman, dilengkapi meja belajar dan pencahayaan yang baik sehingga siswa dapat lebih fokus.",
      icon: <Library size={42} />,
      side: "right",
    },
    {
      title: "LAYANAN PEMINJAMAN BUKU",
      desc: "Peminjaman dan pengembalian buku dilakukan tertata agar siswa dapat mengakses sumber belajar dengan mudah kapan pun dibutuhkan.",
      icon: <FileText size={42} />,
      side: "left",
    },
  ];

  return (
    <section id="layanan" className="relative w-full py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Headings */}
        <h2 className="text-center text-3xl font-bold text-[#281A14]" >
          Layanan Perpustakaan
          <p className="text-center text-sm mb-20 mt-3">
          Layanan perpustakaan yang mendukung literasi dan kenyamanan belajar siswa
        </p >
        </h2>
        
        

        {/* SVG Curved Timeline */}
        <svg
          className="absolute left-0 right-0 mx-auto top-48 w-full h-[900px] pointer-events-none"
          viewBox="0 0 100 300"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 0 
               C 20 50, 80 100, 50 150
               C 20 200, 80 250, 50 300"
            fill="none"
            stroke="#C7C7C7"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Timeline Items */}
        <div className="flex flex-col gap-32 relative z-10">
          {layanan.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-10 ${
                item.side === "left" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Icon Circle */}
              <div className="min-w-[120px] min-h-[120px] rounded-full bg-white shadow-xl flex items-center justify-center 
                  hover:scale-110 hover:shadow-2xl transition-all duration-300">
                <div className="text-[#7C4F39] ">{item.icon}</div>
              </div>

              {/* Card */}
              <div className="bg-white shadow-md rounded-2xl p-6 max-w-sm border border-gray-100">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-[#281A14] leading-relaxed text-justify">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
