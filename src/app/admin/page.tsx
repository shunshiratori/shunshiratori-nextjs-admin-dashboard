import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>ようこそ。あなたはログインしています。</p>
      <p>
        ここからサイトの管理ができます。例えば、
        <Link href="/admin/posts">投稿一覧</Link>
        を見ることができます。
      </p>
    </div>
  );
}