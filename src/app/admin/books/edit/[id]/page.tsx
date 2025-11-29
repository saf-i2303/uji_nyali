"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditBook() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<any>({
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
  });

  /** GET DATA */
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/buku/${id}`);
        const data = await res.json();

        setBook({
          ...data,
          createdat: data.createdat ? new Date(data.createdat) : new Date(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  /** HANDLE UPDATE */
  const updateBook = async (e: any) => {
    e.preventDefault();

    await fetch(`/api/buku/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...book,
        createdat: book.createdat.toISOString().split("T")[0], // simpan format YYYY-MM-DD
      }),
    });

    router.push("/admin/books");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Buku</h1>

      <form onSubmit={updateBook} className="grid grid-cols-2 gap-4">

        {/* INPUT LAIN TETAP SAMA */}
        <input
          type="text"
          value={book.title}
          placeholder="Judul Buku"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />

        <input
          type="text"
          value={book.author}
          placeholder="Penulis"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />

        <input
          type="text"
          value={book.publisher}
          placeholder="Penerbit"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, publisher: e.target.value })}
        />

        <input
          type="number"
          value={book.year}
          placeholder="Tahun Terbit"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, year: e.target.value })}
        />

        <input
          type="text"
          value={book.isbn}
          placeholder="ISBN"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        />

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

        <input
          type="text"
          value={book.pages}
          placeholder="Jumlah Halaman"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, pages: e.target.value })}
        />

        <select
          value={book.language}
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, language: e.target.value })}
        >
          <option value="">Pilih Bahasa</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Inggris">Inggris</option>
        </select>

        <input
          type="number"
          value={book.stock}
          placeholder="Stok"
          className="border p-2 rounded"
          onChange={(e) => setBook({ ...book, stock: e.target.value })}
        />

        <input
          type="text"
          value={book.location_code}
          placeholder="Kode Rak Buku"
          className="border p-2 rounded"
          onChange={(e) =>
            setBook({ ...book, location_code: e.target.value })
          }
        />

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

        {/* DATE PICKER CREATED AT */}
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

        <button className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
