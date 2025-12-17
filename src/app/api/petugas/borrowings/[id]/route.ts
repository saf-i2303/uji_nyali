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

  try {
    await db.query("START TRANSACTION");

    // Ambil data borrowing
    const [[borrowing]]: any = await db.query(
      `SELECT * FROM borrowings WHERE id = ?`,
      [id]
    );

    if (!borrowing) {
      await db.query("ROLLBACK");
      return NextResponse.json({ error: "Borrowing not found" }, { status: 404 });
    }

    // Ambil detail buku
    const [details]: any = await db.query(
      `SELECT * FROM borrowing_details WHERE borrowing_id = ?`,
      [id]
    );

    if (!details.length) {
      await db.query("ROLLBACK");
      return NextResponse.json({ error: "Details not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Cegah approve dua kali
      if (borrowing.status === "disetujui") {
        await db.query("ROLLBACK");
        return NextResponse.json(
          { error: "Sudah disetujui sebelumnya" },
          { status: 400 }
        );
      }

      await db.query(
        `UPDATE borrowings
         SET status='disetujui', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      // Kurangi stock sesuai quantity
      for (const item of details) {
        await db.query(
          `UPDATE books
           SET stock = GREATEST(stock - ?, 0)
           WHERE id = ?`,
          [item.quantity, item.book_id]
        );
      }

      await db.query("COMMIT");
      return NextResponse.json({ message: "Disetujui" });
    }

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


    if (action === "dipinjam") {
      // Tidak boleh dipinjam kalau belum approve
      if (borrowing.status !== "disetujui") {
        await db.query("ROLLBACK");
        return NextResponse.json(
          { error: "Peminjaman hanya dapat diproses setelah disetujui" },
          { status: 400 }
        );
      }

      await db.query(
        `UPDATE borrowings 
         SET status='dipinjam', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      await db.query("COMMIT");
      return NextResponse.json({ message: "Peminjaman diproses" });
    }

    if (action === "return") {
      await db.query("ROLLBACK");
      return NextResponse.json(
        { error: "Gunakan endpoint return/[id] untuk pengembalian" },
        { status: 400 }
      );
    }


    await db.query("ROLLBACK");
    return NextResponse.json({ error: "Aksi tidak valid" }, { status: 400 });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("BORROWINGS PUT ERROR:", err);
    return NextResponse.json(
      { error: "Gagal memproses aksi" },
      { status: 500 }
    );
  }
}
