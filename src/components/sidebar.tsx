"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  Heart, 
  HelpCircle, 
  History, 
  RefreshCw, 
  Users, 
  Settings 
} from "lucide-react";

// Role type
type Role = "admin" | "guru" | "siswa";

// Nav item type
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  access?: Role[];
};

// ======== MENU LIST ========
const mainMenu: NavItem[] = [
  { 
    name: "Dashboard Admin", 
    icon: <LayoutDashboard size={18} />, 
    path: "/admin", 
    access: ["admin"] 
  },
  { 
    name: "Dashboard petugas", 
    icon: <LayoutDashboard size={18} />, 
    path: "/petugas", 
    access: ["guru"] 
  },
  { 
    name: "Koleksi Buku", 
    icon: <BookOpen size={18} />, 
    path: "/user", 
    access: ["siswa"] 
  },
  { 
    name: "Favorite", 
    icon: <Heart size={18} />, 
    path: "/user/favorite", 
    access: ["siswa"] 
  },
  { 
    name: "Panduan Peminjaman", 
    icon: <HelpCircle size={18} />, 
    path: "/user/panduan", 
    access: ["siswa"] 
  },
  { 
    name: "Manajemen Peminjaman", 
    icon: <Settings size={18} />, 
    path: "/petugas/manajemen-peminjaman", 
    access: ["guru"] 
  },
  { 
    name: "Kelola Buku", 
    icon: <BookOpen size={18} />, 
    path: "/admin/books", 
    access: ["admin"] 
  },
  { 
    name: "Data Pengguna", 
    icon: <Users size={18} />, 
    path: "/admin/users", 
    access: ["admin"] 
  },
  { 
    name: "Pengembalian", 
    icon: <RefreshCw size={18} />, 
    path: "/petugas/pengembalian", 
    access: ["guru"] 
  },
];

const otherMenu: NavItem[] = [
  { 
    name: "Riwayat", 
    icon: <History size={18} />, 
    path: "/user/riwayat-peminjaman", 
    access: ["siswa"] 
  },
 
];

// ======== SIDEBAR COMPONENT ========
export default function AppSidebar({ userRole }: { userRole: Role }) {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const isOpen = isExpanded || isHovered || isMobileOpen;

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  // Check if user should see "Lainnya" section
  const shouldShowOtherMenu = otherMenu.some(item => item.access?.includes(userRole));

  return (
    <aside
      className={`fixed mt-16 lg:mt-0 top-0 left-0 px-5 bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-800 h-screen z-50
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-[260px]" : "w-[90px]"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className={`py-8 flex ${!isOpen ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/" className="flex items-center gap-3">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <Image
                src="/images/picture/logoh.png"
                alt="Logo Icon"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-2xl font-extrabold text-[#281A14] tracking-wide leading-none">
                Perpusan
              </span>
            </div>
          ) : (
            <Image
              src="/images/picture/logoh.png"
              alt="Logo Icon"
              width={50}
              height={50}
              className="object-contain mx-auto"
            />
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <MenuSection
          userRole={userRole}
          title="Menu"
          items={mainMenu}
          isOpen={isOpen}
          isActive={isActive}
        />
        {shouldShowOtherMenu && (
          <MenuSection
            userRole={userRole}
            title="Lainnya"
            items={otherMenu}
            isOpen={isOpen}
            isActive={isActive}
          />
        )}
      </div>
    </aside>
  );
}

// ======== SUB COMPONENT ========
function MenuSection({
  userRole,
  title,
  items,
  isOpen,
  isActive,
}: {
  userRole: Role;
  title: string;
  items: NavItem[];
  isOpen: boolean;
  isActive: (path: string) => boolean;
}) {
  return (
    <nav className="mb-6">
      <h2
        className={`mb-4 text-xs uppercase text-gray-400 flex ${
          !isOpen ? "lg:justify-center" : "justify-start"
        }`}
      >
        {isOpen ? title : "• • •"}
      </h2>

      <ul className="flex flex-col gap-3">
        {items.map((item) =>
          item.access?.includes(userRole) ? (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  !isOpen ? "lg:justify-center" : "justify-start"
                } ${
                  isActive(item.path)
                    ? "bg-[#281A14] text-white shadow-md"
                    : "text-[#281A14] hover:bg-[#281A14]/10"
                }`}
              >
                <span className="shrink-0">
                  {item.icon}
                </span>
                {isOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  );
}