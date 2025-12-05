"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Clock,
  X,
  Image as ImageIcon,
} from "lucide-react";

/* ============================
   Types
===============================*/
type Book = {
  id: number;
  title: string;
  author: string;
  image?: string;
  quantity: number;
};

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
  books: Book[];
};

/* ============================
   Helpers & Constants
===============================*/
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

const STATUS_STYLES = {
  "menunggu konfirmasi": {
    label: "Menunggu",
    bgClass: "bg-amber-600",
    text: "text-white",
  },
  disetujui: {
    label: "Disetujui",
    bgClass: "bg-emerald-600",
    text: "text-white",
  },
  dipinjam: {
    label: "Dipinjam",
    bgClass: "bg-[#8B5E3C]",
    text: "text-white",
  },
  terlambat: {
    label: "Terlambat",
    bgClass: "bg-red-700",
    text: "text-white",
  },
  dikembalikan: {
    label: "Dikembalikan",
    bgClass: "bg-blue-600",
    text: "text-white",
  },
  ditolak: {
    label: "Ditolak",
    bgClass: "bg-gray-500",
    text: "text-white",
  },
} as const;

const STATUS_CATEGORIES = [
  { id: "semua", label: "Semua" },
  { id: "dipinjam", label: "Dipinjam" },
  { id: "terlambat", label: "Terlambat" },
  { id: "dikembalikan", label: "Dikembalikan" },
  { id: "ditolak", label: "Ditolak" },
];

/* ============================
   Main Component
===============================*/
export default function RiwayatPeminjamanPage() {
  const { data: session } = useSession();
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("semua");

  /* ============================
     Fetch Borrowings
  ===============================*/
  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchBorrowings = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/borrowings?user_id=${session.user.id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Gagal mengambil data peminjaman");

        const data = (await res.json()) as Borrowing[];

        setBorrowings([...data].sort((a, b) => b.id - a.id));
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, [session?.user?.id]);

  /* ============================
     Cancel Borrowing
  ===============================*/
  const handleCancel = async (id: number) => {
    if (!confirm("Yakin ingin membatalkan peminjaman ini?")) return;
    try {
      const res = await fetch(`/api/borrowings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal membatalkan peminjaman");
      setBorrowings((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ============================
     Filtering (Memoized)
  ===============================*/
  const filteredBorrowings = useMemo(() => {
    if (activeFilter === "semua") return borrowings;

    if (activeFilter === "dipinjam") {
      return borrowings.filter((b) =>
        ["dipinjam", "menunggu konfirmasi", "disetujui"].includes(b.status)
      );
    }

    return borrowings.filter((b) => b.status === activeFilter);
  }, [borrowings, activeFilter]);

  const getFilteredCount = (id: string) => {
    if (id === "semua") return borrowings.length;
    if (id === "dipinjam")
      return borrowings.filter((b) =>
        ["dipinjam", "menunggu konfirmasi", "disetujui"].includes(b.status)
      ).length;
    return borrowings.filter((b) => b.status === id).length;
  };

  /* ============================
     If Not Logged In
  ===============================*/
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-xl font-bold text-[#281A14] mb-2">
            Akses Terbatas
          </h2>
          <p className="text-[#281A14]/80">
            Silakan login terlebih dahulu untuk melihat riwayat peminjaman
          </p>
        </div>
      </div>
    );
  }

  /* ============================
     MAIN UI
  ===============================*/
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#281A14] mb-1">
            Riwayat Peminjaman
          </h1>
          <p className="text-[#281A14]/80">
            Kelola dan pantau semua peminjaman buku Anda
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6 p-4 rounded-xl backdrop-blur-md bg-white/40 border">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {STATUS_CATEGORIES.map((c) => {
              const active = activeFilter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveFilter(c.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                    active
                      ? "bg-[#8B5E3C] text-white shadow"
                      : "bg-white/70 text-[#281A14] hover:bg-[#8B5E3C]/90 hover:text-white"
                  }`}
                >
                  <span>{c.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      active
                        ? "bg-white text-[#8B5E3C]"
                        : "bg-[#8B5E3C]/10 text-[#281A14]"
                    }`}
                  >
                    {getFilteredCount(c.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-28 text-center">
            <div className="inline-block w-14 h-14 animate-spin border-4 border-slate-200 border-t-[#8B5E3C] rounded-full mb-4"></div>
            <p className="text-[#281A14]/80">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-2xl bg-red-50 border text-center">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        ) : filteredBorrowings.length === 0 ? (
          <div className="p-16 rounded-2xl bg-white/60 backdrop-blur-md text-center border">
            <ImageIcon className="mx-auto w-14 h-14 text-[#8B5E3C]/40 mb-4" />
            <h3 className="text-xl font-bold text-[#281A14] mb-2">
              Belum Ada Peminjaman
            </h3>
            <p className="text-[#281A14]/80">
              Tidak ada data berdasarkan filter saat ini.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBorrowings.map((b) => {
              const s = STATUS_STYLES[b.status];
              const mainBook = b.books[0];
              const isPending = b.status === "menunggu konfirmasi";

              return (
                <article
                  key={b.id}
                  className="relative bg-white/60 backdrop-blur-md rounded-2xl border shadow-md hover:shadow-xl transition-all"
                >
                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow flex items-center gap-2 ${s.bgClass} ${s.text}`}
                  >
                     {s.label}
                  </span>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex gap-6 pr-28">
                      {/* Cover */}
                      <div className="relative shrink-0">
                        <img
                          src={mainBook?.image || "/no-image.png"}
                          alt={mainBook?.title}
                          className="w-28 h-40 object-cover rounded-xl border shadow"
                        />

                        {b.books.length > 1 && (
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#8B5E3C] text-white rounded-full flex items-center justify-center border-2 border-white shadow">
                            +{b.books.length - 1}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="px-3 py-1 border bg-white/60 rounded-md text-sm font-semibold text-[#281A14]">
                          #ID-{b.id}
                        </span>

                        <h3 className="font-bold text-xl text-[#281A14] mt-2 line-clamp-1">
                          {mainBook?.title}
                        </h3>

                        {b.books.length > 1 && (
                          <p className="text-xs text-[#281A14]/70 mb-3">
                            dan {b.books.length - 1} buku lainnya
                          </p>
                        )}

                        <div className="flex items-center gap-6 text-sm text-[#281A14]/70">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            {b.books.length} Buku
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(b.borrow_date)}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Jatuh tempo: {formatDate(b.due_date)}
                          </div>
                        </div>

                        {/* Detail Buku */}
                        <div className="mt-4 space-y-2">
                          {b.books.map((bk, idx) => (
                            <div
                              key={bk.id}
                              className="flex items-center justify-between p-3 bg-white/50 rounded-lg border"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center text-sm font-semibold">
                                  {idx + 1}
                                </div>

                                <div className="min-w-0">
                                  <div className="font-semibold text-sm truncate">
                                    {bk.title}
                                  </div>
                                  <div className="text-xs text-[#281A14]/70 truncate">
                                    {bk.author}
                                  </div>
                                </div>
                              </div>

                              <span className="px-2 py-1 text-xs border rounded bg-[#8B5E3C]/10 text-[#281A14]">
                                {bk.quantity} eks
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Cancel */}
                    {isPending && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="absolute bottom-6 right-6 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-semibold flex items-center gap-2 shadow"
                      >
                        <X className="w-4 h-4" />
                        Batalkan
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
