"use client";

import { Bell, Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navLinks = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/notifications", icon: Bell, label: "Thông báo" },
  { href: "/profile", icon: User, label: "Hồ sơ" },
  { href: "/settings", icon: Settings, label: "Cài đặt" },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="top-24 sticky flex flex-col justify-between py-4 h-[calc(100vh-6rem)]">
      <div className="space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-dark-3 font-semibold text-primary"
                  : "hover:bg-dark-3 text-gray-300"
              }`}
              href={link.href}
              key={link.href}
            >
              <Icon size={20} />
              <span>{link.label}</span>
              {isActive && (
                <div className="bg-primary ml-auto rounded-full w-1.5 h-1.5" />
              )}
            </Link>
          );
        })}
      </div>

      <button
        className="flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 px-4 py-3 rounded-lg text-red-500 transition"
        onClick={() => signOut({ callbackUrl: "/sign-in" })}
        type="button"
      >
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}
