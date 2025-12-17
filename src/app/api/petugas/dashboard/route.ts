import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getConnection();

    // Total buku
    const [books]: any = await db.query(`SELECT id, stock FROM books`);
    const totalBooks = books.length;
    const totalStock = books.reduce((acc: number, item: any) => acc + item.stock, 0);

    // Peminjaman aktif
    const [borrowings]: any = await db.query(`SELECT id FROM borrowings WHERE status = 'dipinjam'`);
    const activeBorrow = borrowings.length;

    // Pengembalian hari ini
    const [returnsData]: any = await db.query(`SELECT return_date FROM borrowings WHERE status IN ('dikembalikan','terlambat')`);
    const today = new Date();
    const returnToday = returnsData.filter((r: any) => {
      const date = new Date(r.return_date);
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
    }).length;

    // Total user
    const [users]: any = await db.query(`SELECT id FROM users`);
    const totalUsers = users.length;

    
    // Data bulanan untuk chart
   
    //  Peminjaman per bulan
    const [borrowingsPerMonth]: any = await db.query(`
      SELECT MONTH(borrow_date) AS month, COUNT(*) AS total
      FROM borrowings
      WHERE YEAR(borrow_date) = YEAR(CURDATE())
      GROUP BY MONTH(borrow_date)
    `);

    // Pengembalian per bulan
    const [returnsPerMonth]: any = await db.query(`
      SELECT MONTH(return_date) AS month, COUNT(*) AS total
      FROM borrowings
      WHERE YEAR(return_date) = YEAR(CURDATE()) AND status IN ('dikembalikan','terlambat')
      GROUP BY MONTH(return_date)
    `);

    return NextResponse.json({
      totalBooks,
      totalStock,
      activeBorrow,
      returnToday,
      totalUsers,
      borrowingsPerMonth,
      returnsPerMonth
    });

  } catch (err) {
    console.error("DASHBOARD GET ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
