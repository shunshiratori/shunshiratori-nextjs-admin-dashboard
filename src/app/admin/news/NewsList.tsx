"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type News = {
  id: string;
  title: string;
  content: string;
};

export default function NewsList({ news }: { news: News[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const ok = confirm("削除しますか?");
    if (!ok) return;

    const { error } = await createClient().from("news").delete().eq("id", id);

    if (!error) {
      router.refresh();
    } else {
      alert("削除失敗");
    }
  };

  return (
    <ul className="grid gap-3">
      {news?.map((item) => (
        <li key={item.id}>
          {item.title} / {item.content}{" "}
          <Link
            href={`/admin/news/${item.id}/edit`}
            className="text-blue-500 hover:underline"
          >
            編集
          </Link>
          <button
            onClick={() => handleDelete(item.id)}
            className="ml-2 text-red-500 hover:underline"
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
