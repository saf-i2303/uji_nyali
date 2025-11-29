import Image from "next/image";
import Link from "next/link";
import { getConnection } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

export default async function DetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const db = await getConnection();
  const [rows]: any = await db.query("SELECT * FROM books WHERE id = ?", [id]);

  if (!rows.length) {
    return (
      <section className="p-10 text-center">
        <p className="text-red-500 text-lg">Buku tidak ditemukan.</p>
        <Link href="/user" className="inline-block mt-4 text-pink-600 hover:underline">
          ← Kembali
        </Link>
      </section>
    );
  }

  const book = rows[0];
  const { title, author, publisher, year, pages, language, location_code, stock, category, description, image, condition_book } = book;

  return (
    <section className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-pink-700">Detail Buku</h1>
        <Link href="/user" className="text-sm text-gray-600 hover:text-pink-600 transition">
          ← Kembali
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="relative w-full md:w-[300px] h-[420px] rounded-xl overflow-hidden shadow-xl bg-gray-100">
          <Image src={image || "/placeholder.png"} alt={title} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-lg text-gray-600">
            Oleh <span className="text-pink-600">{author}</span>
          </p>
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-md w-fit text-sm">{category}</span>

          <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
            <p><strong>Penerbit:</strong> {publisher}</p>
            <p><strong>Tahun:</strong> {year}</p>
            <p><strong>Halaman:</strong> {pages}</p>
            <p><strong>Bahasa:</strong> {language}</p>
            <p><strong>Lokasi:</strong> {location_code}</p>
            <p><strong>Stok:</strong> {stock}</p>
            <p><strong>Kondisi:</strong> {condition_book || "Tidak tersedia"}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1">Deskripsi</h3>
            <p className="text-gray-700">{description}</p>
          </div>

          {userId ? (
            <Link
  href={`/user/peminjaman?book_id=${book.id}&title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&category=${encodeURIComponent(book.category)}&image=${encodeURIComponent(book.image)}&condition=${encodeURIComponent(condition_book)}&pages=${pages}&language=${encodeURIComponent(language)}&location=${encodeURIComponent(location_code)}&stock=${stock}&user_id=${userId}`}
  className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-md text-center"
>
  Pinjam Buku
</Link>
          ) : (
            <p className="mt-6 text-red-500">Login dulu untuk pinjam buku</p>
          )}
        </div>
      </div>
    </section>
  );
}
