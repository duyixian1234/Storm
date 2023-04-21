export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export interface Header {
  key: string;
  value: string;
}

export interface Query {
  key: string;
  value: string;
}
export interface Response {
  status: number;
  headers: Record<string, string>;
  body: ArrayBuffer;
}
