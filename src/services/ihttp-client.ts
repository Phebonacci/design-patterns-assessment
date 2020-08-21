export interface IHttpClient {
  get<R>(path: string, params?: { [key: string]: number | string}): Promise<R>
}
