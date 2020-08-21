import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { TYPES } from './models/types';
import { IHttpClient } from './services/ihttp-client';
import { AxiosHttpClient } from './services/axios-http-client';
import { IUserSevice } from './services/iuser-service';
import { UserService } from './services/user-service';
import { IPostService } from './services/ipost-service';
import { PostService } from './services/post-service';

const appContainer = new Container();
appContainer.bind<IHttpClient>(TYPES.IHttpClient).to(AxiosHttpClient);
appContainer.bind<IUserSevice>(TYPES.IUserService).to(UserService);
appContainer.bind<IPostService>(TYPES.IPostService).to(PostService);

const { lazyInject } = getDecorators(appContainer);

export { lazyInject };
