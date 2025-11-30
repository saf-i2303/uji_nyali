"use client";

import { useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";

export default function AddBook() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await fetch("/api/buku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/admin/books");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tambah Buku</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}
