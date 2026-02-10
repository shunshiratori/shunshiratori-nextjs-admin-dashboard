import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

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

      <ul>
        {news?.map((item) => (
          <li key={item.id}>
            {item.title} / {item.content}{" "}
            <Link href={`/admin/news/${item.id}/edit`}>編集</Link>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
