"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type NotificationSummary = {
  read: boolean;
};

export default function Navbar() {
  const { data: session } = useSession();

  const { data: notifications } = useQuery({
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const res = await axios.get<NotificationSummary[]>("/api/notifications");
      return res.data;
    },
    queryKey: ["notifications"],
  });

  const unreadCount =
    notifications?.filter((notification) => !notification.read).length || 0;

  return (
    <nav className="top-0 z-50 fixed bg-dark-1/80 backdrop-blur border-dark-4 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-4 max-w-7xl h-16">
        <Link className="flex items-center gap-2" href="/">
          <Image alt="logo" height={32} src="/logo.svg" width={32} />
          <span className="font-bold text-lg">Circle</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <Link
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
            href="/notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          {session?.user?.image ? (
            <Image
              alt="avatar"
              className="rounded-full object-cover"
              height={32}
              src={session.user.image}
              width={32}
            />
          ) : (
            <div className="flex justify-center items-center bg-dark-3 rounded-full w-8 h-8">
              <span className="text-sm">?</span>
            </div>
          )}

          <button
            className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm transition"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            type="button"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}
