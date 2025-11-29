import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action !== "confirm") {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    const db = await getConnection();

    // Ambil data peminjaman
    const [[borrow]]: any = await db.query(
      `SELECT id, due_date, status FROM borrowings WHERE id = ?`,
      [id]
    );

    if (!borrow) {
      return NextResponse.json(
        { error: "Borrowing not found" },
        { status: 404 }
      );
    }

    if (borrow.status !== "dipinjam") {
      return NextResponse.json(
        { error: "Borrowing is not in 'dipinjam' status" },
        { status: 400 }
      );
    }

    // Ambil detail buku untuk mengembalikan stok
    const [details]: any = await db.query(
      `SELECT book_id, quantity FROM borrowing_details WHERE borrowing_id = ?`,
      [id]
    );

    // Hitung denda
    const dueDate = new Date(borrow.due_date);
    const today = new Date();
    const msPerDay = 1000 * 3600 * 24;

    const diffMs = today.getTime() - dueDate.getTime();
    const diffDays = diffMs > 0 ? Math.ceil(diffMs / msPerDay) : 0;

    const fine = diffDays * 1000; // Rp 1000 per hari

    await db.query("START TRANSACTION");

    // Tambah stok buku
    for (const item of details) {
      await db.query(
        `UPDATE books 
         SET stock = stock + ? 
         WHERE id = ?`,
        [item.quantity, item.book_id]
      );
    }

    // Update status pengembalian
    await db.query(
      `
      UPDATE borrowings 
      SET 
        status = ?,
        return_date = NOW(),
        fine = ?
      WHERE id = ?
    `,
      [diffDays > 0 ? "terlambat" : "dikembalikan", fine, id]
    );

    await db.query("COMMIT");

    return NextResponse.json({
      message: "Pengembalian berhasil dikonfirmasi",
      fine: fine,
      status: diffDays > 0 ? "terlambat" : "dikembalikan",
    });

  } catch (err) {
    console.error("RETURN PUT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update return status" },
      { status: 500 }
    );
  }
}
