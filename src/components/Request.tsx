import {
  body,
  defaultResponse,
  headers,
  loading,
  method,
  setError,
  setLoading,
  setMethod,
  setResponse,
  setUrl,
  url,
} from "../context";
import { RequestMethod } from "../types";
import { RequestBodyInput } from "./RequestBodyInput";
import { RequestHeaderList } from "./RequestHeaderList";
import "./Window.css";

export function Request() {
  const handleSubmit = () => {
    setLoading(true);
    setError("");
    setResponse(defaultResponse);
    let text: string;
    const requestHeaders = headers().reduce((obj, header) => {
      if (header.key) {
        obj[header.key] = header.value;
      }
      return obj;
    }, {} as Record<string, string>);
    console.log(url(), method(), requestHeaders, body());
    fetch(url(), {
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
    <div class="request">
      <form onSubmit={() => {}}>
        <label>
          <strong>URL:</strong>
          <input
            type="text"
            value={url()}
            onInput={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          <strong>请求方法:</strong>
          <select value={method()} onChange={handleMethodChange}>
            {Object.values(RequestMethod).map((method) => (
              <option value={method}>{method}</option>
            ))}
          </select>
        </label>
        <RequestHeaderList />
        <RequestBodyInput />
        <button onClick={handleSubmit} disabled={loading()}>
          {loading() ? "正在加载..." : "发送请求"}
        </button>
      </form>
    </div>
  );
}
