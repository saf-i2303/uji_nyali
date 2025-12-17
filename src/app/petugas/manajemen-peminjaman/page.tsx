"use client";

import { useEffect, useState } from "react";

type BookDetail = {
  id: number;
  title: string;
  image?: string;
  quantity: number;
};

type Borrowing = {
  id: number;
  user_id: number;
  user_name?: string;
  borrow_date: string;
  due_date: string;
  status: string;
  books: BookDetail[];
};

export default function ManajemenPeminjaman() {
  const [data, setData] = useState<Borrowing[]>([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const res = await fetch("/api/petugas/borrowings", { cache: "no-store" });
    const json = await res.json();

    // Sort terbaru di paling atas
    const sorted = json.sort((a: Borrowing, b: Borrowing) => b.id - a.id);

    setData(sorted);
  };

  const updateStatus = async (id: number, action: string) => {
    const res = await fetch(`/api/petugas/borrowings/${id}?action=${action}`, {
      method: "PUT",
    });

    if (res.ok) {
      await loadData();
    } else {
      alert("Gagal update status!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  const filteredData = data.filter(
    (d) =>
      d.user_id.toString().includes(search) ||
      d.id.toString().includes(search) ||
      d.user_name?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const color: any = {
      "menunggu konfirmasi": "bg-yellow-500",
      disetujui: "bg-green-600",
      dipinjam: "bg-blue-600",
      terlambat: "bg-red-600",
      dikembalikan: "bg-gray-600",
      ditolak: "bg-gray-400",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${color[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Peminjaman</h1>
      </div>

      {/* SEARCH */}
      <div className="flex justify-end mb-3">
        <input
          type="text"
          placeholder="Cari ID / User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-60"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left border-b">
              <th className="p-3">ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Status</th>
              <th className="p-3">Detail Buku</th>
              <th className="p-3">Gambar</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {/* ID */}
                  <td className="p-3 font-semibold">{item.id}</td>

                  {/* USER */}
                  <td className="p-3">
                    <div className="font-semibold">{item.user_name || "-"}</div>
                    <div className="text-sm text-gray-500">
                      ID: {item.user_id}
                    </div>
                  </td>

                  {/* TANGGAL */}
                  <td className="p-3 text-sm">
                    <div>
                      Pinjam:{" "}
                      {new Date(item.borrow_date).toLocaleDateString(
                        "id-ID",
                        dateFormat
                      )}
                    </div>
                    <div>
                      Batas:{" "}
                      {new Date(item.due_date).toLocaleDateString(
                        "id-ID",
                        dateFormat
                      )}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-3">{getStatusBadge(item.status)}</td>

                  {/* DETAIL BUKU */}
                  <td className="p-3 text-sm">
                    {item.books.map((b) => (
                      <div key={b.id}>
                        {b.title} —{" "}
                        <span className="font-semibold">{b.quantity}x</span>
                      </div>
                    ))}
                  </td>

                  {/* GAMBAR */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      {item.books.map((b) => (
                        <img
                          key={b.id}
                          src={b.image || "/no-image.png"}
                          className="w-12 h-16 object-cover rounded border"
                          alt={b.title}
                        />
                      ))}
                    </div>
                  </td>

                  {/* AKSI */}
                  <td className="p-3">
                    {item.status === "menunggu konfirmasi" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(item.id, "approve")}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => updateStatus(item.id, "decline")}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Tolak
                        </button>
                      </div>
                    )}

                    {/* DISETUJUI */}
                    {item.status === "disetujui" && (
                      <button
                        onClick={() => updateStatus(item.id, "dipinjam")}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Tandai Dipinjam
                      </button>
                    )}

                  
                    {item.status === "dipinjam" && (
                      <span className="text-gray-600 text-sm">Dipinjam</span>
                    )}

                   
                    {(item.status === "dikembalikan" ||
                      item.status === "ditolak" ||
                      item.status === "terlambat") && (
                      <span className="text-gray-500 text-sm font-semibold">
                        Selesai
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5 text-gray-500">
                  Tidak ada data peminjaman.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
