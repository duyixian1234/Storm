import { For } from "solid-js";
import { headers } from "../../vm";
import { HeaderInput } from "./HeaderInput";
import "./request.css";

export function HeadersEditor() {
  return (
    <div class="headers-editor">
      <For each={headers()}>
        {(header, index) =>
          header && <HeaderInput header={header} index={index()} />
        }
      </For>
    </div>
  );
}
