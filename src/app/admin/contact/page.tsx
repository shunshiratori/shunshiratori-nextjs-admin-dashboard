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
      <h1 className="text-2xl font-bold mb-4">お問い合わせ一覧</h1>

      <table border={1} className="bg-gray-800">
        <thead>
          <tr>
            <th className="bg-gray-900 p-2">名前</th>
            <th className="bg-gray-900 p-2">メールアドレス</th>
            <th className="bg-gray-900 p-2">内容</th>
            <th className="bg-gray-900 p-2">ステータス</th>
          </tr>
        </thead>

        <tbody>
          {contact?.map((item) => (
            <tr key={item.id}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.email}</td>
              <td className="p-2">{item.message}</td>
              <td className="p-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
