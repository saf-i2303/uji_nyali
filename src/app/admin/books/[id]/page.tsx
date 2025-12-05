"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BookDetailAdmin() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch detail buku
  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/buku/${id}`);
      if (!res.ok) throw new Error("Gagal memuat buku");
      const data = await res.json();
      setBook(data.data ?? data);
    } catch (err) {
      console.error(err);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  // Delete buku
  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus buku?")) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/buku/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus buku");
      router.push("/admin/books");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus buku");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!book) return <p className="p-8 text-red-600">Buku tidak ditemukan</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/admin/books" className="text-blue-600 underline">
        ← Kembali
      </Link>

      <div className="flex gap-8 mt-6">
        {/* COVER */}
        <div className="w-60 h-80 bg-gray-200 rounded shadow overflow-hidden">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              No Image
            </div>
          )}
        </div>

        {/* DETAIL */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 text-lg mb-4">{book.author}</p>

          <div className="space-y-2">
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Tahun:</strong> {book.year}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Kategori:</strong> {book.category}</p>
            <p><strong>Bahasa:</strong> {book.language}</p>
            <p><strong>Jumlah Halaman:</strong> {book.pages}</p>
            <p><strong>Stok:</strong> {book.stock}</p>
            <p><strong>Lokasi Buku:</strong> {book.location_code}</p>
            <p><strong>Kondisi Buku:</strong> {book.condition_book}</p>
            <p><strong>Created At:</strong> {book.createdat}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-1">Deskripsi:</h3>
            <p className="text-gray-700 leading-relaxed">
              {book.description || "Deskripsi belum tersedia"}
            </p>
          </div>

          {/* ACTION */}
          <div className="flex gap-3 mt-8">
            <Link
              href={`/admin/books/edit/${book.id}`}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`px-4 py-2 rounded-md text-white ${
                deleting ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {deleting ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
