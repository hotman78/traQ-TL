import { cookies, headers } from "next/headers";
import Image from "next/image";
import { Login } from "../lib/login";
import { ChannelType, MessageType, SubscriptionType, UserType } from "../lib/type";
import { get_json } from "../lib/get";

export default async function Home() {
  // const host = (await headers()).get("host");
  // const userdata = await GET(cookie,'/users','include-suspended=false');
  // const userDetails = await GET(cookie,`/users/${userdata[0].id}`, '');
  // const messages = await GET(cookie,`/channels/${userDetails.homeChannel}/messages`,'');
  const cookie = await Login('traq','traq');
  const subscriptions = await get_json(cookie,`/users/me/subscriptions`,'');
  const rawmessages = await Promise.all(subscriptions.map((subscription: SubscriptionType) => {
    return get_json(cookie,`/channels/${subscription.channelId}/messages`,'');
  }));
  const messages = rawmessages.flat().sort((a: MessageType,b: MessageType)=>{
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })
  const users: UserType[]= await get_json(cookie,`/users`,'include-suspended=false');
  const channels: {public: ChannelType[]} = await get_json(cookie,`/channels`,'');
  const todayNow = new Date().getTime();
  return (
    <div>
      <main>
        {messages.map((message: MessageType) => {
          const user = users.filter((user)=>user.id === message.userId)[0];
          const channel = channels.public.filter((channel) => channel.id === message.channelId)[0];
          const getDate=(date: Date)=>{
            // 現在からの乖離時間を計算（単位は hours)
            const diff_hours = (todayNow - date.getTime()) / 1000.0 / 3600.0;
            if(diff_hours*60 < 1){
              return "最近"
            }
            if(diff_hours < 1){
              return `${Math.floor(diff_hours*60)}分`
            }
            if(diff_hours < 24){
              return `${Math.floor(diff_hours)}時間`
            }
            return date.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
              day: "2-digit"});
          }
          return (
          <div key={message.id} className="card">
            
            <div className="d-flex p-2">
              <div className="">
                <Image src={`/api/icons/${user.name}`} alt={""} width='40' height='40'/>
              </div>
              <div className="d-inline px-2">
                <strong className="d-inline text-white">{user.name}</strong>: {channel.name} <p className="d-inline text-secondary">{getDate(new Date(message.createdAt))}</p><br/>
                {message.content}
              </div>
            </div>
          </div>
          );
        })}
        <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
          <button type="button" className="btn btn-success btn-lg" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
            <i className="fa-solid fa-plus"></i>
            <span className="visually-hidden">Add Category</span>
          </button>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
