"use client";

import {
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";

// -----------------------------
// Types
// -----------------------------
type FooterSectionProps = {
  title: string;
  items: string[];
};

// -----------------------------
// Data
// -----------------------------
const footerSections: Record<string, string[]> = {
  koleksi: [
    "Katalog Buku",
    "E-Book",
    "Jurnal & Artikel",
    "Koleksi Digital",
    "Baru Ditambahkan",
  ],
  layanan: [
    "Peminjaman Buku",
    "Perpanjangan Pinjaman",
    "Ruang Baca",
    "Bantuan Pengunjung",
    "Kegiatan Literasi",
  ],
  panduan: [
    "Cara Meminjam Buku",
    "Peraturan Perpustakaan",
    "Kebijakan Privasi",
    "Ketentuan Penggunaan",
    "Hubungi Admin",
  ],
};

// -----------------------------
// Social Media Icons
// -----------------------------
const SocialMediaLinks = () => {
  const socialIcons = [
    { Icon: Twitter, label: "Twitter" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Globe, label: "Website" },
  ];

  return (
    <div className="flex items-center gap-4 text-gray-400 mt-3">
      {socialIcons.map(({ Icon, label }) => (
        <Icon
          key={label}
          className="w-5 h-5 hover:text-white cursor-pointer transition-colors duration-200"
          aria-label={label}
        />
      ))}
    </div>
  );
};

// -----------------------------
// Footer Section Component
// -----------------------------
const FooterSection = ({ title, items }: FooterSectionProps) => (
  <div>
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li
          key={item}
          className="hover:text-white cursor-pointer transition-colors duration-200"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// -----------------------------
// Brand Section
// -----------------------------
const BrandSection = () => (
  <div className="flex flex-col gap-4">
    {/* Logo */}
    <div className="flex items-center gap-3">
      <img
        src="/images/picture/logo.png"
        alt="Logo Perpusan"
        className="w-16 h-16 object-contain"
      />
      <h2 className="text-xl font-bold text-white">Perpusan</h2>
    </div>

    {/* Deskripsi */}
    <p className="text-sm text-gray-400 leading-relaxed">
      Akses perpustakaan digital sekolah dengan mudah. Pinjam buku, telusuri
      koleksi, dan tingkatkan literasimu.
    </p>

    {/* Email */}
    <div className="flex items-center gap-3">
      <Mail className="w-5 h-5 text-gray-400" />
      <a
        href="mailto:perpusan@gmail.com"
        className="text-sm hover:text-white transition-colors duration-200"
      >
        perpusan@gmail.com
      </a>
    </div>

    {/* Social Media */}
    <SocialMediaLinks />
  </div>
);

// -----------------------------
// MAIN FOOTER COMPONENT
// -----------------------------
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#281A14] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <BrandSection />

          <FooterSection
            title="Koleksi"
            items={footerSections.koleksi}
          />

          <FooterSection
            title="Layanan"
            items={footerSections.layanan}
          />

          <FooterSection
            title="Panduan"
            items={footerSections.panduan}
          />
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-16 text-sm border-t border-gray-700 pt-8">
          © {currentYear} Perpusan. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
