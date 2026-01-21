import { fetch } from "@tauri-apps/plugin-http";
import { Setter, createMemo, createSignal, createEffect } from "solid-js";
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
  const separator = url().includes("?") ? "&" : "?";
  return url() + separator + queryString();
});

const requestHeaders = createMemo(() =>
  headers().reduce(
    (obj, header) => {
      if (header.key) {
        obj[header.key] = header.value;
      }
      return obj;
    },
    {} as Record<string, string>,
  ),
);

const requestForm = createMemo(() => {
  const fd = new FormData();
  formItems().forEach((form) => {
    if (form.key) {
      fd.append(form.key, form.value);
    }
  });
  return fd;
});

const requestBody = createMemo(() => (isForm() ? requestForm() : body()));

export async function doRequest() {
  const currentUrl = realUrl();
  if (
    !currentUrl ||
    (!currentUrl.startsWith("http://") && !currentUrl.startsWith("https://"))
  ) {
    setError("Invalid URL: URL must start with http:// or https://");
    return;
  }

  setLoading(true);
  setError("");
  setResponse(defaultResponse);

  const currentMethod = method();
  const currentHeaders = requestHeaders();
  const currentBody = requestBody();

  console.log("Doing request:", currentUrl, currentMethod, currentHeaders);

  const record = {
    method: currentMethod,
    url: url(),
    headers: headers(),
    queries: queries(),
    formItems: formItems(),
    body: body(),
    ts: Date.now(),
  };

  // Dont await history saving to avoid blocking the request
  storage
    .appendRequestRecord(record)
    .then(() => {
      setHistory((history) => [record, ...history.slice(0, 19)]);
    })
    .catch((e) => console.error("Failed to save history", e));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const start = Date.now();
    const fetchResponse = await fetch(currentUrl, {
      method: currentMethod,
      headers: currentHeaders,
      body: currentMethod === Method.GET ? undefined : (currentBody as any),
      signal: controller.signal,
    } as any);

    console.log("Response status:", fetchResponse.status);
    const arrayBuffer = await fetchResponse.arrayBuffer();
    clearTimeout(timeoutId);

    setResponse({
      status: fetchResponse.status,
      headers: Object.fromEntries(fetchResponse.headers?.entries?.() ?? []),
      body: arrayBuffer,
      time: Date.now() - start,
    });
  } catch (err) {
    console.error("Request error:", err);
    if ((err as any).name === "AbortError") {
      setError("Request timed out (30s)");
    } else {
      setError((err as any).toString());
    }
  } finally {
    setLoading(false);
    clearTimeout(timeoutId);
  }
}

export function setByValue<T>(setter: Setter<T>) {
  return function ({ target: { value } }: { target: { value: any } }) {
    setter(() => value as T);
  };
}

createEffect(() => {
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
  () =>
    response()
      .headers["content-type"]?.toString()
      .split(";")[0]
      ?.trim()
      .toLowerCase() || "",
);

export const requested = createMemo(() => response().status > 0);
