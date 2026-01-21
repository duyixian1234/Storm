import { For } from "solid-js";
import { queries } from "../../vm";
import { QueryInput } from "./QueryInput";

export function QueriesEditor() {
  return (
    <div class="flex flex-col">
      <For each={queries()}>
        {(query, index) =>
          query && <QueryInput query={query} index={index()} />
        }
      </For>
    </div>
  );
}
