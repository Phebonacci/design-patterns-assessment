import { User } from "./user";
import { Post } from "./post";

export type UserPosts = User & {
  posts: Array<Post>
}
