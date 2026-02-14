import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-center p-4 bg-gray-600">
      <div className="flex gap-6">
        <Link href="/">HOME</Link>
        <Link href="/news/">NEWS</Link>
        <Link href="/contact/">CONTACT</Link>
        <Link href="/admin/">LOGIN</Link>
      </div>
    </header>
  );
}
