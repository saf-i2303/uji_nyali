"use client";
import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    // akses AOS global dari browser
    // @ts-ignore
    AOS.init({ duration: 800, once: true });
  }, []);

  return null;
}
