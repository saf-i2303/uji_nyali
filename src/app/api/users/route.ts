import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

//  ambil semua user
export async function GET() {
  try {
    const db = await getConnection();
    const [rows]: any = await db.query(`SELECT * FROM users ORDER BY id DESC`);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

//  tambah user baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, password, role, class: kelas, nipd, nik, admin_id } = body;

    if (!name || !password || !role) {
      return NextResponse.json({ error: "Name, password, role required" }, { status: 400 });
    }

    const db = await getConnection();

    // Insert user baru
    await db.query(
      `
      INSERT INTO users (name, password, role, class, nipd, nik, admin_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [name, password, role, kelas || "", nipd || "", nik || "", admin_id || ""]
    );

    return NextResponse.json({ message: "User berhasil ditambahkan" });
  } catch (err) {
    console.error("POST USERS ERROR:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
