"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void> | void;
  disabled?: boolean;
}

export default function BookForm({ initialData = {}, onSubmit, disabled = false }: BookFormProps) {
  const initialBook = {
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
    ...initialData,
    createdat: initialData?.createdat
      ? new Date(initialData.createdat)
      : new Date(),
  };

  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      alert("Judul dan Penulis wajib diisi");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        ...book,
        createdat: book.createdat.toISOString().split("T")[0],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 opacity-100">
      {/* TITLE */}
      <input
        type="text"
        name="title"
        value={book.title}
        placeholder="Judul Buku"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
        required
      />

      {/* AUTHOR */}
      <input
        type="text"
        name="author"
        value={book.author}
        placeholder="Penulis"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
        required
      />

      {/* PUBLISHER */}
      <input
        type="text"
        name="publisher"
        value={book.publisher}
        placeholder="Penerbit"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* YEAR */}
      <input
        type="number"
        name="year"
        value={book.year}
        placeholder="Tahun Terbit"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* ISBN */}
      <input
        type="text"
        name="isbn"
        value={book.isbn}
        placeholder="ISBN"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* CATEGORY */}
      <select
        name="category"
        value={book.category}
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">Pilih Kategori</option>
        <option value="Fiksi Indonesia">Fiksi Indonesia</option>
        <option value="Filsafat Dunia">Filsafat Dunia</option>
        <option value="Buku Pelajaran">Buku Pelajaran</option>
      </select>

      {/* IMAGE */}
      <div className="col-span-2 space-y-2">
        <input
          type="text"
          name="image"
          value={book.image}
          placeholder="URL Gambar"
          className="border p-2 rounded w-full"
          onChange={handleChange}
          disabled={disabled}
        />
        {book.image && (
          <img
            src={book.image}
            alt="Preview Cover"
            className={`w-40 h-56 object-cover border rounded shadow`}
          />
        )}
      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={book.description}
        placeholder="Deskripsi"
        className="border p-2 rounded col-span-2 h-28"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* PAGES */}
      <input
        type="text"
        name="pages"
        value={book.pages}
        placeholder="Jumlah Halaman"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* LANGUAGE */}
      <select
        name="language"
        value={book.language}
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">Pilih Bahasa</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Inggris">Inggris</option>
      </select>

      {/* STOCK */}
      <input
        type="number"
        name="stock"
        value={book.stock}
        placeholder="Stok"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* LOCATION CODE */}
      <input
        type="text"
        name="location_code"
        value={book.location_code}
        placeholder="Kode Rak Buku"
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* CONDITION */}
      <select
        name="condition_book"
        value={book.condition_book}
        className="border p-2 rounded"
        onChange={handleChange}
        disabled={disabled}
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
          onChange={(date: any) => setBook({ ...book, createdat: date })}
          dateFormat="yyyy-MM-dd"
          className="border p-2 rounded w-full"
          disabled={disabled}
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading || disabled}
        className={`col-span-2 px-4 py-2 rounded-md text-white ${
          loading || disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
