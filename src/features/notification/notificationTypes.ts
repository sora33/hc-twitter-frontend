import { UserBase } from "features/user/userTypes";

export interface Notification {
  id: number;
  actor: UserBase;
  action: "follow" | "favorite" | "comment";
  detail: {
    id: number;
    content: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
