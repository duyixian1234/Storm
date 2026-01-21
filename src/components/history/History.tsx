import { createSignal, Show, For } from "solid-js";
import { history, setSelectedRecord } from "../../vm";

const [isOpen, setIsOpen] = createSignal(false);
const [btnElement, setBtnElement] = createSignal<HTMLElement | null>(null);

export function History() {
  return (
    <div class="relative">
      <button
        class="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
        onClick={() => setIsOpen(!isOpen())}
        ref={setBtnElement}
      >
        History
      </button>
      <Show when={isOpen()}>
        <div
          class="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl py-2 w-[30vw] max-h-[50vh] overflow-y-auto mt-1"
          ref={ShowHistory}
        >
          <div class="px-3 py-1 mb-1 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            Recent Requests
          </div>
          <For each={history()}>
            {(record) => (
              <div
                class="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer border-b border-gray-50 last:border-0 whitespace-nowrap overflow-hidden text-ellipsis transition-colors"
                onClick={() => {
                  setSelectedRecord(record);
                  setIsOpen(false);
                }}
              >
                <span class="font-bold text-blue-600 mr-2">
                  {record.method}
                </span>
                {record.url}
              </div>
            )}
          </For>
          {history().length === 0 && (
            <div class="px-4 py-3 text-sm text-gray-400 italic">
              No history yet
            </div>
          )}
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
