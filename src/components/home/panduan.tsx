"use client";

import React from "react";
import Image from "next/image";

export default function PanduanPeminjaman() {
  const [lateDays, setLateDays] = React.useState<number>(0);
  const lateFeePerDay = 1000; // IDR
  const calcFee = (days: number) => Math.max(0, days) * lateFeePerDay;

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Optional banner image (you uploaded earlier) */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-sm">
        {/* If you want to show the uploaded image, it lives at the path below */}
        {/* Replace with your optimized image strategy if required */}
        <div className="w-full h-44 relative bg-gray-50 flex items-center justify-center">
          <img
            src="/mnt/data/f80aebea-3246-428d-a7a4-2b8b0faf3c83.png"
            alt="Panduan Perpustakaan"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Panduan Peminjaman Buku</h1>
          <p className="text-gray-600">Langkah lengkap, jam layanan, dan peraturan untuk seluruh warga sekolah.</p>
        </div>

        <div className="text-right">
          <span className="inline-block px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium">Direkomendasikan</span>
          <div className="mt-2 text-sm text-gray-500">Senin–Sabtu, 07:00–15:00</div>
        </div>
      </header>

      {/* Sections */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">Ringkasan Cepat</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Ajukan pinjaman melalui website perpustakaan sekolah.</li>
          <li>Setelah permintaan disetujui petugas, siswi/siswa datang pada tanggal yang ditetapkan untuk mengambil buku.</li>
          <li>Tunjukkan <strong>kartu pelajar</strong> (bukan wajib kartu anggota) saat pengambilan.</li>
          <li>Petugas akan meng-ACC pengambilan dan mengubah status buku menjadi <em>Dipinjam</em>.</li>
          <li>Pengembalian: kembalikan ke meja perpustakaan sesuai tanggal jatuh tempo; denda Rp1.000/hari jika terlambat (mulai hari setelah jatuh tempo).</li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Cara Meminjam (via Web)</h2>

        <ol className="list-decimal pl-5 text-gray-700 space-y-3">
          <li>
            <strong>Cari buku</strong> di katalog web berdasarkan judul, pengarang, atau kategori.
          </li>
          <li>
            <strong>Ajukan permintaan pinjam</strong>: klik tombol <em>Pinjam</em>, pilih tanggal yang diinginkan untuk pengambilan (petugas akan menentukan/konfirmasi tanggal jika perlu).
          </li>
          <li>
            Setelah ajukan, permintaan akan <strong>menunggu persetujuan petugas</strong>. Petugas akan mengecek ketersediaan dan jadwal.
          </li>
          <li>
            Jika disetujui, pihak perpustakaan akan mengubah status permintaan menjadi <strong>Disetujui</strong> dan mencatat tanggal pengambilan. Kamu akan menerima notifikasi (email/WA/in-app sesuai pengaturan).
          </li>
          <li>
            Pada tanggal yang disepakati, datang ke perpustakaan dan <strong>ambil buku</strong> dengan menunjukkan kartu pelajar/identitas sekolah. Petugas akan memindai & mengubah status buku menjadi <strong>Dipinjam</strong>.
          </li>
        </ol>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Jam Operasional & Ketentuan Petugas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="py-1 font-medium">Hari</td>
                  <td className="py-1">Senin – Sabtu</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Jam</td>
                  <td className="py-1">07:00 – 15:00</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Istirahat Petugas</td>
                  <td className="py-1">11:30 – 13:00</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Minggu</td>
                  <td className="py-1">Libur</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-500 mt-3">Catatan: Jika tanggal pengambilan jatuh pada jam istirahat, harap pilih atau konfirmasi waktu lain agar petugas siap.</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Syarat Identitas</h3>
            <p className="text-gray-700">
              Karena ini perpustakaan sekolah, <strong>kartu pelajar/identitas siswa</strong> sudah cukup — kartu anggota tidak wajib selama yang meminjam adalah siswa/warga sekolah terdaftar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Lama Peminjaman & Perpanjangan</h2>

        <ul className="pl-5 list-disc text-gray-700 space-y-2">
          <li>Normal: <strong>7 hari</strong> peminjaman (bisa disesuaikan oleh admin).</li>
          <li>Buku referensi umumnya <strong>tidak dipinjam</strong>.</li>
          <li>Perpanjangan dapat dilakukan <strong>1 kali</strong> jika buku tidak sedang dipesan oleh orang lain.</li>
          <li>Jika lewat 1 hari dari tanggal yang dijanjikan, denda = <strong>Rp1.000 / hari</strong> (mulai hari setelah jatuh tempo).</li>
        </ul>

        <div className="mt-4 border border-dashed p-4 rounded-lg bg-gray-50">
          <h4 className="font-medium mb-2">Kalkulator Denda (contoh)</h4>
          <div className="flex items-center gap-3">
            <input
              type="number"
              className="w-28 px-3 py-2 rounded border"
              min={0}
              value={lateDays}
              onChange={(e) => setLateDays(Number(e.target.value))}
            />
            <div className="text-gray-700">hari terlambat → <strong>Rp {calcFee(lateDays).toLocaleString("id-ID")}</strong></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Masukkan jumlah hari keterlambatan untuk melihat perkiraan denda.</p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Cara Mengembalikan Buku</h2>

        <ol className="list-decimal pl-5 text-gray-700 space-y-3">
          <li>Datang ke meja pengembalian perpustakaan sesuai jam operasional.</li>
          <li>Serahkan buku beserta bukti peminjaman (bukti digital juga diterima jika tersedia).</li>
          <li>Petugas akan memeriksa kondisi buku. Jika kondisi baik, status peminjaman akan ditutup di sistem.</li>
          <li>Jika buku rusak atau hilang, wajib <strong>mengganti</strong> buku yang sama atau membayar sesuai nilai yang ditentukan perpustakaan.</li>
        </ol>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Tips & Rekomendasi</h2>
        <ul className="pl-5 list-disc text-gray-700 space-y-2">
          <li>Catat tanggal jatuh tempo di kalender HP agar tidak lupa.</li>
          <li>Jika berhalangan mengambil buku pada tanggal yang disetujui, batalkan permintaan di web atau hubungi petugas secepatnya.</li>
          <li>Gunakan pembatas buku — jangan melipat halaman.</li>
          <li>Simpan bukti peminjaman sampai buku benar-benar dikembalikan.</li>
        </ul>
      </section>

      <footer className="text-sm text-gray-500 mt-6">
        <p className="mb-2">Perubahan kebijakan dapat diberlakukan sewaktu-waktu oleh pihak perpustakaan. Silakan hubungi petugas untuk konfirmasi lebih lanjut.</p>
        <p>Gambar banner (jika tampil): <code>/mnt/data/f80aebea-3246-428d-a7a4-2b8b0faf3c83.png</code></p>
      </footer>
    </main>
  );
}
