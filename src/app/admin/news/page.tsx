import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import NewsList from "./NewsList";

export default async function NewsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1>お知らせ</h1>
      <Link className="" href="/admin/news/new">
        新規作成
      </Link>

      <NewsList news={news ?? []} />
    </div>
  );
}
