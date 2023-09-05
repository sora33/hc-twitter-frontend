import { UserBase } from "features/user/userTypes";

export interface Message {
  id: number;
  user: UserBase;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
