import { Setter, createMemo, createSignal } from "solid-js";
import { Query, Header, RequestMethod, Response } from "./types";
import { Body, ResponseType, fetch } from "@tauri-apps/api/http";

export const [url, setUrl] = createSignal<string>("https://httpbin.org/get");
export const [method, setMethod] = createSignal(RequestMethod.GET);
export const [headers, setHeaders] = createSignal<Header[]>([
  { key: "User-Agent", value: "Storm Client" },
]);
export const [queries, setQueries] = createSignal<Query[]>([
  { key: "", value: "" },
]);
export const [body, setBody] = createSignal("");
export const defaultResponse = {
  status: 0,
  headers: {},
  body: new ArrayBuffer(0),
};
export const [response, setResponse] = createSignal<Response>(defaultResponse);
export const [loading, setLoading] = createSignal(false);
export const [error, setError] = createSignal("");
export const realUrl = createMemo(() => {
  const queryString = toQueryString(queries());
  if (queryString.length === 0) return url();
  return url() + "?" + queryString;
});

function toQueryString(queries: Query[]): string {
  const params = new URLSearchParams();
  queries.forEach((query) => {
    query.key.length > 0 && params.append(query.key, query.value);
  });
  return params.toString();
}

export async function doRequest() {
  setLoading(true);
  setError("");
  setResponse(defaultResponse);
  const requestHeaders = headers().reduce((obj, header) => {
    if (header.key) {
      obj[header.key] = header.value;
    }
    return obj;
  }, {} as Record<string, string>);
  console.log(realUrl(), method(), requestHeaders, body());
  try {
    const response = await fetch<number[]>(realUrl(), {
      method: method(),
      headers: requestHeaders,
      body: method() === RequestMethod.GET ? undefined : Body.text(body()),
      responseType: ResponseType.Binary,
    });
    setResponse({
      status: response.status,
      headers: response.headers,
      body: new Uint8Array(response.data).buffer,
    });
  } catch (error) {
    setError((error as any).toString());
  } finally {
    setLoading(false);
  }
}

export function setByValue<T>(setter: Setter<T>) {
  return function ({ target: { value } }: { target: { value: any } }) {
    setter(() => value as T);
  };
}
