import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description: "Circle - Ứng dụng Mạng xã hội",
  title: "Circle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} h-full antialiased`} lang="en">
      <body className="bg-dark-1 h-full text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
