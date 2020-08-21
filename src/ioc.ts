import "reflect-metadata";
import { Container } from 'inversify';
import { TYPES } from './models/types';
import { AxiosHttpClient } from './services/axios-http-client';
import { UserService } from './services/user-service';
import { PostService } from './services/post-service';
import { IHttpClient } from './services/ihttp-client';
import { IPostService } from './services/ipost-service';
import { IUserSevice } from './services/iuser-service';

const appContainer = new Container();
appContainer.bind<IHttpClient>(TYPES.IHttpClient).to(AxiosHttpClient);
appContainer.bind<IPostService>(TYPES.IPostService).to(PostService);
appContainer.bind<IUserSevice>(TYPES.IUserService).to(UserService);

export default appContainer;
