"use client";

import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("ID: " + id + " のお知らせが見つかりません。");
        console.error("Error fetching news with id: " + id, error);
        router.push("/admin/news");
        return;
      }

      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    fetchNews();
  }, [id, router]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("news")
      .update({ title, content })
      .eq("id", id);

    if (error) {
      alert("更新失敗");
      console.error("Error updating news:", error);
    } else {
      router.push("/admin/news");
      router.refresh();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>お知らせ編集</h1>
      <div>
        <label>タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>内容:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
}
