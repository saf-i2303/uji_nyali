import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const db = await getConnection();
    const [rows]: any = await db.query(
      "SELECT * FROM books WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET /books/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const db = await getConnection();
    const data = await req.json();

    const {
      title,
      author,
      publisher,
      year,
      isbn,
      category,
      description,
      image,
      pages,
      language,
      stock,
      location_code,
      condition_book,   // ⬅️ pakai ini
      createdat,
    } = data;

    const [result] = await db.query(
      `UPDATE books SET
          title = ?, 
          author = ?, 
          publisher = ?, 
          year = ?, 
          isbn = ?, 
          category = ?, 
          description = ?, 
          image = ?, 
          pages = ?, 
          language = ?, 
          stock = ?, 
          location_code = ?, 
          condition_book = ?,   -- ⬅️ sudah disesuaikan
          createdat = ?
        WHERE id = ?`,
      [
        title,
        author,
        publisher,
        year,
        isbn,
        category,
        description,
        image,
        pages,
        language,
        stock,
        location_code,
        condition_book,  // ⬅️ ini penting
        createdat,
        id,
      ]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("PUT /books/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
