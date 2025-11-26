import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

// =======================
// GET /api/borrowings/:id
// =======================
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // <- wajib await
    if (!id) return NextResponse.json({ message: "ID peminjaman wajib diisi" }, { status: 400 });

    const db = await getConnection();

    // Ambil peminjaman + nama konfirmasi
    const [rows]: any = await db.query(
      `SELECT b.*, u.name AS confirmed_by_name
       FROM borrowings b
       LEFT JOIN users u ON b.confirmed_by = u.id
       WHERE b.id = ?`,
      [id]
    );

    if (!rows.length) return NextResponse.json({ message: "Borrowing not found" }, { status: 404 });

    // Ambil detail buku
    const [details]: any = await db.query(
      `SELECT bd.book_id, bd.quantity, bk.title, bk.author, bk.image
       FROM borrowing_details bd
       JOIN books bk ON bd.book_id = bk.id
       WHERE bd.borrowing_id = ?`,
      [id]
    );

    const borrowing = {
      ...rows[0],
      books: details.map((d: any) => ({
        id: d.book_id,
        title: d.title,
        author: d.author,
        image: d.image,
        quantity: d.quantity,
      })),
    };

    return NextResponse.json(borrowing);
  } catch (error) {
    console.error("GET /borrowings/:id error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// =======================
// PUT /api/borrowings/:id
// =======================
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ message: "ID peminjaman wajib diisi" }, { status: 400 });

    const body = await req.json();
    const { due_date, status, confirmed_by } = body;

    const db = await getConnection();

    const [result]: any = await db.query(
      `UPDATE borrowings SET due_date = ?, status = ?, confirmed_by = ?, confirmation_date = NOW() WHERE id = ?`,
      [due_date, status, confirmed_by || null, id]
    );

    if (result.affectedRows === 0)
      return NextResponse.json({ message: "Borrowing not found" }, { status: 404 });

    return NextResponse.json({ message: "Borrowing updated successfully" });
  } catch (error) {
    console.error("PUT /borrowings/:id error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// =======================
// DELETE /api/borrowings/:id
// =======================
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ message: "ID peminjaman wajib diisi" }, { status: 400 });

    const db = await getConnection();

    // Hapus detail peminjaman dulu
    await db.query("DELETE FROM borrowing_details WHERE borrowing_id = ?", [id]);

    // Hapus peminjaman utama
    const [result]: any = await db.query("DELETE FROM borrowings WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return NextResponse.json({ message: "Borrowing not found" }, { status: 404 });

    return NextResponse.json({ message: "Borrowing deleted successfully" });
  } catch (error) {
    console.error("DELETE /borrowings/:id error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
