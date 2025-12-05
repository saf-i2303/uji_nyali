import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function DELETE(req: Request, context: { params: any }) {
  try {
    
    const { id } = await context.params;

    const db = await getConnection();
    const [result]: any = await db.query("DELETE FROM books WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request, context: { params: any }) {
  try {
    const { id } = await context.params;

    const db = await getConnection();
    const [rows]: any = await db.query("SELECT * FROM books WHERE id = ?", [id]);

    if (!rows.length) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: any }) {
  try {
    const { id } = await context.params;
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
      condition_book,
      createdat,
    } = data;

    const [result]: any = await db.query(
      `UPDATE books SET 
        title = ?, author = ?, publisher = ?, year = ?, isbn = ?, category = ?, description = ?, image = ?, pages = ?, language = ?, stock = ?, location_code = ?, condition_book = ?, createdat = ?
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
        condition_book,
        createdat,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
