export type UserType = {
  id: string;
  name: string;
  displayName: string;
  iconFileId: string;
  bot: boolean;
  state: number;
  updatedAt: string;
};

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

export type MessageType = {
  id: string;
  userId: string;
  channelId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  stamps: string[];
  threadId: string | null;
};

export type SubscriptionType = {
  channelId: string;
  level: number;
};

export type ChannelType = {
  archived: boolean;
  force: boolean;
  parentId: string | null;
  id: string;
  name: string;
  topic: string;
  children: string[];
};
