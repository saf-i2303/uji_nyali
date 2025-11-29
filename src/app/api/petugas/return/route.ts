import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getConnection();

    // -----------------------------
    // Ambil peminjaman yang statusnya "dipinjam"
    // -----------------------------
    const [borrowings]: any = await db.query(`
      SELECT 
        b.id,
        b.user_id,
        b.borrow_date,
        b.due_date,
        b.status,
        u.name AS user_name
      FROM borrowings b
      LEFT JOIN users u ON u.id = b.user_id
      WHERE b.status = 'dipinjam'
      ORDER BY b.borrow_date DESC
    `);

    // Kalau tidak ada data
    if (!borrowings.length) {
      return NextResponse.json([]);
    }

    // -----------------------------
    // Ambil detail buku
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
    // Gabungkan data
    // -----------------------------
    const result = borrowings.map((b: any) => ({
      ...b,
      books: details
        .filter((d: any) => d.borrowing_id === b.id)
        .map((d: any) => ({
          id: d.book_id,
          title: d.title,
          image: d.image,
          location_code: d.location_code,
          quantity: d.quantity,
        })),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("RETURN GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load return list" },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------
// POST → tandai pengembalian & hitung denda otomatis
// -------------------------------------------------------
export async function POST(req: Request) {
  try {
    const { id } = await req.json(); // borrowing_id
    const db = await getConnection();

    // Cek peminjaman
    const [[borrowing]]: any = await db.query(
      `SELECT due_date FROM borrowings WHERE id = ?`,
      [id]
    );

    if (!borrowing) {
      return NextResponse.json(
        { error: "Borrowing not found" },
        { status: 404 }
      );
    }

    const today = new Date();
    const due = new Date(borrowing.due_date);

    // Hitung denda
    let fine = 0;
    if (today > due) {
      const diffTime = today.getTime() - due.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fine = diffDays * 1000; // 1000 per hari
    }

    // Mulai transaksi
    await db.query("START TRANSACTION");

    // Kembalikan stok
    const [details]: any = await db.query(
      `SELECT * FROM borrowing_details WHERE borrowing_id = ?`,
      [id]
    );

    for (const item of details) {
      await db.query(
        `UPDATE books SET stock = stock + ? WHERE id = ?`,
        [item.quantity, item.book_id]
      );
    }

    // Update borrowings
    await db.query(
      `UPDATE borrowings 
       SET status = 'dikembalikan',
           return_date = NOW(),
           fine = ?
       WHERE id = ?`,
      [fine, id]
    );

    await db.query("COMMIT");

    return NextResponse.json({
      message: "Pengembalian berhasil diproses",
      fine,
    });
  } catch (error) {
    console.error("RETURN POST ERROR:", error);

    return NextResponse.json(
      { error: "Failed to process return" },
      { status: 500 }
    );
  }
}
