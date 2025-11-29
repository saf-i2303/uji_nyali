import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  const db = await getConnection();

  // Ambil detail buku yang dipinjam
  const [details]: any = await db.query(
    `SELECT * FROM borrowing_details WHERE borrowing_id = ?`,
    [id]
  );

  if (!details.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await db.query("START TRANSACTION");

    // 1️⃣ APPROVE — kurangi stok
    if (action === "approve") {
      await db.query(
        `UPDATE borrowings
         SET status='disetujui', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      for (const item of details) {
        await db.query(
          `UPDATE books SET stock = GREATEST(stock - ?, 0)
           WHERE id = ?`,
          [item.quantity, item.book_id]
        );
      }

      await db.query("COMMIT");
      return NextResponse.json({ message: "Disetujui" });
    }

    // 2️⃣ DECLINE
    if (action === "decline") {
      await db.query(
        `UPDATE borrowings
         SET status='ditolak', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      await db.query("COMMIT");
      return NextResponse.json({ message: "Ditolak" });
    }

    // 3️⃣ DIPINJAM — petugas mengirim buku
    if (action === "dipinjam") {
      await db.query(
        `UPDATE borrowings
         SET status='dipinjam', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      await db.query("COMMIT");
      return NextResponse.json({ message: "Peminjaman diproses" });
    }

    // ❌ RETURN DIPINDAHKAN!
    if (action === "return") {
      await db.query("ROLLBACK");
      return NextResponse.json(
        { error: "Gunakan endpoint /api/petugas/return/[id] untuk pengembalian" },
        { status: 400 }
      );
    }

    await db.query("ROLLBACK");
    return NextResponse.json({ error: "Aksi tidak valid" }, { status: 400 });
  } catch (err) {
    await db.query("ROLLBACK");
    console.log("BORROWINGS PUT ERROR:", err);
    return NextResponse.json(
      { error: "Gagal memproses aksi" },
      { status: 500 }
    );
  }
}
