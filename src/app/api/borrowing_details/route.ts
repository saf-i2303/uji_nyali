import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

// =======================
// CREATE borrowing_detail
// =======================
export async function POST(req: Request) {
  try {
    const { borrowing_id, book_id, quantity } = await req.json();

    // Validasi
    if (borrowing_id == null || book_id == null) {
      return NextResponse.json(
        { error: "borrowing_id dan book_id wajib diisi" },
        { status: 400 }
      );
    }

    const db = await getConnection();

    const [result]: any = await db.query(
      `INSERT INTO borrowing_details (borrowing_id, book_id, quantity)
       VALUES (?, ?, ?)`,
      [borrowing_id, book_id, quantity ?? 1]
    );

    return NextResponse.json(
      {
        message: "Detail peminjaman berhasil ditambahkan",
        id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST borrowing_details error:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan borrowing_detail" },
      { status: 500 }
    );
  }
}

// =======================
// GET ALL borrowing_details BY user_id
// =======================
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "user_id wajib diisi" },
        { status: 400 }
      );
    }

    const db = await getConnection();

    // Ambil borrowing details untuk user tertentu
    const [rows] = await db.query(
      `SELECT 
         bd.id,
         bd.borrowing_id,
         bd.book_id,
         bd.quantity,
         b.title AS book_title,
         b.author AS book_author,
         b.image AS book_image,
         br.status,
         br.borrow_date,
         br.due_date
       FROM borrowing_details bd
       LEFT JOIN books b ON bd.book_id = b.id
       LEFT JOIN borrowings br ON bd.borrowing_id = br.id
       WHERE br.user_id = ?
       ORDER BY br.borrow_date DESC`,
      [userId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET borrowing_details error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil borrowing_detail" },
      { status: 500 }
    );
  }
}
