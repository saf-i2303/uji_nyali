"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BooksManagement() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/buku");
      const data = await res.json();
      setBooks(data.data ?? data);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: number) => {
    if (!confirm("Yakin ingin menghapus buku?")) return;

    await fetch(`/api/buku/${id}`, {
      method: "DELETE",
    });

    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Kelola Data Buku</h1>

        <Link
          href="/admin/books/add"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          + Tambah Buku
        </Link>
      </div>

      {/* GRID CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg shadow-sm bg-white overflow-hidden hover:shadow-lg transition"
          >
            {/* COVER */}
            <div className="w-full h-56 bg-gray-200">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  No Cover
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1 line-clamp-1">
                {book.title}
              </h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                {book.author}
              </p>

              {/* ACTION BUTTON */}
              <div className="flex gap-2">
                <Link
                  href={`/admin/books/edit/${book.id}`}
                  className="flex-1 text-center px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteBook(book.id)}
                  className="flex-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Belum ada data buku.</p>
      )}
    </div>
  );
}
