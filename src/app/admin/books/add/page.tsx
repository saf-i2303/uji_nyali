"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/buku", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ⬅️ wajib!
      body: JSON.stringify({ title, author, image }),
    });

    router.push("/admin/books");
  };

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Tambah Buku</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Judul Buku"
          className="border p-2 w-full"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Penulis"
          className="border p-2 w-full"
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL Gambar"
          className="border p-2 w-full"
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Simpan
        </button>
      </form>
    </div>
  );
}
