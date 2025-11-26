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

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Favorite Books</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">Belum ada buku favorit.</p>
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
