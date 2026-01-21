import { For } from "solid-js";
import { useStorm } from "../../vm";
import { HeaderInput } from "./HeaderInput";

export function HeadersEditor() {
  const [state] = useStorm();

  return (
    <div class="flex flex-col">
      <For each={state.headers}>
        {(header, index) =>
          header && <HeaderInput header={header} index={index()} />
        }
      </For>
    </div>
  );
}
