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

      <ul>
        {news?.map((item) => (
          <li key={item.id}>
            <Link href={`/news/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
