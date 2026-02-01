import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function PostsPage() {
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

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>エラーが発生しました: {error.message}</div>;
  }

  return (
    <div>
      <h1>記事一覧</h1>
      <Link href="/admin/posts/new">新規作成</Link>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            {post.title} / {post.status}{" "}
            <Link href={`/admin/posts/${post.id}/edit`}>編集</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
