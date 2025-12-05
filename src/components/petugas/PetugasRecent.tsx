"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";

interface Borrowing {
  id: number;
  user_name: string;
  book_title: string;
  status: string;
}

export default function PetugasRecent() {
  const [recent, setRecent] = useState<Borrowing[]>([]);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch("/api/petugas/borrowings"); // endpoint peminjaman terbaru
        const data = await res.json();

        // Ambil 10 terakhir dan map ke format tabel
        const mapped: Borrowing[] = data
          .slice(0, 10)
          .map((b: any) => ({
            id: b.id,
            user_name: b.user_name,
            book_title: b.books.map((bk: any) => bk.title).join(", "),
            status: b.status,
          }));

        setRecent(mapped);
      } catch (err) {
        console.error("Failed to fetch recent borrowings:", err);
      }
    }

    fetchRecent();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dipinjam": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "dikembalikan": return "text-blue-600";
      case "terlambat": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Peminjaman Terbaru</h2>

      <Table className="min-w-full">
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow className="border-b bg-gray-50 text-left">
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Nama Siswa
            </TableCell>
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Buku
            </TableCell>
            <TableCell isHeader className="p-3 font-semibold text-gray-700">
              Status
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {recent.length === 0 ? (
            <TableRow>
              <TableCell className="p-3 text-center" colSpan={3}>
                Tidak ada data peminjaman terbaru
              </TableCell>
            </TableRow>
          ) : (
            recent.map((row) => (
              <TableRow key={row.id} className="border-b hover:bg-gray-50">
                <TableCell className="p-3">{row.user_name}</TableCell>
                <TableCell className="p-3">{row.book_title}</TableCell>
                <TableCell className={`p-3 font-medium ${getStatusColor(row.status)}`}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
