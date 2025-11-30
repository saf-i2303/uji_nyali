"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/layanan/accordion";
import { HelpCircle, BookOpen, Users, Clock, Search, AlertCircle } from "lucide-react";

export default function PanduanSection() {
  const items = [
    {
      id: "1",
      value: "item-1",
      title: "Bagaimana cara meminjam buku di perpustakaan?",
      content:
        "Siswa dapat meminjam buku dengan membawa kartu pelajar ke meja layanan. Petugas akan membantu proses peminjaman dan mencatat data buku di sistem. Batas peminjaman adalah 7 hari dan dapat diperpanjang.",
      icon: <BookOpen size={20} />,
    },
    {
      id: "2",
      value: "item-2",
      title: "Apa saja fasilitas yang tersedia di perpustakaan?",
      content:
        "Perpustakaan menyediakan ruang baca nyaman, komputer akses internet, koleksi buku pelajaran dan fiksi, Wi-Fi gratis, serta area diskusi kelompok. Semua fasilitas dapat dipakai oleh seluruh siswa.",
      icon: <HelpCircle size={20} />,
    },
    {
      id: "3",
      value: "item-3",
      title: "Apakah pengunjung perlu membuat akun untuk menggunakan komputer?",
      content:
        "Ya, siswa perlu login menggunakan akun sekolah atau meminta akses kepada petugas perpustakaan. Ini bertujuan untuk menjaga keamanan penggunaan fasilitas digital.",
      icon: <Users size={20} />,
    },
    {
      id: "4",
      value: "item-4",
      title: "Bagaimana aturan menjaga ketenangan di ruang perpustakaan?",
      content:
        "Pengunjung wajib menjaga ketenangan, tidak berbicara keras, dan tidak menggunakan ponsel di area baca. Area diskusi disediakan khusus bagi diskusi kelompok.",
      icon: <AlertCircle size={20} />,
    },
    {
      id: "5",
      value: "item-5",
      title: "Bagaimana jika buku yang saya cari tidak tersedia?",
      content:
        "Jika buku sedang dipinjam, pengunjung bisa mengajukan permintaan supaya petugas melakukan pemesanan atau mencarikan buku alternatif.",
      icon: <Search size={20} />,
    },
    {
      id: "6",
      value: "item-6",
      title: "Apakah ada batasan jumlah buku yang bisa dipinjam?",
      content:
        "Setiap siswa dapat meminjam maksimal 3 buku sekaligus. Untuk buku referensi tertentu, hanya bisa dibaca di tempat.",
      icon: <Clock size={20} />,
    },
  ];

  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3, 6);

  return (
    <section id="panduan" className="relative w-full bg-white py-20 px-6 md:px-16 overflow-hidden">
      {/* Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #281A14 1px, transparent 1px)',
        backgroundSize: '25px 25px'
      }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div 
          className="max-w-4xl mx-auto text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#281A14] leading-tight mb-4">
            Pertanyaan Umum & Petunjuk
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Panduan ini membantu siswa dan pengunjung memahami tata cara
            menggunakan fasilitas perpustakaan dengan baik.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Kolom Kiri */}
          <div className="flex-1" data-aos="fade-right" data-aos-duration="800">
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              {leftItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.value}
                  className="border border-gray-200 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#7C4F39]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <AccordionTrigger className="text-left text-[15px] font-semibold text-[#281A14] hover:text-[#7C4F39] transition-colors flex items-start gap-3">
                    <div className="mt-0.5 text-[#7C4F39] shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </AccordionTrigger>

                  <AccordionContent className="text-gray-700 text-[14px] leading-relaxed pl-8">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Kolom Kanan */}
          <div className="flex-1" data-aos="fade-left" data-aos-duration="800">
            <Accordion type="single" collapsible defaultValue="item-4" className="space-y-4">
              {rightItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.value}
                  className="border border-gray-200 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#7C4F39]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <AccordionTrigger className="text-left text-[15px] font-semibold text-[#281A14] hover:text-[#7C4F39] transition-colors flex items-start gap-3">
                    <div className="mt-0.5 text-[#7C4F39] shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </AccordionTrigger>

                  <AccordionContent className="text-gray-700 text-[14px] leading-relaxed pl-8">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p className="text-gray-600 mb-4">Masih ada pertanyaan lain?</p>
          <a 
            href="#kontak" 
            className="inline-flex items-center gap-2 bg-[#281A14] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#7C4F39] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <HelpCircle size={18} />
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}