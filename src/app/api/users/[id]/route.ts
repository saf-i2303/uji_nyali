import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

// GET → Ambil 1 user berdasarkan id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const db = await getConnection();
    const [rows]: any = await db.query(`SELECT * FROM users WHERE id = ? LIMIT 1`, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("GET USER ID ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// PUT → Update data user
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { name, password, role, class: kelas, nipd, nik, admin_id } = body;

    const db = await getConnection();

    await db.query(
      `
      UPDATE users 
      SET name=?, password=?, role=?, class=?, nipd=?, nik=?, admin_id=?
      WHERE id=?
    `,
      [name, password, role, kelas || "", nipd || "", nik || "", admin_id || "", id]
    );

    return NextResponse.json({ message: "User berhasil diperbarui" });
  } catch (err) {
    console.error("PUT USER ERROR:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE → Hapus user
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const db = await getConnection();
    await db.query(`DELETE FROM users WHERE id = ?`, [id]);

    return NextResponse.json({ message: "User berhasil dihapus" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
