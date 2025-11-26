export default function Berita() {
  const posts = [
    {
      title: "Disdukcapil Depok Targetkan 488 Perekaman e‑KTP di SMK Taruna Bhakti",
      date: "1 Oktober 2025",
      category: "Kegiatan",
      link: "https://berita.depok.go.id/disdukcapil-depok-targetkan-488-perekaman-e-ktp-di-smk-taruna-bhakti",
      image: "./images/picture/blog1.jpg",
      excerpt:
        "Dinas Kependudukan dan Pencatatan Sipil Kota Depok menargetkan 488 pelajar SMK Taruna Bhakti mengikuti perekaman KTP elektronik lewat program jemput bola.",
    },
    {
      title: "Wakil Wali Kota Depok Serahkan e‑KTP ke Pelajar SMK Taruna Bhakti",
      date: "1 Oktober 2025",
      category: "Kegiatan / Publik",
      link: "https://berita.depok.go.id/wakil-wali-kota-depok-serahkan-e-ktp-ke-pelajar-smk-taruna-bhakti",
      image: "./images/picture/blog2.jpg",
      excerpt:
        "Wakil Wali Kota Depok, Chandra Rahmansyah, menyerahkan secara simbolis e‑KTP kepada puluhan siswa SMK Taruna Bhakti sebagai bagian dari program layanan Disdukcapil.",
    },
    {
      title: "Wujudkan Depok Tertib Administrasi, Wakil Wali Kota Tinjau Perekaman KTP‑el Siswa SMK Taruna Bhakti",
      date: "1 Oktober 2025",
      category: "Berita Pemerintah",
      link: "https://prokopim.depok.go.id/wujudkan-depok-tertib-administrasi-wakil-wali-kota-tinjau-perekaman-ktp-el-siswa-smk-taruna-bhakti",
      image: "./images/picture/blog1.jpg",
      excerpt:
        "Wakil Wali Kota Depok, Chandra Rahmansyah, meninjau langsung program perekaman KTP elektronik siswa SMK Taruna Bhakti sebagai bagian dari program layanan publik.",
    },
    {
      title: "Mahasiswa UBSI Tingkatkan Literasi Digital Siswa SMK Taruna Bhakti Depok",
      date: "31 Mei 2025",
      category: "Kegiatan Edukasi",
      link: "https://www.kompasiana.com/zerocut2356/684c8267ed641538481ea9c4/mahasiswa-ubsi-tingkatkan-literasi-digital-siswa-smk-taruna-bhakti-depok",
      image: "./images/picture/blog3.jpg",
      excerpt:
        "Mahasiswa UBSI mengadakan penyuluhan literasi digital di SMK Taruna Bhakti Depok, mengajak siswa menggunakan media dengan lebih bijak.",
    },
    {
      title: "2 Korban Kebakaran Gedung Cyber 1 Siswa SMK Taruna Bhakti Depok",
      date: "3 Desember 2021",
      category: "Tragedi",
      link: "https://news.detik.com/berita/d-5838421/2-korban-kebakaran-gedung-cyber-1-siswa-smk-taruna-bhakti-depok",
      image: "./images/picture/blog4.jpg",
      excerpt:
        "Dua siswa SMK Taruna Bhakti jurusan Teknik Komputer dan Jaringan meninggal dunia akibat kebakaran Gedung Cyber 1 saat PKL.",
    },
    {
      title: "Wakil Wali Kota Depok Minta Pelajar Segera Rekam e‑KTP untuk Akses Pelayanan Publik",
      date: "2 Oktober 2025",
      category: "Kebijakan Publik",
      link: "https://teropongnews.com/2025/10/wakil-wali-kota-depok-minta-pelajar-segera-rekam-e-ktp-untuk-akses-pelayanan-publik/",
      image: "./images/picture/blog2.jpg",
      excerpt:
        "Wakil Wali Kota Chandra Rahmansyah mengimbau siswa SMK Taruna Bhakti yang sudah berusia 17 tahun untuk segera melakukan perekaman e‑KTP agar bisa mengakses layanan publik.",
    },
  ];

  return (
    <section className="w-full py-16 bg-white" id="blog">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#281A14] text-center">
          Berita & Kegiatan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
            >
              <div className="overflow-hidden rounded-xl h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-[#7C4F39] font-Nunito font-semibold uppercase">
                  {post.category}
                </p>
                <h3 className="text-xl font-semibold font-nunito  text-[#281A14] mt-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 font-nunito">{post.date}</p>
                <p className="text-gray-600 mt-2 font-nunito ">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
