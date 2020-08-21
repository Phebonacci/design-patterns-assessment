import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { IHttpClient } from "./ihttp-client";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private _axiosClient: AxiosInstance;

  constructor() {
    this._axiosClient = axios.create();
    this._axiosClient.defaults.headers.common = {
      Accept: 'application/json, application/xml, text/play, text/html, *.*',
      'Content-Type': 'application/json',
    };
  }

  get<R>(path: string, params?: { [key: string]: string | number; }): Promise<R> {
    return this._axiosClient.get(path, { params }).then((response) => response.data);
  }
}
