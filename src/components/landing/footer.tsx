import {
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Globe
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#281A14] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* === BRAND + DESKRIPSI === */}
        <div className="flex flex-col gap-4">
          {/* Logo Perpustakaan */}
          <div className="flex items-center gap-3">
            <img
              src="/images/picture/logo.png" // ganti sesuai logo kamu
              alt="Logo Perpustakaan"
              className="w-20 h-20"
            />
            <h2 className="text-xl font-semibold text-white">
              Perpustakaan Sekolah
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Akses perpustakaan digital sekolah dengan mudah. Pinjam buku,
            telusuri koleksi, dan tingkatkan literasimu kapan saja dan di mana saja.
          </p>

          {/* Email */}
          <div className="flex items-center gap-3 mt-3">
            <Mail className="w-5 h-5" />
            <a href="mailto:perpustakaan@sekolah.id" className="hover:text-white">
              perpustakaan@sekolah.id
            </a>
          </div>

          {/* Sosial Media */}
          <div className="flex items-center gap-5 text-gray-400 mt-4">
            <Twitter className="hover:text-white cursor-pointer" />
            <Facebook className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
            <Globe className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* === KOLEKSI === */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Koleksi</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Katalog Buku</li>
            <li className="hover:text-white cursor-pointer">E-Book</li>
            <li className="hover:text-white cursor-pointer">Jurnal & Artikel</li>
            <li className="hover:text-white cursor-pointer">Koleksi Digital</li>
            <li className="hover:text-white cursor-pointer">Baru Ditambahkan</li>
          </ul>
        </div>

        {/* === LAYANAN === */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Layanan</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Peminjaman Buku</li>
            <li className="hover:text-white cursor-pointer">Perpanjangan Pinjaman</li>
            <li className="hover:text-white cursor-pointer">Ruang Baca</li>
            <li className="hover:text-white cursor-pointer">Bantuan Pengunjung</li>
            <li className="hover:text-white cursor-pointer">Kegiatan Literasi</li>
          </ul>
        </div>

        {/* === PANDUAN === */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Panduan</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Cara Meminjam Buku</li>
            <li className="hover:text-white cursor-pointer">Peraturan Perpustakaan</li>
            <li className="hover:text-white cursor-pointer">Kebijakan Privasi</li>
            <li className="hover:text-white cursor-pointer">Ketentuan Penggunaan</li>
            <li className="hover:text-white cursor-pointer">Hubungi Admin</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 mt-12 text-sm border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Perpustakaan Sekolah. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
}
