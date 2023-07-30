import { User } from "features/user/userTypes";
export interface Tweet {
  id: number;
  user: User;
  content: string;
  image: FileList | null;
  createdAt: Date;
  updatedAt: Date;
}
