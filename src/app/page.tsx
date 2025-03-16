import { get_json } from "@/lib/get";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; //動的にレンダリングする
export const fetchCache = "force-no-store"; // 常に最新のデータを取得する

export default async function Home() {
  const cookieStore = await cookies();
  if (!cookieStore.has("cookie")) {
    redirect("/login");
  }
  const cookie = cookieStore.get("cookie")?.value || "";
  const subscriptions = await get_json(cookie, `/users/me/subscriptions`, "");
  return <div>{`${subscriptions.length} 人のユーザーがいます`}</div>;
}
