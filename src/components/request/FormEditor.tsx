import { For } from "solid-js";
import { formItems } from "../../vm";
import { FormItemInput } from "./FormItemInput";

export function FormEditor() {
  return (
    <div class="flex flex-col">
      <For each={formItems()}>
        {(formItem, index) =>
          formItem && <FormItemInput formItem={formItem} index={index()} />
        }
      </For>
    </div>
  );
}
