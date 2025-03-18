import Image from "next/image";
import { date2str } from "@/lib/date2str";
import { ChannelType, MessageType, UserType } from "@/lib/type";
import Article from "@/components/article";

export default async function Message({
  message,
  user,
  channel
}: {
  message: MessageType;
  user: UserType;
  channel: ChannelType;
}) {
  return (
    <div key={message.id} className="card">
      <div className="d-flex p-2">
        <div className="" style={{ minWidth: "40px" }}>
          <Image
            src={`/api/icons/${user ? user.name : "null"}`}
            alt={""}
            width="40"
            height="40"
          />
        </div>
        <div className="px-2 w-78">
          <strong className="text-white">
            {user ? user.displayName : "null"}
          </strong>
          : {channel.name}{" "}
          <p className="d-inline text-secondary">
            {date2str(new Date(message.createdAt))}
          </p>
          <br />
          <div className="">
            <Article content={message.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
