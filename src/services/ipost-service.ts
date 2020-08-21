import { Post } from "../models/post";
import { UserPost } from "../models/user-post";

export interface IPostService {
  getPost(id: number): Promise<UserPost>
}
