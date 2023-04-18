import { createSignal } from "solid-js";
import { RequestMethod, RequestHeader, Response } from "./types";

export const [url, setUrl] = createSignal<string>("https://httpbin.org/get");
export const [method, setMethod] = createSignal(RequestMethod.GET);
export const [headers, setHeaders] = createSignal<RequestHeader[]>([
  { key: "", value: "" },
  { key: "", value: "" },
  { key: "", value: "" },
]);
export const [body, setBody] = createSignal("");
export const defaultResponse = {
  status: 200,
  headers: new Headers(),
  body: "",
};
export const [response, setResponse] = createSignal<Response>(defaultResponse);
export const [loading, setLoading] = createSignal(false);
export const [error, setError] = createSignal("");
