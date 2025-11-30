"use client";

import { Calendar, ArrowUpRight } from "lucide-react";

export default function Berita() {
  const posts = [
    {
      title:
        "Disdukcapil Depok Targetkan 488 Perekaman e-KTP di SMK Taruna Bhakti",
      date: "1 Oktober 2025",
      link: "https://berita.depok.go.id/disdukcapil-depok-targetkan-488-perekaman-e-ktp-di-smk-taruna-bhakti",
      image: "./images/picture/blog1.jpg",
      excerpt:
        "Dinas Kependudukan dan Pencatatan Sipil Kota Depok menargetkan 488 pelajar mengikuti perekaman KTP elektronik lewat program jemput bola.",
    },
    {
      title:
        "Wakil Wali Kota Depok Serahkan e-KTP ke Pelajar SMK Taruna Bhakti",
      date: "1 Oktober 2025",
      link: "https://berita.depok.go.id/wakil-wali-kota-depok-serahkan-e-ktp-ke-pelajar-smk-taruna-bhakti",
      image: "./images/picture/blog2.jpg",
      excerpt:
        "Wakil Wali Kota Depok menyerahkan secara simbolis e-KTP kepada siswa SMK Taruna Bhakti sebagai bagian dari program layanan Disdukcapil.",
    },
    {
      title:
        "Wujudkan Depok Tertib Administrasi, Wakil Wali Kota Tinjau Perekaman KTP-el",
      date: "1 Oktober 2025",
      link: "https://prokopim.depok.go.id/wujudkan-depok-tertib-administrasi-wakil-wali-kota-tinjau-perekaman-ktp-el-siswa-smk-taruna-bhakti",
      image: "./images/picture/blog1.jpg",
      excerpt:
        "Wakil Wali Kota Depok meninjau langsung program perekaman KTP elektronik siswa SMK Taruna Bhakti.",
    },
    {
      title: "Mahasiswa UBSI Tingkatkan Literasi Digital",
      date: "31 Mei 2025",
      link: "https://www.kompasiana.com/zerocut2356/684c8267ed641538481ea9c4/mahasiswa-ubsi-tingkatkan-literasi-digital-siswa-smk-taruna-bhakti-depok",
      image: "./images/picture/blog3.jpg",
      excerpt:
        "Mahasiswa UBSI mengadakan penyuluhan literasi digital di SMK Taruna Bhakti Depok.",
    },
    {
      title: "2 Korban Kebakaran Cyber 1 Siswa SMK Taruna Bhakti",
      date: "3 Desember 2021",
      link: "https://news.detik.com/berita/d-5838421/2-korban-kebakaran-gedung-cyber-1-siswa-smk-taruna-bhakti-depok",
      image: "./images/picture/blog4.jpg",
      excerpt:
        "Dua siswa jurusan Teknik Komputer & Jaringan meninggal dunia akibat kebakaran Gedung Cyber 1 saat PKL.",
    },
    {
      title:
        "Wakil Wali Kota Depok Minta Pelajar Rekam e-KTP untuk Akses Pelayanan Publik",
      date: "2 Oktober 2025",
      link: "https://teropongnews.com/2025/10/wakil-wali-kota-depok-minta-pelajar-segera-rekam-e-ktp-untuk-akses-pelayanan-publik/",
      image: "./images/picture/blog2.jpg",
      excerpt:
        "Wakil Wali Kota mengimbau siswa usia 17 tahun untuk segera melakukan perekaman e-KTP.",
    },
  ];

  return (
    <section
      className="relative w-full py-20 bg-white overflow-hidden"
      id="blog"
    >
      {/* Background Gradient Blur */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7C4F39] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C4F39] rounded-full blur-3xl"></div>
      </div>

      {/* Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #281A14 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#281A14] mb-3">
            Berita & Kegiatan
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan prestasi sekolah
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="text-[#7C4F39]" />
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-[#281A14] mb-3 line-clamp-2 group-hover:text-[#7C4F39] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Baca Selengkapnya */}
                <div className="mt-4 flex items-center gap-2 text-[#7C4F39] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight
                    size={16}
                    className="transform group-hover:rotate-45 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Bottom Line */}
              <div className="h-1 bg-linear-to-r from-[#7C4F39] to-[#C7C7C7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
