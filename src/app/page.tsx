import { headers } from "next/headers";
import Image from "next/image";


export async function Login(name: string, password: string) {
  // const SERVER = 'http://q-dev.trapti.tech';
  const SERVER = 'http://host.docker.internal:3000';
  const res = await fetch(`${SERVER}/api/v3/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      password: password
    }),
    credentials: "include", // 追加
  })
  return res.headers.getSetCookie().toString();
}

// type UserType = {
//   id: string,
//   name: string,
//   displayName: string,
//   iconFileId: string,
//   bot: boolean,
//   state: number,
//   updatedAt: string
// }

export async function GET(cookie: string, path: string, query: string) {
  // const SERVER = 'http://q-dev.trapti.tech';
  const SERVER = 'http://host.docker.internal:3000';
  const res = await fetch(`${SERVER}/api/v3${path}?${query}`,{
    method: "GET",
    headers: new Headers({
      "Cookie": cookie,
    })
  });
  // assert(res.ok, `Failed to fetch ${path}`);
  const data = await res.json()
  return data
}

// type UserDetailsType = {
//   id: string,
//   state: number,
//   bot: boolean,
//   iconFileId: string,
//   displayName: string,
//   name: string,
//   twitterId: string,
//   lastOnline: string,
//   updatedAt: string,
//   tags: string[],
//   groups: string[],
//   bio: string,
//   homeChannel: string
// }
// export async function UserDetails(cookie: string, id: string): Promise<UserDetailsType> {
//   const res = await fetch(`http://host.docker.internal:3000/api/v3/users/${id}`,{
//     method: "GET",
//     headers: new Headers({
//       "Cookie": cookie,
//     })
//   });
//   const data = await res.json()
//   return data
// }

type MessageType = {
  id: string,
  userId: string,
  channelId: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  pinned: boolean,
  stamps: string[],
  threadId: string|null
}
type SubscriptionType = {
  channelId: string,
  level: number
}
// export async function GetMessage(cookie: string, id: string) {
//   const res = await fetch(`http://host.docker.internal:3000/api/v3/channels/${id}/messages`,{
//     method: "GET",
//     headers: new Headers({
//       "Cookie": cookie,
//     })
//   });
//   const data = await res.json()
//   return data
// }

export default async function Home() {
  // const host = (await headers()).get("host");
  const cookie = await Login('traq','traq');
  const userdata = await GET(cookie,'/users','include-suspended=false');
  // const userDetails = await GET(cookie,`/users/${userdata[0].id}`, '');
  // const messages = await GET(cookie,`/channels/${userDetails.homeChannel}/messages`,'');
  const subscriptions = await GET(cookie,`/users/me/subscriptions`,'');
  const rawmessages = await Promise.all(subscriptions.map((subscription: SubscriptionType) => {
    return GET(cookie,`/channels/${subscription.channelId}/messages`,'');
  }));
  const messages = rawmessages.flat().sort((a: MessageType,b: MessageType)=>{
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })
  const users = await GET(cookie,`/users`,'');
  const channels = await GET(cookie,`/channels`,'');
  console.log(userdata[0].id);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {messages.map((message: MessageType) => {
          return (
          <div key={message.id}>
            {users.filter((user)=>user.id === message.userId)[0].name}: {channels.public.filter((channel) => channel.id === message.channelId)[0].name}<br/>
            {message.content}
          </div>
          );
        })}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
