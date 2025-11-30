"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookForm({ initialData = {}, onSubmit }: any) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    isbn: "",
    category: "",
    description: "",
    image: "",
    pages: "",
    language: "",
    stock: "",
    location_code: "",
    condition_book: "",
    createdat: new Date(),
    ...initialData, // isi otomatis kalau Edit
  });

  // Convert createdat ke Date kalau string
  useEffect(() => {
    if (initialData.createdat) {
      setBook((prev:any) => ({
        ...prev,
        createdat: new Date(initialData.createdat),
      }));
    }
  }, [initialData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({
      ...book,
      createdat: book.createdat.toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

      {/* TITLE */}
      <input
        type="text"
        value={book.title}
        placeholder="Judul Buku"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />

      {/* AUTHOR */}
      <input
        type="text"
        value={book.author}
        placeholder="Penulis"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />

      {/* PUBLISHER */}
      <input
        type="text"
        value={book.publisher}
        placeholder="Penerbit"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, publisher: e.target.value })}
      />

      {/* YEAR */}
      <input
        type="number"
        value={book.year}
        placeholder="Tahun Terbit"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, year: e.target.value })}
      />

      {/* ISBN */}
      <input
        type="text"
        value={book.isbn}
        placeholder="ISBN"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
      />

      {/* CATEGORY */}
      <select
        value={book.category}
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, category: e.target.value })}
      >
        <option value="">Pilih Kategori</option>
        <option value="Fiksi Indonesia">Fiksi Indonesia</option>
        <option value="Filsafat Dunia">Filsafat Dunia</option>
        <option value="Buku Pelajaran">Buku Pelajaran</option>
      </select>

      {/* IMAGE + PREVIEW */}
      <div className="col-span-2 space-y-2">
        <input
          type="text"
          value={book.image}
          placeholder="URL Gambar"
          className="border p-2 rounded w-full"
          onChange={(e) => setBook({ ...book, image: e.target.value })}
        />

        {book.image && (
          <img
            src={book.image}
            alt="Preview Cover"
            className="w-40 h-56 object-cover border rounded shadow"
          />
        )}
      </div>

      {/* DESCRIPTION */}
      <textarea
        value={book.description}
        placeholder="Deskripsi"
        className="border p-2 rounded col-span-2 h-28"
        onChange={(e) => setBook({ ...book, description: e.target.value })}
      />

      {/* PAGES */}
      <input
        type="text"
        value={book.pages}
        placeholder="Jumlah Halaman"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, pages: e.target.value })}
      />

      {/* LANGUAGE */}
      <select
        value={book.language}
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, language: e.target.value })}
      >
        <option value="">Pilih Bahasa</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Inggris">Inggris</option>
      </select>

      {/* STOCK */}
      <input
        type="number"
        value={book.stock}
        placeholder="Stok"
        className="border p-2 rounded"
        onChange={(e) => setBook({ ...book, stock: e.target.value })}
      />

      {/* LOCATION CODE */}
      <input
        type="text"
        value={book.location_code}
        placeholder="Kode Rak Buku"
        className="border p-2 rounded"
        onChange={(e) =>
          setBook({ ...book, location_code: e.target.value })
        }
      />

      {/* CONDITION */}
      <select
        value={book.condition_book}
        className="border p-2 rounded"
        onChange={(e) =>
          setBook({ ...book, condition_book: e.target.value })
        }
      >
        <option value="">Kondisi Buku</option>
        <option value="Baik">Baik</option>
        <option value="Cukup Baik">Cukup Baik</option>
      </select>

      {/* DATE PICKER */}
      <div className="col-span-2">
        <label className="block text-sm mb-1">Tanggal Input</label>
        <DatePicker
          selected={book.createdat}
          onChange={(date: any) =>
            setBook({ ...book, createdat: date })
          }
          dateFormat="yyyy-MM-dd"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* SUBMIT */}
      <button className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Simpan
      </button>
    </form>
  );
}
