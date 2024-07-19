import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>チャットページ</h1>
      <p>ようこそ、{session.user?.name}さん！</p>
    </div>
  );
}