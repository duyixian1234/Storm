import { response } from "../context";
import { createEffect } from "solid-js";
import "./Window.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";

import { Show } from "solid-js";

export function ResponseDetails() {
  createEffect(() => {
    Prism.highlightAll();
  }, [response()]);
  return (
    <div>
      <Show when={response()} fallback={<div></div>}>
        <h4>状态码</h4>
        <p>{response().status}</p>
        <h4>响应头:</h4>
        <ul>
          {Array.from(response().headers).map(([key, value]) => (
            <li>
              <strong>{key}</strong>: {value}
            </li>
          ))}
        </ul>
        <h4>响应体:</h4>
        <pre>
          <code class={"language-json"}>{response().body}</code>
        </pre>
      </Show>
    </div>
  );
}
