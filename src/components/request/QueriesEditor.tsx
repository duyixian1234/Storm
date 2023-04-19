import { For } from "solid-js";
import { queries } from "../../context";
import "./request.css";
import { QueryInput } from "./QueryInput";

export function QueriesEditor() {
  return (
    <div class="queries-editor">
      <For each={queries()}>
        {(query, index) =>
          query && <QueryInput query={query} index={index()} />
        }
      </For>
    </div>
  );
}
