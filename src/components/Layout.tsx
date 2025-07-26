import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/items">
            <a className="text-xl font-bold">Auction House Browser</a>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">{children}</main>
      <footer className="text-center p-4 text-sm text-gray-500">
        © 2025 Auction House Challenge
      </footer>
    </div>
  );
}