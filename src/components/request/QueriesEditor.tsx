import { For } from "solid-js";
import { useStorm } from "../../vm";
import { QueryInput } from "./QueryInput";

export function QueriesEditor() {
  const [state] = useStorm();

  return (
    <div class="flex flex-col">
      <For each={state.queries}>
        {(query, index) =>
          query && <QueryInput query={query} index={index()} />
        }
      </For>
    </div>
  );
}
