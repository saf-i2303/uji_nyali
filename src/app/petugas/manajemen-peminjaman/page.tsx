"use client";
import { useEffect, useState } from "react";

type BookDetail = {
  id: number;
  title: string;
  author: string;
  image: string;
  quantity: number;
};

type Borrowing = {
  id: number;
  user_id: number;
  borrow_date: string;
  due_date: string;
  status: string;
  books: BookDetail[];
};

export default function ManajemenPeminjaman() {
  const [data, setData] = useState<Borrowing[]>([]);

  const loadData = async () => {
    const res = await fetch("/api/petugas/borrowings", {
      cache: "no-store",
    });
    setData(await res.json());
  };

  const updateStatus = async (id: number, action: string) => {
    const res = await fetch(`/api/petugas/borrowings/${id}?action=${action}`, {
      method: "PUT",
    });

    if (res.ok) {
      loadData(); // refresh
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "menunggu konfirmasi":
        return "bg-yellow-500";
      case "disetujui":
        return "bg-green-500";
      case "dipinjam":
        return "bg-blue-500";
      case "dikembalikan":
        return "bg-gray-600";
      case "ditolak":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Manajemen Peminjaman</h1>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg bg-white shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">ID Peminjaman: {item.id}</div>
                <div>User ID: {item.user_id}</div>
                <div>Tanggal: {item.borrow_date}</div>
                <div>Batas: {item.due_date}</div>
              </div>

              <span
                className={`px-3 py-1 text-white rounded-full ${statusColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-2 font-semibold">Detail Buku:</div>
            <ul className="pl-4 list-disc">
              {item.books.map((b) => (
                <li key={b.id}>
                  {b.title} — {b.quantity}x
                </li>
              ))}
            </ul>

            <div className="flex gap-3 mt-4">
              {item.status === "menunggu konfirmasi" && (
                <>
                  <button
                    onClick={() => updateStatus(item.id, "approve")}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Setujui
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "decline")}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Tolak
                  </button>
                </>
              )}

              {item.status === "disetujui" && (
                <button
                  onClick={() => updateStatus(item.id, "return")}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Tandai Dikembalikan
                </button>
              )}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-gray-500 text-center">
            Tidak ada data peminjaman
          </p>
        )}
      </div>
    </div>
  );
}
