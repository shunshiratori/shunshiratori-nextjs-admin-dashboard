"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: {
        schema: "public",
      },
    },
  );

  const handleSubmit = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      alert("認証エラー。再度ログインしてください。");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("news").insert({
      title,
      content,
      user_id: session.user.id,
    });

    if (error) {
      alert("お知らせの作成に失敗しました: " + error.message);
    } else {
      router.push("/admin/news");
      router.refresh();
    }
  };

  return (
    <div>
      <h1>新規お知らせ作成</h1>

      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>作成</button>
    </div>
  );
}
