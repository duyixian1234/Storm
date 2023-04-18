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
export interface Response {
  status: number;
  headers: Headers;
  body: string;
}
