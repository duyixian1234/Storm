import { Body, ResponseType, fetch } from "@tauri-apps/api/http";
import { Setter, createMemo, createSignal } from "solid-js";
import {
  FormItem,
  Header,
  Method,
  Query,
  RequestRecord,
  Response,
} from "./types";
import * as storage from "./storage";

storage.init();

export const [url, setUrl] = createSignal<string>("https://httpbin.org/get");
export const [method, setMethod] = createSignal(Method.GET);
export const [headers, setHeaders] = createSignal<Header[]>([
  { key: "User-Agent", value: "Storm Client" },
]);
export const [queries, setQueries] = createSignal<Query[]>([
  { key: "", value: "" },
]);
export const [formItems, setFormItems] = createSignal<FormItem[]>([
  { key: "", value: "" },
]);
export const [body, setBody] = createSignal("");
export const defaultResponse = {
  status: 0,
  headers: {},
  body: new ArrayBuffer(0),
  time: 0,
};
export const [response, setResponse] = createSignal<Response>(defaultResponse);
export const [loading, setLoading] = createSignal(false);
export const [error, setError] = createSignal("");
export const [isForm, setIsForm] = createSignal(false);
export const [history, setHistory] = createSignal<RequestRecord[]>([]);
export const [selectedRecord, setSelectedRecord] =
  createSignal<RequestRecord>();

storage.loadHistory().then(setHistory);

const queryString = createMemo(() => {
  const params = new URLSearchParams();
  queries().forEach((query) => {
    query.key.length > 0 && params.append(query.key, query.value);
  });
  return params.toString();
});

export const realUrl = createMemo(() => {
  if (queryString().length === 0) return url();
  return url() + "?" + queryString();
});

const requestHeaders = createMemo(() =>
  headers().reduce((obj, header) => {
    if (header.key) {
      setIsForm(true);
      obj[header.key] = header.value;
    }
    return obj;
  }, {} as Record<string, string>)
);

const requestForm = createMemo(() =>
  Body.form(
    formItems().reduce((obj, form) => {
      if (form.key) {
        obj[form.key] = form.value;
      }
      return obj;
    }, {} as Record<string, string>)
  )
);

const requestBody = createMemo(() =>
  isForm() ? requestForm() : Body.text(body())
);

export async function doRequest() {
  setLoading(true);
  setError("");
  setResponse(defaultResponse);
  console.log(realUrl(), method(), requestHeaders(), requestForm(), body());
  const record = {
    method: method(),
    url: url(),
    headers: headers(),
    queries: queries(),
    formItems: formItems(),
    body: body(),
    ts: Date.now(),
  };
  await storage.appendRequestRecord(record);
  setHistory((history) => [record, ...history.slice(0, 19)]);
  try {
    const start = Date.now();
    const response = await fetch<number[]>(realUrl(), {
      method: method(),
      headers: requestHeaders(),
      body: method() === Method.GET ? undefined : requestBody(),
      responseType: ResponseType.Binary,
    });
    setResponse({
      status: response.status,
      headers: response.headers,
      body: new Uint8Array(response.data).buffer,
      time: Date.now() - start,
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

createMemo(() => {
  if (!selectedRecord()) return;
  const { method, url, headers, queries, formItems, body } = selectedRecord()!;
  setMethod(method);
  setUrl(url);
  setHeaders(() => headers || []);
  setQueries(() => queries || []);
  setFormItems(() => formItems || []);
  setBody(body || "");
});

export const contentType = createMemo(
  () => response().headers["content-type"]?.toString() || ""
);

export const requested = createMemo(() => response().status > 0);
