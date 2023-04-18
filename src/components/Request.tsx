import { RequestMethod } from "../types";
import "./Window.css";
import {
  headers,
  body,
  setLoading,
  setError,
  url,
  method,
  setResponse,
  setMethod,
  setUrl,
  loading,
  defaultResponse,
} from "../context";
import { RequestHeaderList } from "./RequestHeaderList";
import { RequestBodyInput } from "./RequestBodyInput";

export function Request() {
  const handleSubmit = () => {
    setLoading(true);
    setError("");
    setResponse(defaultResponse);

    console.log(url(), method(), headers(), body());
    fetch(url(), {
      method: method(),
      headers: headers().reduce((obj, header) => {
        if (header.key) {
          obj[header.key] = header.value;
        }
        return obj;
      }, {} as Record<string, string>),
      body: method() === RequestMethod.GET ? null : body(),
    })
      .then(async (response) => {
        setResponse({
          status: response.status,
          headers: response.headers,
          body: await response.text(),
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
