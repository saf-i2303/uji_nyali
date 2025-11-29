"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Borrowing = {
  id: number;
  borrow_date: string;
  due_date: string;
  status:
    | "dipinjam"
    | "terlambat"
    | "dikembalikan"
    | "menunggu konfirmasi"
    | "disetujui"
    | "ditolak";
  books: {
    id: number;
    title: string;
    author: string; 
    image: string;
    quantity: number;
  }[];
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
};

export default function RiwayatPeminjamanPage() {
  const { data: session } = useSession();
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchBorrowings = async () => {
      try {
        const res = await fetch(`/api/borrowings?user_id=${session.user.id}`);

        if (!res.ok) throw new Error("Gagal mengambil data peminjaman");

        const data = await res.json();
        setBorrowings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, [session?.user?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "menunggu konfirmasi":
        return "bg-yellow-500";
      case "disetujui":
        return "bg-green-600";
      case "dipinjam":
        return "bg-blue-600";
      case "terlambat":
        return "bg-red-600";
      case "dikembalikan":
        return "bg-gray-600";
      case "ditolak":
        return "bg-gray-400";
      default:
        return "bg-gray-300";
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Yakin ingin membatalkan peminjaman ini?")) return;

    try {
      const res = await fetch(`/api/borrowings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal membatalkan peminjaman");

      setBorrowings((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!session?.user) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">
          Silakan login terlebih dahulu untuk melihat riwayat peminjaman
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        Riwayat Peminjaman
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : borrowings.length === 0 ? (
        <p className="text-gray-600">Belum ada riwayat peminjaman.</p>
      ) : (
        <div className="grid gap-6">
          {borrowings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-xl border bg-white shadow-sm"
            >
              {/* DATA UTAMA */}
              <div className="flex justify-between items-start">
                <div>
                  <p>
                    <strong>ID Peminjaman:</strong> {b.id}
                  </p>
                  <p>
                    <strong>Tanggal Pinjam:</strong>{" "}
                    {formatDate(b.borrow_date)}
                  </p>
                  <p>
                    <strong>Jatuh Tempo:</strong>{" "}
                    {formatDate(b.due_date)}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </div>

              {/* LIST BUKU */}
              <div className="mt-4">
                <p className="font-semibold mb-2">Buku Yang Dipinjam:</p>
                <div className="flex flex-col gap-3">
                  {b.books.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 border p-3 rounded-lg"
                    >
                      <img
                        src={book.image}
                        className="w-14 h-20 object-cover rounded"
                        alt={book.title}
                      />
                      <div>
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-sm text-gray-600">
                          {book.author} {/* AUTHOR TETAP ADA */}
                        </p>
                        <p className="text-sm mt-1">
                          Jumlah: {book.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-4 flex gap-3">
                {b.status === "menunggu konfirmasi" && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Batalkan
                  </button>
                )}

                <Link
                  href={`/user/riwayat-peminjaman?id=${b.id}`}
                  className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
