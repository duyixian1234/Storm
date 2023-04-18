import { Show } from "solid-js";
import "./Window.css";
import { error, response } from "../context";
import { Request } from "./Request";
import { ResponseDetails } from "./ResponseDetails";

export default function Window() {
  return (
    <div class="container">
      <Request />
      <div class="response">
        <Show when={error()}>
          <p>发生错误: {error()}</p>
        </Show>
        <ResponseDetails />
      </div>
    </div>
  );
}
