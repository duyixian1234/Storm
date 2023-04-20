import axios from "axios";
import {
  body,
  defaultResponse,
  headers,
  loading,
  method,
  realUrl,
  setError,
  setLoading,
  setMethod,
  setResponse,
  setUrl,
  url,
} from "../../context";
import { RequestMethod } from "../../types";

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
    axios
      .request({
        url: realUrl(),
        method: method(),
        headers: requestHeaders,
        data: method() === RequestMethod.GET ? null : body(),
        responseType: "arraybuffer",
      })
      .then(async (response) => {
        setResponse({
          status: response.status,
          headers: response.headers,
          body: response.data,
        });
      })
      .catch((err) => {
        setError(err);
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
        {loading() ? "Loading..." : "Send"}
      </button>
    </div>
  );
}
