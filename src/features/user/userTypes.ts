import { Tweet } from "features/tweet/tweetTypes";
import { Comment } from "features/comment/commentTypes";
export interface UserBase {
  id: number;
  name: string;
  email: string;
  description: string | null;
  place: string | null;
  website: string | null;
  birthday: string | null;
  headerImage: string | null;
  avatarImage: string | null;
  isFollowing: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface User extends UserBase {
  tweets: Tweet[];
  comments: Comment[];
}
