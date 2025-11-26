import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  const db = await getConnection();

  const [results] = await db.query(`SELECT * FROM books`);

  return NextResponse.json({ data: results });
}

export async function POST(req: Request) {
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
    condition_book,   // ⬅️ sudah benar
    createdat,
  } = data;

  const db = await getConnection();

  await db.execute(
    `INSERT INTO books (
        title, author, publisher, year, isbn, category, 
        description, image, pages, language, stock, 
        location_code, condition_book, createdat
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      condition_book,  // ⬅️ ini juga
      createdat,
    ]
  );

  return NextResponse.json({ message: "Book added successfully" });
}
