"use client";

import { useState } from "react";
import BookList, { Book } from "./BookList";
import CategoryFilter from "./category";

type Props = {
  books: Book[];
  categories: string[];
};

export default function UserHomeClient({ books, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((b) => {
    const matchCategory =
      selectedCategory === "Semua Kategori" ||
      b.category === selectedCategory;

    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="p-6">

      {/* HEADER SECTION */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Rekomendasi Buku</h2>
        <p className="text-gray-600 mt-0.5">Temukan inspirasi baca kamu!</p>
        <div className="h-1 w-20 bg-linear-to-r from-[#281A14] to-[#7C4F39] rounded-full mt-3" />
      </div>

      {/* SEARCH + CATEGORY IN ONE ROW */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 gap-4 w-full">

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Cari buku..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full md:w-[430px] lg:w-[500px]
            px-4 py-2.5 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-[#281A14] outline-none shadow-sm
          "
        />

        {/* CATEGORY DROPDOWN */}
        <div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

      </div>

      {/* BOOK LIST */}
      <BookList books={filteredBooks} />
    </div>
  );
}
