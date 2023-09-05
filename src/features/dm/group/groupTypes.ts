import { UserBase } from "features/user/userTypes";
import { Message } from "features/dm/message/messageTypes";

export interface Group {
  id: number;
  users: UserBase[];
  lastMessage: Message;
  createdAt: Date;
  updatedAt: Date;
}
