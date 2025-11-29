"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DetailBookAdmin() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/buku/${id}`);
        const data = await res.json();
        setBook(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!book) return <p className="p-6">Buku tidak ditemukan.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Detail Buku</h1>

      {/* GAMBAR */}
      <div className="w-full flex justify-center mb-6">
        <img
          src={book.image}
          alt={book.title}
          className="w-60 h-80 object-cover rounded shadow-md"
        />
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 text-lg">
        <p><strong>Judul:</strong> {book.title}</p>
        <p><strong>Penulis:</strong> {book.author}</p>
        <p><strong>Penerbit:</strong> {book.publisher}</p>
        <p><strong>Tahun:</strong> {book.year}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Kategori:</strong> {book.category}</p>
        <p><strong>Bahasa:</strong> {book.language}</p>
        <p><strong>Halaman:</strong> {book.pages}</p>
        <p><strong>Stok:</strong> {book.stock}</p>
        <p><strong>Kode Lokasi:</strong> {book.location_code}</p>
        <p><strong>Kondisi:</strong> {book.condition_book}</p>
        <p>
          <strong>Ditambahkan:</strong>{" "}
          {book.createdat ? book.createdat.slice(0, 10) : "-"}
        </p>
      </div>

      {/* DESKRIPSI */}
      <div className="mt-6">
        <h2 className="font-bold text-xl mb-2">Deskripsi</h2>
        <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
      </div>

      {/* BUTTON */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.push(`/admin/books/edit/${id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Edit
        </button>

        <button
          onClick={async () => {
            await fetch(`/api/buku/${id}`, { method: "DELETE" });
            router.push("/admin/books");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
