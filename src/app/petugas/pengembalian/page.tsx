"use client";

import { useEffect, useState } from "react";

type BookDetail = {
  id: number;
  title: string;
  quantity: number;
  image?: string;
};

type Borrowing = {
  id: number;
  user_id: number;
  borrow_date: string;
  due_date: string;
  status: string;
  books: BookDetail[];
};

export default function PengembalianPage() {
  const [data, setData] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

 
  const fetchBorrowings = async () => {
    try {
      const res = await fetch("/api/petugas/return", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

 
  const hitungDenda = (due_date: string) => {
    const today = new Date();
    const deadline = new Date(due_date);

    if (today <= deadline) return 0;

    const diffTime = today.getTime() - deadline.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    return diffDays * 1000; // Rp 1.000 / hari
  };

  
  const handleReturn = async (id: number) => {
    setProcessingId(id);

    try {
      await fetch(`/api/petugas/return/${id}?action=confirm`, {
        method: "PUT",
      });

      fetchBorrowings();
    } catch (err) {
      console.error("RETURN ERROR:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pengembalian Buku</h1>

      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Tidak ada buku yang sedang dipinjam.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left border-b">
                <th className="p-3">ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Detail Buku</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Denda</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => {
                const denda = hitungDenda(item.due_date);

                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.id}</td>

                    <td className="p-3">{item.user_id}</td>

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

                    <td className="p-3 text-sm">
                      {item.books.map((b) => (
                        <div key={b.id} className="flex items-center gap-2">
                          <img
                            src={b.image || "/no-image.png"}
                            alt={b.title}
                            className="w-10 h-14 object-cover rounded border"
                          />
                          <div>
                            {b.title} —{" "}
                            <span className="font-semibold">{b.quantity}x</span>
                          </div>
                        </div>
                      ))}
                    </td>

                    <td className="p-3 font-semibold text-center">
                      {item.books.reduce((sum, b) => sum + b.quantity, 0)}
                    </td>

                    <td className="p-3 font-semibold text-red-600">
                      {denda > 0 ? `Rp ${denda.toLocaleString()}` : "-"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleReturn(item.id)}
                        disabled={processingId === item.id}
                        className={`px-3 py-1 text-white rounded text-sm ${
                          processingId === item.id
                            ? "bg-gray-400"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {processingId === item.id
                          ? "Memproses..."
                          : "Konfirmasi Pengembalian"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
