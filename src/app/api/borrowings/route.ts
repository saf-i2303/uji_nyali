import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json(
      { error: "user_id wajib diisi" },
      { status: 400 }
    );
  }

  try {
    const db = await getConnection();

    // 1️⃣ AUTO UPDATE STATUS TERLAMBAT
    await db.query(
      `
      UPDATE borrowings
      SET status = 'terlambat'
      WHERE user_id = ?
      AND status = 'dipinjam'
      AND due_date < CURDATE()
    `,
      [userId]
    );

    // 2️⃣ AMBIL DATA SETELAH UPDATE
    const [rows]: any = await db.query(
      `
      SELECT 
        b.id AS borrowing_id,
        b.borrow_date,
        b.due_date,
        b.status,
        bd.book_id,
        bd.quantity,
        bk.title AS book_title,
        bk.author AS book_author,
        bk.image AS book_image
      FROM borrowings b
      JOIN borrowing_details bd ON bd.borrowing_id = b.id
      JOIN books bk ON bd.book_id = bk.id
      WHERE b.user_id = ?
      ORDER BY b.borrow_date DESC
    `,
      [userId]
    );

    // 3️⃣ GROUPING PER PEMINJAMAN
    const borrowingsMap: Record<number, any> = {};

    rows.forEach((row: any) => {
      if (!borrowingsMap[row.borrowing_id]) {
        borrowingsMap[row.borrowing_id] = {
          id: row.borrowing_id,
          borrow_date: row.borrow_date,
          due_date: row.due_date,
          status: row.status,
          books: [],
        };
      }

      borrowingsMap[row.borrowing_id].books.push({
        id: row.book_id,
        title: row.book_title,
        author: row.book_author,
        image: row.book_image,
        quantity: row.quantity,
      });
    });

    return NextResponse.json(Object.values(borrowingsMap));
  } catch (err) {
    console.error("GET /borrowings error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const db = await getConnection();
    const { user_id, due_date } = await req.json();

    if (!user_id || !due_date) {
      return NextResponse.json(
        { message: "user_id dan due_date wajib diisi" },
        { status: 400 }
      );
    }

    // tanggal pinjam otomatis hari ini 
    const borrow_date = new Date().toISOString().slice(0, 10);

    const [result]: any = await db.execute(
      `
      INSERT INTO borrowings (user_id, borrow_date, due_date, status)
      VALUES (?, ?, ?, ?)
    `,
      [user_id, borrow_date, due_date, "menunggu konfirmasi"]
    );

    return NextResponse.json({
      message: "Borrowing created successfully",
      borrowing_id: result.insertId,
    });
  } catch (error) {
    console.error("POST /borrowings error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
