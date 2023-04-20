import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export interface RequestHeader {
  key: string;
  value: string;
}

export interface Query {
  key: string;
  value: string;
}
export interface Response {
  status: number;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  body: ArrayBuffer;
}
