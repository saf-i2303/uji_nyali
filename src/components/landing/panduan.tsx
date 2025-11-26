"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/layanan/accordion";

export default function PanduanSection() {
  const items = [
    {
      id: "1",
      value: "item-1",
      title: "Bagaimana cara meminjam buku di perpustakaan?",
      content:
        "Siswa dapat meminjam buku dengan membawa kartu pelajar ke meja layanan. Petugas akan membantu proses peminjaman dan mencatat data buku di sistem. Batas peminjaman adalah 7 hari dan dapat diperpanjang.",
    },
    {
      id: "2",
      value: "item-2",
      title: "Apa saja fasilitas yang tersedia di perpustakaan?",
      content:
        "Perpustakaan menyediakan ruang baca nyaman, komputer akses internet, koleksi buku pelajaran dan fiksi, Wi-Fi gratis, serta area diskusi kelompok. Semua fasilitas dapat dipakai oleh seluruh siswa.",
    },
    {
      id: "3",
      value: "item-3",
      title: "Apakah pengunjung perlu membuat akun untuk menggunakan komputer?",
      content:
        "Ya, siswa perlu login menggunakan akun sekolah atau meminta akses kepada petugas perpustakaan. Ini bertujuan untuk menjaga keamanan penggunaan fasilitas digital.",
    },
    {
      id: "4",
      value: "item-4",
      title: "Bagaimana aturan menjaga ketenangan di ruang perpustakaan?",
      content:
        "Pengunjung wajib menjaga ketenangan, tidak berbicara keras, dan tidak menggunakan ponsel di area baca. Area diskusi disediakan khusus bagi diskusi kelompok.",
    },
    {
      id: "5",
      value: "item-5",
      title: "Bagaimana jika buku yang saya cari tidak tersedia?",
      content:
        "Jika buku sedang dipinjam, pengunjung bisa mengajukan permintaan supaya petugas melakukan pemesanan atau mencarikan buku alternatif.",
    },
    {
      id: "6",
      value: "item-6",
      title: "Apakah ada batasan jumlah buku yang bisa dipinjam?",
      content:
        "Setiap siswa dapat meminjam maksimal 3 buku sekaligus. Untuk buku referensi tertentu, hanya bisa dibaca di tempat.",
    },
  ];

  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3, 6);

  return (
    <section id="panduan" className="w-full bg-white py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-[#7C4F39] font-semibold tracking-wide mb-2">
          PANDUAN PERPUSTAKAAN
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[#281A14] leading-tight">
          Pertanyaan Umum & Petunjuk Pengunjung
        </h2>

        <p className="text-[#281A14] mt-4 max-w-2xl mx-auto text-[15px]">
          Panduan ini membantu siswa dan pengunjung memahami tata cara
          menggunakan fasilitas perpustakaan dengan baik.
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Kolom kiri */}
        <Accordion type="single" collapsible defaultValue="item-1" className="flex-1">
          {leftItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.value}
              className="border bg-white px-4 py-2 rounded-md shadow-sm mb-2"
            >
              <AccordionTrigger className="text-left text-[15px] font-medium">
                {item.title}
              </AccordionTrigger>

              <AccordionContent className="text-[#281A14] text-[14px]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Kolom kanan */}
        <Accordion type="single" collapsible defaultValue="item-4" className="flex-1">
          {rightItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.value}
              className="border bg-white px-4 py-2 rounded-md shadow-sm mb-2"
            >
              <AccordionTrigger className="text-left text-[15px] font-medium">
                {item.title}
              </AccordionTrigger>

              <AccordionContent className="text-[#281A14] text-[14px]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
