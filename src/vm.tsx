import { fetch } from "@tauri-apps/plugin-http";
import {
  createMemo,
  createSignal,
  createEffect,
  createContext,
  useContext,
  JSX,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
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

export interface StormState {
  url: string;
  method: Method;
  headers: Header[];
  queries: Query[];
  formItems: FormItem[];
  body: string;
  response: Response;
  loading: boolean;
  error: string;
  isForm: boolean;
  history: RequestRecord[];
  selectedRecord?: RequestRecord;
}

export const defaultResponse: Response = {
  status: 0,
  headers: {},
  body: new ArrayBuffer(0),
  time: 0,
};

const initialState: StormState = {
  url: "https://httpbin.org/get",
  method: Method.GET,
  headers: [{ key: "User-Agent", value: "Storm Client" }],
  queries: [{ key: "", value: "" }],
  formItems: [{ key: "", value: "" }],
  body: "",
  response: defaultResponse,
  loading: false,
  error: "",
  isForm: false,
  history: [],
};

export interface StormActions {
  setUrl: (url: string) => void;
  setMethod: (method: Method) => void;
  setHeaders: (headers: Header[]) => void;
  updateHeader: (index: number, key: keyof Header, value: string) => void;
  addHeader: () => void;
  removeHeader: (index: number) => void;
  setQueries: (queries: Query[]) => void;
  updateQuery: (index: number, key: keyof Query, value: string) => void;
  addQuery: () => void;
  removeQuery: (index: number) => void;
  setFormItems: (items: FormItem[]) => void;
  updateFormItem: (index: number, key: keyof FormItem, value: string) => void;
  addFormItem: () => void;
  removeFormItem: (index: number) => void;
  setBody: (body: string) => void;
  setIsForm: (isForm: boolean) => void;
  setSelectedRecord: (record: RequestRecord) => void;
  doRequest: () => Promise<void>;
}

const StormContext = createContext<[StormState, StormActions]>();

export function StormProvider(props: { children: JSX.Element }) {
  const [state, setState] = createStore<StormState>(initialState);

  storage.loadHistory().then((h) => setState("history", h));

  const queryString = createMemo(() => {
    const params = new URLSearchParams();
    state.queries.forEach((query) => {
      query.key.length > 0 && params.append(query.key, query.value);
    });
    return params.toString();
  });

  const realUrl = createMemo(() => {
    if (queryString().length === 0) return state.url;
    const separator = state.url.includes("?") ? "&" : "?";
    return state.url + separator + queryString();
  });

  const requestHeaders = createMemo(() =>
    state.headers.reduce(
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
    state.formItems.forEach((form) => {
      if (form.key) {
        fd.append(form.key, form.value);
      }
    });
    return fd;
  });

  const requestBody = createMemo(() =>
    state.isForm ? requestForm() : state.body,
  );

  const actions: StormActions = {
    setUrl: (url) => setState("url", url),
    setMethod: (method) => setState("method", method),
    setHeaders: (headers) => setState("headers", headers),
    updateHeader: (index, key, value) => setState("headers", index, key, value),
    addHeader: () => setState("headers", (h) => [...h, { key: "", value: "" }]),
    removeHeader: (index) =>
      setState("headers", (h) => h.filter((_, i) => i !== index)),
    setQueries: (queries) => setState("queries", queries),
    updateQuery: (index, key, value) => setState("queries", index, key, value),
    addQuery: () => setState("queries", (q) => [...q, { key: "", value: "" }]),
    removeQuery: (index) =>
      setState("queries", (q) => q.filter((_, i) => i !== index)),
    setFormItems: (items) => setState("formItems", items),
    updateFormItem: (index, key, value) =>
      setState("formItems", index, key, value),
    addFormItem: () =>
      setState("formItems", (f) => [...f, { key: "", value: "" }]),
    removeFormItem: (index) =>
      setState("formItems", (f) => f.filter((_, i) => i !== index)),
    setBody: (body) => setState("body", body),
    setIsForm: (isForm) => setState("isForm", isForm),
    setSelectedRecord: (record) => setState("selectedRecord", record),
    doRequest: async () => {
      const currentUrl = realUrl();
      if (
        !currentUrl ||
        (!currentUrl.startsWith("http://") &&
          !currentUrl.startsWith("https://"))
      ) {
        setState(
          "error",
          "Invalid URL: URL must start with http:// or https://",
        );
        return;
      }

      setState("loading", true);
      setState("error", "");
      setState("response", defaultResponse);

      const record = {
        method: state.method,
        url: state.url,
        headers: [...state.headers],
        queries: [...state.queries],
        formItems: [...state.formItems],
        body: state.body,
        ts: Date.now(),
      };

      storage
        .appendRequestRecord(record)
        .then(() => {
          setState("history", (h) => [record, ...h.slice(0, 19)]);
        })
        .catch((e) => console.error("Failed to save history", e));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      try {
        const start = Date.now();
        const fetchResponse = await fetch(currentUrl, {
          method: state.method,
          headers: requestHeaders(),
          body:
            state.method === Method.GET ? undefined : (requestBody() as any),
          signal: controller.signal,
        } as any);

        const arrayBuffer = await fetchResponse.arrayBuffer();
        clearTimeout(timeoutId);

        setState("response", {
          status: fetchResponse.status,
          headers: Object.fromEntries(fetchResponse.headers?.entries?.() ?? []),
          body: arrayBuffer,
          time: Date.now() - start,
        });
      } catch (err) {
        if ((err as any).name === "AbortError") {
          setState("error", "Request timed out (30s)");
        } else {
          setState("error", (err as any).toString());
        }
      } finally {
        setState("loading", false);
        clearTimeout(timeoutId);
      }
    },
  };

  createEffect(() => {
    const record = state.selectedRecord;
    if (!record) return;
    setState({
      method: record.method,
      url: record.url,
      headers: record.headers || [],
      queries: record.queries || [],
      formItems: record.formItems || [],
      body: record.body || "",
    });
  });

  return (
    <StormContext.Provider value={[state, actions]}>
      {props.children}
    </StormContext.Provider>
  );
}

export function useStorm() {
  const context = useContext(StormContext);
  if (!context) {
    throw new Error("useStorm must be used within a StormProvider");
  }
  return context;
}

// 保持派生状态的导出（为了兼容性，稍后重构）
export const contentType = (res: Response) =>
  res.headers["content-type"]?.toString().split(";")[0]?.trim().toLowerCase() ||
  "";

export const requested = (res: Response) => res.status > 0;
