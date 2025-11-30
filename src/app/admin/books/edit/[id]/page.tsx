"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`/api/buku/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleSubmit = async (data: any) => {
    await fetch(`/api/buku/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/admin/books");
  };

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Buku</h1>
      <BookForm initialData={book} onSubmit={handleSubmit} />
    </div>
  );
}
