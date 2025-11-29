import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getConnection();

    // -----------------------------
    // 1️⃣ Ambil data peminjaman
    // -----------------------------
    const [borrowings]: any = await db.query(`
      SELECT 
        b.id,
        b.user_id,
        b.status,
        b.borrow_date,
        b.due_date,
        b.return_date,
        b.fine,
        b.confirmation_date,
        u.name AS user_name
      FROM borrowings b
      LEFT JOIN users u ON b.user_id = u.id
      ORDER BY b.borrow_date DESC
    `);

    // -----------------------------
    // 2️⃣ Ambil detail buku
    // -----------------------------
    const [details]: any = await db.query(`
      SELECT 
        bd.borrowing_id,
        bd.book_id,
        bd.quantity,
        books.title,
        books.image,
        books.location_code
      FROM borrowing_details bd
      LEFT JOIN books ON books.id = bd.book_id
    `);

    // -----------------------------
    // 3️⃣ Gabungkan
    // -----------------------------
    const result = borrowings.map((row: any) => {
      const bookList = details
        .filter((d: any) => d.borrowing_id === row.id)
        .map((d: any) => ({
          id: d.book_id,
          title: d.title,
          image: d.image,           
          location_code: d.location_code, 
          quantity: d.quantity,
        }));

      return {
        ...row,
        books: bookList,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch borrowings" },
      { status: 500 }
    );
  }
}
