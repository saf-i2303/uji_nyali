"use client";

import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import AosInit from "@/components/AosInit";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* CSS AOS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@next/dist/aos.css"
        />
      </head>

      <body className={`${outfit.className} dark:bg-gray-900`}>

        {/* JS AOS */}
        <Script
          src="https://unpkg.com/aos@next/dist/aos.js"
          strategy="beforeInteractive"
        />

        {/* INIT AOS */}
        <AosInit />

        <SessionProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
        
      </body>
    </html>
  );
}
