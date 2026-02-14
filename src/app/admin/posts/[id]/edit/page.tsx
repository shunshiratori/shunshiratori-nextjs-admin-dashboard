"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function EditPostsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Initialize Supabase client here for client components
  const supabase = createClient();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert(`ID: ${id} の投稿が見つかりません。`);
        console.error(`Error fetching post with id: ${id}`, error);
        router.push("/admin/posts");
        return;
      }

      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, router]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id);

    if (error) {
      alert("更新失敗");
      console.error("Error updating post:", error);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">投稿編集</h1>

      <table className="mb-4 text-left">
        <tr>
          <th className="p-2 border">タイトル</th>
          <td className="p-2 border">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th className="p-2 border">内容</th>
          <td className="p-2 border">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </td>
        </tr>
      </table>

      <button
        onClick={handleUpdate}
        className="inline-block p-3 bg-gray-600 rounded"
      >
        更新
      </button>
    </div>
  );
}
