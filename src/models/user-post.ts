import { User } from "./user";
import { Post } from "./post";

export type UserPost = Post & {
  user: User
};
