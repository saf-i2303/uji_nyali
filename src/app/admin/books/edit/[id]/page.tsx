"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Ambil data buku
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/buku/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal mengambil data buku");
        const data = await res.json();
        setBook(data.data ?? data);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data buku");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/buku/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal memperbarui buku");

      alert("Buku berhasil diperbarui!");
      router.push("/admin/books"); // Bisa diganti ke detail jika mau
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan buku");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading data buku...</p>;
  if (!book) return <p className="p-6">Buku tidak ditemukan.</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Buku</h1>
      <BookForm initialData={book} onSubmit={handleSubmit} disabled={submitting} />
    </div>
  );
}
