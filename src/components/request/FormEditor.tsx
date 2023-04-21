import { For } from "solid-js";
import { formItems } from "../../vm";
import { FormItemInput } from "./FormItemInput";
import "./request.css";

export function FormEditor() {
  return (
    <div class="form-editor">
      <For each={formItems()}>
        {(formItem, index) =>
          formItem && <FormItemInput formItem={formItem} index={index()} />
        }
      </For>
    </div>
  );
}
