"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "./providers/QueryProvider";
import PusherSubscriber from "./shared/PusherSubscriber";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <PusherSubscriber />
        {children}
      </QueryProvider>
    </SessionProvider>
  );
}
