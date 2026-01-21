import { For } from "solid-js";
import { headers } from "../../vm";
import { HeaderInput } from "./HeaderInput";

export function HeadersEditor() {
  return (
    <div class="flex flex-col">
      <For each={headers()}>
        {(header, index) =>
          header && <HeaderInput header={header} index={index()} />
        }
      </For>
    </div>
  );
}
