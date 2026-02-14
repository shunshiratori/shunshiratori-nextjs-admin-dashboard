import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function NewsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading news: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">News</h1>

      <ul>
        {news?.map((item) => (
          <li key={item.id} className="my-4 border p-4 rounded bg-gray-900">
            <Link href={`/news/${item.id}`} className="">
              <p>{item.title}</p>
              <p>{item.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
