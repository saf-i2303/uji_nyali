"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/Navbar/resizable-navbar";

type NavItem = {
  name: string;
  scrollTo?: string;
  link?: string;
};

const items: NavItem[] = [
  { name: "Beranda", scrollTo: "hero" },
  { name: "Tentang", scrollTo: "tentang" },
  { name: "Layanan", scrollTo: "layanan" },
  { name: "Blog", scrollTo: "blog" },
];

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll dengan offset navbar
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = 64; // tinggi navbar, sesuaikan
    const top =
      window.pageYOffset +
      el.getBoundingClientRect().top -
      navbarHeight;

    window.scrollTo({
      top,
      behavior: "smooth", // ini sudah smooth natural
    });
  };

  return (
    <Navbar className="fixed top-0 left-1/2 -translate-x-1/2 w-[90%] z-50 font-sans">
      <NavBody className="w-full border-b border-gray-300 shadow-md rounded-xl px-5 py-3 flex items-center justify-between bg-white transition-all duration-300">
        {/* LOGO */}
        <h1 className="text-2xl font-extrabold text-[#281A14] tracking-wide select-none">
          Perpusan
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6">
          {items.map((item, i) =>
            item.scrollTo ? (
              <button
                key={i}
                onClick={() => scrollToSection(item.scrollTo!)}
                className="text-[#281A14] hover:text-[#7C4F39] transition-colors duration-150 font-medium"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={i}
                href={item.link}
                className="text-[#281A14] hover:text-[#7C4F39] transition-colors duration-150 font-medium"
              >
                {item.name}
              </a>
            )
          )}
        </div>

        {/* LOGIN BUTTON */}
        <NavbarButton
          href="/login"
          className="font-semibold bg-[#281A14] hover:bg-[#7C4F39] text-white px-4 py-1"
        >
          Masuk
        </NavbarButton>
      </NavBody>

      {/* MOBILE NAV */}
      <MobileNav>
        <MobileNavHeader>
          <h1 className="text-xl font-extrabold text-[#281A14] tracking-wide">
            Perpusan
          </h1>

          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {items.map((item, i) =>
            item.scrollTo ? (
              <button
                key={i}
                onClick={() => {
                  scrollToSection(item.scrollTo!);
                  setIsOpen(false);
                }}
                className="text-[#281A14] py-2 font-medium text-left hover:text-gray-600 transition-colors"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={i}
                href={item.link}
                className="text-[#281A14] py-2 font-medium hover:text-gray-600 transition-colors"
              >
                {item.name}
              </a>
            )
          )}

          <a
            href="/login"
            className="mt-4 px-4 py-2 bg-[#281A14] rounded-md text-white text-center font-semibold"
          >
            Masuk
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
