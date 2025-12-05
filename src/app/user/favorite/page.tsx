"use client";

import { useEffect, useState } from "react";
import BookCard, { BookCardProps } from "@/components/home/books/BooksCard";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<BookCardProps[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleClearAll = () => {
    const confirmDelete = confirm("Yakin ingin menghapus semua favorit?");
    if (!confirmDelete) return;

    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#281A14]">Favorite Books</h1>

        {/* Tombol Hapus Semua */}
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white 
                       hover:bg-red-700 transition-all"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-[#281A14] opacity-70">Belum ada buku favorit.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
}
