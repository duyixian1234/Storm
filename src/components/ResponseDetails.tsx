import { Base64 } from "js-base64";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { response } from "../context";
import "./Window.css";

import { Match, Show, Switch, createEffect } from "solid-js";

export function ResponseDetails() {
  createEffect(() => {
    Prism.highlightAll();
    [response()];
  });
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
        <Switch>
          <Match
            when={response().headers.get("Content-Type")?.includes("json")}
          >
            <pre>
              <code class={"language-json"}>
                {new TextDecoder().decode(response().body)}
              </code>
            </pre>
          </Match>
          <Match
            when={response().headers.get("Content-Type")?.startsWith("image")}
          >
            <img
              src={`data:${response().headers.get(
                "content-type"
              )};base64, ${Base64.fromUint8Array(
                new Uint8Array(response().body as ArrayBuffer)
              )}`}
            />
          </Match>
        </Switch>
      </Show>
    </div>
  );
}
