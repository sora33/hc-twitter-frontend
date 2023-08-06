import { User } from "features/user/userTypes";

export interface Comment {
  id: number;
  tweetId: number;
  user: User;
  content: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
