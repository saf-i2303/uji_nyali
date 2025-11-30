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

const navItems: NavItem[] = [
  { name: "Beranda", scrollTo: "hero" },
  { name: "Tentang", scrollTo: "tentang" },
  { name: "Layanan", scrollTo: "layanan" },
  { name: "Blog", scrollTo: "blog" },
];

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  /** Smooth Scroll Handler */
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const offset = 70; // tinggi navbar
    const position =
      window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({ top: position, behavior: "smooth" });
  };

  return (
    <Navbar className="fixed top-0 left-1/2 -translate-x-1/2 w-[90%] z-50 font-sans">

      {/* DESKTOP NAVBAR */}
      <NavBody className="hidden md:flex w-full border-b border-gray-200 shadow-md rounded-xl px-6 py-3 items-center justify-between bg-white">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-[#281A14] tracking-wide select-none">
          Perpusan
        </h1>

        {/* Desktop Menu */}
        <div className="flex gap-6">
          {navItems.map((item) => (
            item.scrollTo ? (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.scrollTo!)}
                className="text-[#281A14] hover:text-[#7C4F39] transition font-medium"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={item.name}
                href={item.link}
                className="text-[#281A14] hover:text-[#7C4F39] transition font-medium"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        {/* Login Button */}
        <NavbarButton
          href="/login"
          className="font-semibold bg-[#281A14] hover:bg-[#7C4F39] text-white px-6 py-2 rounded-lg shadow-md"
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

          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item) =>
            item.scrollTo ? (
              <button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.scrollTo!);
                  setIsOpen(false);
                }}
                className="text-[#281A14] py-2 text-left font-medium hover:text-gray-600"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={item.name}
                href={item.link}
                className="text-[#281A14] py-2 font-medium hover:text-gray-600"
              >
                {item.name}
              </a>
            )
          )}

          {/* Mobile Login Button */}
          <a
            href="/login"
            className="mt-4 px-6 py-2 bg-[#281A14] rounded-lg text-white text-center font-semibold shadow-md"
          >
            Masuk
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
