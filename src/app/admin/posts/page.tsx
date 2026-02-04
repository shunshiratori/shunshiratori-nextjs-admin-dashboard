import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import PostList from "./PostList";

export default async function PostsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

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

      <PostList posts={posts ?? []} />
    </div>
  );
}
