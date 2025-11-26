export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="w-full bg-white py-20 px-6 md:px-16 scroll-mt-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

        {/* TEXT */}
        <div>
          <p className="text-[#7C4F39] font-semibold tracking-wide mb-2">
            KAMI ADALAH
          </p>

          <h2 className="text-4xl font-bold text-[#281A14] mb-6 leading-tight">
            Perpustakaan Sekolah
          </h2>

          <p className="text-lg text-[#281A14] leading-relaxed mb-4 text-justify">
            Perpusan kami merupakan wadah literasi yang dirancang 
            untuk mendukung kebutuhan belajar siswa. Tempat ini menjadi ruang 
            yang nyaman untuk membaca, mencari referensi, serta mengembangkan 
            kemampuan akademik dan minat literasi.
          </p>

          <p className="text-lg text-[#281A14] leading-relaxed text-justify">
            Perpustakaan berlokasi di <b>lantai 3 gedung utama</b>, dilengkapi 
            dengan rak koleksi buku, area baca yang tenang, meja diskusi, komputer, 
            serta koneksi Wi-Fi yang memadai. Lingkungan ini disiapkan agar siswa 
            dapat belajar secara mandiri maupun berkelompok dengan suasana yang kondusif.
          </p>
        </div>

        {/* IMAGE */}
        <div className="w-full">
          <img
            src="/images/picture/about.png"
            alt="Perpustakaan Sekolah"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
