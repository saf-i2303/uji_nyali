"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen } from "lucide-react";

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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <BookOpen /> Detail Peminjaman
        </h1>

        {/* Info Buku */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="w-full sm:w-[150px] h-[200px] relative">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#281A14]">{book.title}</h2>
            <p className="text-gray-600 mb-1">Penulis: {book.author}</p>
            <p className="text-gray-700 mb-1">Kategori: {book.category}</p>
            <p className="text-gray-700 mb-1">Halaman: {book.pages}</p>
            <p className="text-gray-700 mb-1">Bahasa: {book.language}</p>
            <p className="text-gray-700 mb-1">Lokasi: {book.location}</p>
            <p className="text-gray-700 mb-1">Stok: {book.stock}</p>
            <p className="text-gray-700 mb-1">Kondisi: {book.condition}</p>
          </div>
        </div>

        {/* Pilih Tanggal Pinjam */}
        <div className="mb-4">
          <label className="font-medium">Tanggal Mulai Peminjaman</label>
          <DatePicker
            selected={borrowDate}
            onChange={(date) => {
              setBorrowDate(date);
              setDueDate(null); // reset dueDate agar tidak invalid
            }}
            minDate={new Date()} // tidak bisa pilih tanggal sebelum hari ini
            placeholderText="Pilih tanggal mulai pinjam"
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Pilih Tanggal Kembali */}
        <div className="mb-4">
          <label className="font-medium">Tanggal Pengembalian</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            minDate={borrowDate || new Date()} // tidak bisa sebelum borrow_date
            placeholderText="Pilih tanggal kembali"
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleBorrow}
          disabled={loading}
          className="mt-6 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold py-3 w-full rounded-lg transition"
        >
          {loading ? "Memproses..." : "Konfirmasi Peminjaman"}
        </button>
      </div>
    </div>
  );
}
