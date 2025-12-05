import Image from "next/image";
import Link from "next/link";
import { getConnection } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Heart, BookOpen, MapPin, Calendar, FileText, Globe, Package, Star } from "lucide-react";

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
        <Link href="/user" className="inline-block mt-4 text-[#281A14] hover:underline">
          ← Kembali
        </Link>
      </section>
    );
  }

  const book = rows[0];
  const { title, author, publisher, year, pages, language, location_code, stock, category, description, image, condition_book } = book;

  // Get recommended books from same category
  const [recRows]: any = await db.query(
    "SELECT id, title, author, category, image FROM books WHERE category = ? AND id != ? LIMIT 4",
    [category, id]
  );

  return (
    <section className="p-6 md:p-10 max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#281A14]">Detail Buku</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
          {/* Book Image */}
          <div className="relative w-full md:w-[320px] h-[460px] rounded-xl overflow-hidden shadow-xl bg-gray-100 flex-shrink-0">
            <Image 
              src={image || "/placeholder.png"} 
              alt={title} 
              fill
              className="object-cover"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col gap-5 flex-1">
            <div>
              <h2 className="text-4xl font-bold text-[#281A14] mb-2">{title}</h2>
              <p className="text-xl text-gray-600">
                Oleh <span className="text-[#281A14] font-semibold">{author}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#281A14] text-white px-4 py-2 rounded-lg text-sm font-medium">
                {category}
              </span>
              <span className="bg-amber-100 text-[#281A14] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {condition_book || "Tidak tersedia"}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-3 text-gray-700">
                <BookOpen className="w-5 h-5 text-[#281A14]" />
                <div>
                  <p className="text-xs text-gray-500">Penerbit</p>
                  <p className="font-semibold text-[#281A14]">{publisher}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-[#281A14]" />
                <div>
                  <p className="text-xs text-gray-500">Tahun</p>
                  <p className="font-semibold text-[#281A14]">{year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <FileText className="w-5 h-5 text-[#281A14]" />
                <div>
                  <p className="text-xs text-gray-500">Halaman</p>
                  <p className="font-semibold text-[#281A14]">{pages}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Globe className="w-5 h-5 text-[#281A14]" />
                <div>
                  <p className="text-xs text-gray-500">Bahasa</p>
                  <p className="font-semibold text-[#281A14]">{language}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-[#281A14]" />
                <div>
                  <p className="text-xs text-gray-500">Lokasi</p>
                  <p className="font-semibold text-[#281A14]">{location_code}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Package className="w-5 h-5 text-[#281A14]" />
                <div>
                  <p className="text-xs text-gray-500">Stok</p>
                  <p className="font-semibold text-[#281A14]">{stock} tersedia</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2">
              <h3 className="text-xl font-bold text-[#281A14] mb-2">Deskripsi</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {userId ? (
                <Link
                  href={`/user/peminjaman?book_id=${book.id}&title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&category=${encodeURIComponent(category)}&image=${encodeURIComponent(image)}&condition=${encodeURIComponent(condition_book || '')}&pages=${pages}&language=${encodeURIComponent(language)}&location=${encodeURIComponent(location_code)}&stock=${stock}&user_id=${userId}`}
                  className="flex-1 bg-[#281A14] hover:bg-[#1a110c] text-white px-8 py-4 rounded-xl shadow-lg text-center font-semibold transition-all hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Pinjam Buku
                </Link>
              ) : (
                <p className="text-[#281A14] bg-red-50 px-6 py-4 rounded-xl text-center font-medium border border-red-200">
                  Login dulu untuk pinjam buku
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Books */}
      {recRows.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#281A14] mb-6">Rekomendasi Buku Lainnya</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {recRows.map((recBook: any) => (
              <Link
                key={recBook.id}
                href={`/user/books/${recBook.id}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={recBook.image || "/placeholder.png"}
                    alt={recBook.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs bg-[#281A14] text-white px-2 py-1 rounded">
                    {recBook.category}
                  </span>
                  <h3 className="font-bold text-[#281A14] mt-2 line-clamp-2 group-hover:text-amber-700 transition">
                    {recBook.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{recBook.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}