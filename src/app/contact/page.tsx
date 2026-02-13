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
    <div>
      <h1>お問い合わせページ</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="内容"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
