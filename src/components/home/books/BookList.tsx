import React from "react";
import BookCard from "./BooksCard";

export type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  category: string;
  description: string;
  image: string;
  pages: number;
  language: string;
  stock: number;
  location_code: string;
  condition: string;
  createdat: string;
};

type BookListProps = {
  books: Book[];
};

export default function BookList({ books }: BookListProps) {
  if (!books || books.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Buku tidak ditemukan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          category={book.category}
          year={book.year}
          image={book.image}
          rating={4.5}
        />
      ))}
    </div>
  );
}
