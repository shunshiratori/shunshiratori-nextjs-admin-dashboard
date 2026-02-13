import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: contact, error } = await supabase
    .from("contact")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>エラーが発生しました: {error.message}</div>;
  }

  return (
    <div>
      <h1>お問い合わせ一覧</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>名前</th>
            <th>メールアドレス</th>
            <th>内容</th>
            <th>ステータス</th>
          </tr>
        </thead>

        <tbody>
          {contact?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
