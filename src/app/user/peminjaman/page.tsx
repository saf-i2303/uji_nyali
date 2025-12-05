"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, Calendar, MapPin, FileText, Globe, Package, Star, Clock } from "lucide-react";

export default function PeminjamanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const book = {
    id: searchParams.get("book_id") || "",
    title: searchParams.get("title") || "Judul tidak tersedia",
    author: searchParams.get("author") || "Penulis tidak tersedia",
    category: searchParams.get("category") || "Kategori tidak tersedia",
    image: searchParams.get("image") || "/placeholder.png",
    pages: searchParams.get("pages") || "-",
    language: searchParams.get("language") || "-",
    location: searchParams.get("location") || "-",
    stock: searchParams.get("stock") || "-",
    condition: searchParams.get("condition") || "-",
  };

  const userId = searchParams.get("user_id") || "";

  const [borrowDate, setBorrowDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    if (!borrowDate) return alert("Tanggal mulai pinjam wajib diisi!");
    if (!dueDate) return alert("Tanggal pengembalian wajib diisi!");
    if (!userId || !book.id) return alert("Data buku atau user tidak valid.");

    if (dueDate < borrowDate) {
      return alert("Tanggal kembali tidak boleh sebelum tanggal pinjam!");
    }

    setLoading(true);
    try {
      // Insert ke borrowings
      const res = await fetch("/api/borrowings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          borrow_date: borrowDate.toISOString().split("T")[0],
          due_date: dueDate.toISOString().split("T")[0],
          status: "menunggu konfirmasi",
        }),
      });

      const result = await res.json();
      const borrowingId = result.borrowing_id;

      // Insert detail buku
      await fetch("/api/borrowing_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrowing_id: borrowingId,
          book_id: book.id,
        }),
      });

      router.push("/user/riwayat-peminjaman");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat meminjam buku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#281A14] flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            Form Peminjaman Buku
          </h1>
          <p className="text-gray-600 mt-2">Lengkapi informasi peminjaman buku Anda</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Info Buku */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#281A14] mb-6 border-b pb-3">Informasi Buku</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="w-full sm:w-[180px] h-[260px] relative flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#281A14] mb-1">{book.title}</h3>
                  <p className="text-lg text-gray-600">Oleh <span className="font-semibold text-[#281A14]">{book.author}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-[#281A14] text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {book.category}
                  </span>
                  <span className="bg-amber-100 text-[#281A14] px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {book.condition}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#281A14]" />
                    <div>
                      <p className="text-xs text-gray-500">Halaman</p>
                      <p className="font-semibold text-[#281A14]">{book.pages}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#281A14]" />
                    <div>
                      <p className="text-xs text-gray-500">Bahasa</p>
                      <p className="font-semibold text-[#281A14]">{book.language}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#281A14]" />
                    <div>
                      <p className="text-xs text-gray-500">Lokasi Rak</p>
                      <p className="font-semibold text-[#281A14]">{book.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-[#281A14]" />
                    <div>
                      <p className="text-xs text-gray-500">Stok Tersedia</p>
                      <p className="font-semibold text-[#281A14]">{book.stock}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Penting */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="font-bold text-[#281A14] mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Ketentuan Peminjaman
              </h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-7">
                <li>• Maksimal peminjaman adalah 14 hari</li>
                <li>• Keterlambatan pengembalian dikenakan denda Rp 1.000/hari</li>
                <li>• Pastikan buku dalam kondisi baik saat dikembalikan</li>
                <li>• Buku yang hilang/rusak wajib diganti sesuai harga buku</li>
              </ul>
            </div>
          </div>

          {/* Kolom Kanan - Form Tanggal */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#281A14] mb-6 border-b pb-3">Pilih Tanggal</h2>

              {/* Tanggal Mulai Pinjam */}
              <div className="mb-6">
                <label className="block font-semibold text-[#281A14] mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Tanggal Mulai Pinjam
                </label>
                <DatePicker
                  selected={borrowDate}
                  onChange={(date) => {
                    setBorrowDate(date);
                    setDueDate(null);
                  }}
                  minDate={new Date()}
                  placeholderText="Pilih tanggal mulai"
                  className="border-2 border-gray-300 focus:border-[#281A14] focus:outline-none p-3 rounded-lg w-full transition"
                  dateFormat="dd MMMM yyyy"
                />
                {borrowDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    Terpilih: {borrowDate.toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>

              {/* Tanggal Pengembalian */}
              <div className="mb-6">
                <label className="block font-semibold text-[#281A14] mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Tanggal Pengembalian
                </label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  minDate={borrowDate || new Date()}
                  placeholderText="Pilih tanggal kembali"
                  className="border-2 border-gray-300 focus:border-[#281A14] focus:outline-none p-3 rounded-lg w-full transition"
                  dateFormat="dd MMMM yyyy"
                  disabled={!borrowDate}
                />
                {dueDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    Terpilih: {dueDate.toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>

              {/* Durasi Peminjaman */}
              {borrowDate && dueDate && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">Durasi Peminjaman:</p>
                  <p className="text-2xl font-bold text-[#281A14]">
                    {Math.ceil((dueDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24))} Hari
                  </p>
                </div>
              )}

              {/* Button Konfirmasi */}
              <button
                onClick={handleBorrow}
                disabled={loading || !borrowDate || !dueDate}
                className="w-full bg-[#281A14] hover:bg-[#1a110c] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                {loading ? "Memproses..." : "Konfirmasi Peminjaman"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan mengklik tombol di atas, Anda menyetujui ketentuan peminjaman
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}