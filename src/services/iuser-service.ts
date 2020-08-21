import { User } from "../models/user";
import { UserPosts } from "../models/user-posts";

export interface IUserSevice {
  getUsers(): Promise<Array<User>>
  getUser(id: number): Promise<UserPosts>
}
