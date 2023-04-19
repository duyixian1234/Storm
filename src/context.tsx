import { createSignal } from "solid-js";
import { Query, RequestHeader, RequestMethod, Response } from "./types";

export const [url, setUrl] = createSignal<string>("https://httpbin.org/get");
export const [method, setMethod] = createSignal(RequestMethod.GET);
export const [headers, setHeaders] = createSignal<RequestHeader[]>([
  { key: "User-Agent", value: "Storm Client" },
]);
export const [queries, setQueries] = createSignal<Query[]>([
  { key: "", value: "" },
]);
export const [body, setBody] = createSignal("");
export const defaultResponse = {
  status: 200,
  headers: new Headers(),
  body: new ArrayBuffer(0),
};
export const [response, setResponse] = createSignal<Response>(defaultResponse);
export const [loading, setLoading] = createSignal(false);
export const [error, setError] = createSignal("");
