import {
  ChannelType,
  MessageType,
  SubscriptionType,
  UserType
} from "@/lib/type";
import { get_json } from "@/lib/get";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Message from "@/components/message";

export const dynamic = "force-dynamic"; //動的にレンダリングする
export const fetchCache = "force-no-store"; // 常に最新のデータを取得する

export default async function Home() {
  const cookieStore = await cookies();
  if (!cookieStore.has("cookie")) {
    redirect("/login");
  }
  const cookie = cookieStore.get("cookie")?.value || "";
  const subscriptions = await get_json(cookie, `/users/me/subscriptions`, "");
  const rawmessages = await Promise.all(
    subscriptions.map((subscription: SubscriptionType) => {
      return get_json(
        cookie,
        `/channels/${subscription.channelId}/messages`,
        "limit=10"
      );
    })
  );
  const messages = rawmessages.flat().sort((a: MessageType, b: MessageType) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const users: UserType[] = await get_json(
    cookie,
    `/users`,
    "include-suspended=false"
  );
  const channels: { public: ChannelType[] } = await get_json(
    cookie,
    `/channels`,
    ""
  );

  return (
    <div>
      <main>
        {messages.map((message: MessageType) => {
          const user = users.filter(user => user.id === message.userId)[0];
          const channel = channels.public.filter(
            channel => channel.id === message.channelId
          )[0];
          return (
            <Message
              key={message.id}
              message={message}
              user={user}
              channel={channel}
            />
          );
        })}
        <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
          <button
            type="button"
            className="btn btn-success btn-lg"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <i className="fa-solid fa-plus"></i>
            <span className="visually-hidden">Add Category</span>
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
