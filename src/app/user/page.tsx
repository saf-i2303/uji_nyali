import React from "react";
import { getConnection } from "@/lib/db";
import BookList, { Book } from "@/components/home/books/BookList";
import UserHomeClient from "@/components/home/books/UserHomeClient";

export default async function UserHomePage() {
  const conn = await getConnection();
  const [rows] = await conn.query("SELECT * FROM books");
  const books = rows as Book[];

  // ambil kategori unik
  const categories = [...new Set(books.map((b) => b.category))];

  return <UserHomeClient books={books} categories={categories} />;
}
