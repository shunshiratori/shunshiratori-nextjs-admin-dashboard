import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-52 border-r p-4">
        <h2 className="font-bold mb-4">Admin</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admin/posts">記事</Link>
          </li>
          <li>
            <Link href="/admin/news">お知らせ</Link>
          </li>
          <li>
            <Link href="/admin/contact">お問い合わせ</Link>
          </li>
        </ul>
      </aside>

      <main>{children}</main>
    </div>
  );
}
