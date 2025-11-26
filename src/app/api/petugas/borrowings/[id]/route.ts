import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; 

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  const db = await getConnection();

  const [details]: any = await db.query(
    `SELECT * FROM borrowing_details WHERE borrowing_id = ?`,
    [id]
  );

  if (!details.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // APPROVE
  if (action === "approve") {
    try {
      await db.query("START TRANSACTION");

      await db.query(
        `UPDATE borrowings 
         SET status='disetujui', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      for (const item of details) {
        await db.query(
          `UPDATE books SET stock = GREATEST(stock - ?, 0) WHERE id = ?`,
          [item.quantity, item.book_id]
        );
      }

      await db.query("COMMIT");
      return NextResponse.json({ message: "Disetujui" });
    } catch (err) {
      await db.query("ROLLBACK");
      return NextResponse.json({ error: "Gagal approve" }, { status: 500 });
    }
  }

  // DECLINE
  if (action === "decline") {
    await db.query(
      `UPDATE borrowings 
       SET status='ditolak', confirmation_date=NOW()
       WHERE id = ?`,
      [id]
    );

    return NextResponse.json({ message: "Ditolak" });
  }

  // RETURN
  if (action === "return") {
    try {
      await db.query("START TRANSACTION");

      await db.query(
        `UPDATE borrowings 
         SET status='dikembalikan', confirmation_date=NOW()
         WHERE id = ?`,
        [id]
      );

      for (const item of details) {
        await db.query(
          `UPDATE books SET stock = stock + ? WHERE id = ?`,
          [item.quantity, item.book_id]
        );
      }

      await db.query("COMMIT");
      return NextResponse.json({ message: "Pengembalian diproses" });
    } catch (err) {
      await db.query("ROLLBACK");
      return NextResponse.json({ error: "Gagal proses return" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Aksi tidak valid" }, { status: 400 });
}
