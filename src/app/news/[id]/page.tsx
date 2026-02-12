"use client";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchNewsDetail = async () => {
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
        router.push("/news");
        return;
      }

      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    fetchNewsDetail();
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>タイトル : {title}</h1>
      <h2>内容</h2>
      <p>{content}</p>
    </div>
  );
}
