import Link from "next/link";

export default function Akhir() {
  return (
    <section className="w-full bg-white py-28 text-center">
      <h1 className="text-5xl font-bold text-[#281A14] mb-6">
        Yuk, Temukan Pengetahuan Baru Hari Ini!
      </h1>

      <p className="text-lg text-[#281A14] max-w-3xl mx-auto mb-10 leading-relaxed">
        Akses perpustakaan sekolah dengan lebih mudah. Pinjam buku kapan saja,
        temukan koleksi favoritmu dengan cepat, dan nikmati layanan digital
        tanpa batas waktu dan tempat.
      </p>

      <Link href="/login">
        <button className="bg-[#281A14] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#7C4F39] transition flex items-center gap-2 mx-auto">
          Mulai Membaca
          <span>→</span>
        </button>
      </Link>
    </section>
  );
}
