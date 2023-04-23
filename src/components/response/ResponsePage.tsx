import { error, response } from "../../vm";
import "./response.css";

import { Show } from "solid-js";
import { ResponseTabs } from "./ResponseTabs";
import { ResponseBrief } from "./ResponBrief";

export function ResponsePage() {
  return (
    <div class="response">
      <Show when={error()}>
        <p>Error: {error()}</p>
      </Show>
      <Show when={response()} fallback={<div></div>}>
        <ResponseBrief />
        <ResponseTabs />
      </Show>
    </div>
  );
}
