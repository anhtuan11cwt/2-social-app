"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="top-0 z-50 fixed bg-dark-1/80 backdrop-blur border-dark-4 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-4 max-w-7xl h-16">
        <Link className="flex items-center gap-2" href="/">
          <Image alt="logo" height={32} src="/logo.svg" width={32} />
          <span className="font-bold text-lg">Circle</span>
        </Link>

        <div className="flex items-center gap-4">
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
