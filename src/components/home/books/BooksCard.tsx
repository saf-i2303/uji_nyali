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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((book: BookCardProps) => book.id === id));
  }, [id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    const updatedFavorites = isFavorite
      ? favorites.filter((book: BookCardProps) => book.id !== id)
      : [...favorites, props];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/user/detail-buku/${id}`} className="group block w-full max-w-60">
      <div className="relative w-full aspect-2/3 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <span className="bg-[#281A14] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {category}
          </span>

          <button
            onClick={handleToggleFavorite}
            className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:scale-110 hover:bg-white transition-all duration-200"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={18}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}
            />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">{rating}</span>
          </div>
          <span className="text-xs text-white font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {year}
          </span>
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-bold text-base line-clamp-2 leading-snug text-gray-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1 mt-1">{author}</p>
      </div>
    </Link>
  );
}