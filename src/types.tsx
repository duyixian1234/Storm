export enum Method {
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

export interface FormItem {
  key: string;
  value: string;
}

export interface Response {
  status: number;
  headers: Record<string, string>;
  body: ArrayBuffer;
}

export interface RequestRecord {
  method: Method;
  url: string;
  headers?: Header[];
  queries?: Query[];
  formItems?: FormItem[];
  body?: string;
  ts: number;
}
