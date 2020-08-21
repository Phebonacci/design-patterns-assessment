import { injectable, inject } from 'inversify';
import { IUserSevice } from "./iuser-service";
import { IHttpClient } from "./ihttp-client";
import { User } from "../models/user";
import { Post } from "../models/post";
import { UserPosts } from "../models/user-posts";
import { TYPES } from '../models/types';

@injectable()
export class UserService implements IUserSevice {
  private _httpClient: IHttpClient;

  constructor(@inject(TYPES.IHttpClient) httpClient: IHttpClient) {
    this._httpClient = httpClient;
  }

  getUsers(): Promise<User[]> {
    return this._httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  async getUser(id: number): Promise<UserPosts> {
    const user = await this._httpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
    const posts = await this._httpClient.get<Post[]>(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    return { ...user, posts };
  }
}