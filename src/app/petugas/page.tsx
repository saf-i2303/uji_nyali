import type { Metadata } from "next";
import PetugasDashboardPage from "@/app/petugas/dashboard/page";

export const metadata: Metadata = {
  title: "Petugas Dashboard | TailAdmin",
  description: "Dashboard untuk petugas",
};

export default function Ecommerce() {
  return <PetugasDashboardPage />;
}
