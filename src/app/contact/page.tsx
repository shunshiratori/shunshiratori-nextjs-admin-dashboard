"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("contact").insert({
      name,
      email,
      message,
    });

    if (!error) {
      alert("お問い合わせありがとうございます。追ってご連絡いたします。");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("送信中にエラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 bg-gray-800 p-4 rounded"
      >
        <input
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-950 p-2 rounded"
        />
        <input
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-950 p-2 rounded"
        />
        <textarea
          placeholder="内容"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-gray-950 p-2 rounded"
        />
        <button type="submit" className="mb-4 bg-gray-950 rounded p-4 ">
          送信
        </button>
      </form>
    </div>
  );
}
