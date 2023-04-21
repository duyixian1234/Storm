import {
  doRequest,
  loading,
  method,
  setByValue,
  setMethod,
  setUrl,
  url,
} from "../../vm";
import { Method } from "../../types";

export function UrlEditor() {
  return (
    <div class="url-editor">
      <select value={method()} onChange={setByValue(setMethod)}>
        {Object.values(Method).map((method) => (
          <option value={method}>{method}</option>
        ))}
      </select>
      <input type="text" value={url()} onInput={setByValue(setUrl)} />
      <button onClick={doRequest} disabled={loading()}>
        {loading() ? "Loading..." : "Send"}
      </button>
    </div>
  );
}
