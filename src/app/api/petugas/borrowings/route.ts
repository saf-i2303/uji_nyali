import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getConnection();

    // Ambil peminjaman
    const [borrowings]: any = await db.query(`
      SELECT 
        b.id,
        b.user_id,
        b.status,
        b.borrow_date,
        b.due_date,
        b.confirmation_date,
        u.name AS user_name
      FROM borrowings b
      LEFT JOIN users u ON b.user_id = u.id
      ORDER BY b.borrow_date DESC
    `);

    // Ambil detail buku
    const [details]: any = await db.query(`
      SELECT 
        bd.borrowing_id,
        bd.book_id,
        bd.quantity,
        books.title
      FROM borrowing_details bd
      LEFT JOIN books ON books.id = bd.book_id
    `);

    // Gabungkan
    const result = borrowings.map((row: any) => ({
      ...row,
      books: details
        .filter((d: any) => d.borrowing_id === row.id)
        .map((d: any) => ({
          id: d.book_id,
          title: d.title,
          quantity: d.quantity,
        })),
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch borrowings" },
      { status: 500 }
    );
  }
}
