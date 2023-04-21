import { createSignal, Show, For } from "solid-js";
import { history, setSelectedRecord } from "../../vm";
import "./History.css";

const [isOpen, setIsOpen] = createSignal(false);
const [btnElement, setBtnElement] = createSignal<HTMLElement | null>(null);

export function History() {
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen())} ref={setBtnElement}>
        History
      </button>
      <Show when={isOpen()}>
        <div class="history-items" ref={ShowHistory}>
          <For each={history()}>
            {(record) => (
              <div
                class="history-item"
                onClick={() => {
                  setSelectedRecord(record);
                  setIsOpen(false);
                }}
              >
                {record.url}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

function ShowHistory(el: HTMLElement) {
  const rect = btnElement()!.getBoundingClientRect();
  el.style.position = "absolute";
  el.style.top = `${rect.bottom}px`;
  el.style.left = `${rect.left}px`;
  el.style.display = "block";
}
