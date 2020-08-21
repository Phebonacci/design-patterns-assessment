import { injectable, inject } from "inversify";

import { IPostService } from "./ipost-service";
import { IHttpClient } from "./ihttp-client";
import { IUserSevice } from "./iuser-service";
import { Post } from "../models/post";
import { UserPost } from "../models/user-post";
import { TYPES } from "../models/types";

@injectable()
export class PostService implements IPostService {
  @inject(TYPES.IHttpClient)
  private _httpClient!: IHttpClient;
  @inject(TYPES.IUserService)
  private _userService!: IUserSevice;

  async getPost(id: number): Promise<UserPost> {
    const post = await this._httpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const user = await this._userService.getUser(post.userId);
    return { ...post, user };
  }
}