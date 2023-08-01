import { Tweet } from "features/tweet/tweetTypes";
export interface User {
  id: number;
  tweets: Tweet[];
  name: string;
  email: string;
  description: string | null;
  place: string | null;
  website: string | null;
  birthday: string | null;
  headerImage: string | null;
  avatarImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}
