"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

export type BookCardProps = {
  id: number;
  title: string;
  author: string;
  image: string;
  category: string;
  year: number;
  rating: number;
};

export default function BookCard(props: BookCardProps) {
  const { id, title, author, image, category, year, rating } = props;

  const [fav, setFav] = useState(false);

  // Cek awal: apakah buku ini sudah favorit
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites = JSON.parse(stored);
      setFav(favorites.some((b: any) => b.id === id));
    }
  }, [id]);

  const toggleFavorite = (e: any) => {
    e.preventDefault();

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (fav) {
      // Remove favorite
      favorites = favorites.filter((b: any) => b.id !== id);
    } else {
      // Add new favorite
      favorites.push(props);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFav(!fav);
  };

  return (
    <Link href={`/user/detail-buku/${id}`} className="w-full max-w-[220px] group block">
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-md cursor-pointer">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute bottom-2 left-2 bg-blue-800/80 text-white text-xs px-3 py-1 rounded-md shadow">
          {category}
        </span>

        {/* HEART ICON */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm p-1.5 rounded-full shadow hover:bg-white transition"
        >
          <Heart
            size={18}
            className={fav ? "fill-red-500 text-red-500" : "text-gray-700"}
          />
        </button>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold text-[15px] line-clamp-2 leading-tight">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{author}</p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">{year}</span>
        </div>
      </div>
    </Link>
  );
}
