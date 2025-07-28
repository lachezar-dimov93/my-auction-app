import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "An Auction House Browsing Interface",
  description:
    "A responsive web app for browsing auction items using Next.js, TypeScript, Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-white shadow w-full">
          <div className="w-full max-w-5xl mx-auto px-4 py-4 flex items-center">
            <Link href="/items" className="text-xl font-bold">
              Auction Browser
            </Link>
          </div>
        </header>

        <main className="w-full max-w-5xl mx-auto px-4 py-4 flex-grow overflow-x-hidden">
          <Suspense fallback={<p className="text-center py-10">Loading…</p>}>
            {children}
          </Suspense>
        </main>

        <footer className="text-center p-4 text-sm text-gray-500">
          © 2025 Auction Challenge
        </footer>
      </body>
    </html>
  );
}
