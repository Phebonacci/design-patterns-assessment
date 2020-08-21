import { IPostService } from "./ipost-service";

import { injectable, inject } from "inversify";
import { IHttpClient } from "./ihttp-client";
import { IUserSevice } from "./iuser-service";
import { Post } from "../models/post";
import { User } from "../models/user";
import { UserPost } from "../models/user-post";
import { TYPES } from "../models/types";

@injectable()
export class PostService implements IPostService {
  private _httpClient: IHttpClient;
  private _userService: IUserSevice;

  constructor(
    @inject(TYPES.IHttpClient) httpClient: IHttpClient,
    @inject(TYPES.IUserService) userService: IUserSevice
  ) {
    this._httpClient = httpClient;
    this._userService = userService;
  }

  async getPost(id: number): Promise<UserPost> {
    const post = await this._httpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const user = await this._httpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    return { ...user, ...post };
  }
}