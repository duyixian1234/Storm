import { createMemo } from "solid-js";
import {
  body,
  defaultResponse,
  headers,
  loading,
  method,
  queries,
  setError,
  setLoading,
  setMethod,
  setResponse,
  setUrl,
  url,
} from "../../context";
import { Query, RequestMethod } from "../../types";

const realUrl = createMemo(() => {
  return url() + "?" + toQueryString(queries());
});

export function UrlEditor() {
  const handleSubmit = () => {
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
    fetch(realUrl(), {
      method: method(),
      headers: requestHeaders,
      body: method() === RequestMethod.GET ? null : body(),
    })
      .then(async (response) => {
        setResponse({
          status: response.status,
          headers: response.headers,
          body: await response.arrayBuffer(),
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleMethodChange = (e: any) => {
    setMethod(e.target.value);
  };
  return (
    <div class="url-editor">
      <select value={method()} onChange={handleMethodChange}>
        {Object.values(RequestMethod).map((method) => (
          <option value={method}>{method}</option>
        ))}
      </select>
      <input
        type="text"
        value={url()}
        onInput={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading()}>
        {loading() ? "正在加载..." : "发送请求"}
      </button>
    </div>
  );
}

function toQueryString(queries: Query[]): string {
  const params = new URLSearchParams();
  queries.forEach((query) => {
    params.append(query.key, query.value);
  });
  return params.toString();
}
