import { For } from "solid-js";
import { useStorm } from "../../vm";
import { FormItemInput } from "./FormItemInput";

export function FormEditor() {
  const [state] = useStorm();

  return (
    <div class="flex flex-col">
      <For each={state.formItems}>
        {(formItem, index) =>
          formItem && <FormItemInput formItem={formItem} index={index()} />
        }
      </For>
    </div>
  );
}
