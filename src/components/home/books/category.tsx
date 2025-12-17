"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    onCategoryChange(cat);
    setIsOpen(false);
  };

  return (
    <div className="relative md:-ml-4 lg:-ml-6">
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-gray-200
                   text-gray-700 rounded-lg font-medium hover:border-[#281A14]
                   hover:text-[#281A14] transition-all duration-200 shadow-sm
                   hover:shadow-md min-w-20 justify-between"
      >
        <span className="text-sm">{selectedCategory}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* MENU */}
          <div
            className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200
                       rounded-lg shadow-xl z-20 overflow-hidden animate-fadeIn"
          >
            <div className="max-h-80 overflow-y-auto py-1">
              
              
              <button
                onClick={() => handleCategoryClick("Semua Kategori")}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  selectedCategory === "Semua Kategori"
                    ? "bg-[#281A14] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Semua Kategori
              </button>

              <div className="h-px bg-gray-200 my-1" />

              
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#281A14] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
