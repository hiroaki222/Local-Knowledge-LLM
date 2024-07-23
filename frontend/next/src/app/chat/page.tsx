import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";

export default async function Chat() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>チャットページ</h1>
      <p>ようこそ、{session.user.id}さん！</p>
      <LogoutButton />
    </div>
  );
}