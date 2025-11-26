import React from "react";
import { getConnection } from "@/lib/db";
import BookList from "@/components/home/books/BookList";
import CategoryFilter from "@/components/home/books/category";

export default async function UserHomePage() {
  const conn = await getConnection();
  const [rows] = await conn.query("SELECT * FROM books");
  const books = rows as any[];

  // ambil kategori unik
  const categories = [...new Set(books.map((b) => b.category))];

  return (
    <div className="p-6">
      {/* CATEGORY BADGE DI SINI */}
      <CategoryFilter categories={categories} />

      {/* LIST BOOK CARD */}
      <BookList books={books} />
    </div>
  );
}
