import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <header className="bg-white shadow p-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/items" className="text-xl font-bold">
              Auction Browser
            </Link>
          </div>
        </header>

        {/* This is where each page’s content gets injected */}
        <main className="flex-grow max-w-5xl mx-auto p-4">
          {children}
        </main>

        <footer className="text-center p-4 text-sm text-gray-500">
          © 2025 Auction Challenge
        </footer>
      </body>
    </html>
  );
}
