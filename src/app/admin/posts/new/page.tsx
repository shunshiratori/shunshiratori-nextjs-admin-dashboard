"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

export default function NewPostPage() {
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

    const { error } = await supabase.from("posts").insert({
      title,
      content,
      user_id: session.user.id,
    });

    if (error) {
      alert("記事の作成に失敗しました: " + error.message);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  };

  return (
    <div>
      <h1>新規作成</h1>

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

      <button onClick={handleSubmit}>保存</button>
    </div>
  );
}
