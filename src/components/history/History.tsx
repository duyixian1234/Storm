import { createSignal, Show, For } from "solid-js";
import { useStorm } from "../../vm";

export function History() {
  const [state, actions] = useStorm();
  const [isOpen, setIsOpen] = createSignal(false);
  const [btnElement, setBtnElement] = createSignal<HTMLElement | null>(null);

  const showHistory = (el: HTMLElement) => {
    const rect = btnElement()!.getBoundingClientRect();
    el.style.position = "fixed";
    el.style.top = `${rect.bottom + 5}px`;
    el.style.left = `${rect.left - 200}px`; // Adjust to show better
    el.style.display = "block";
  };

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
          class="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl py-2 w-[400px] max-h-[50vh] overflow-y-auto mt-1"
          ref={(el) => showHistory(el)}
        >
          <div class="px-3 py-1 mb-1 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            Recent Requests
          </div>
          <For each={state.history}>
            {(record) => (
              <div
                class="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer border-b border-gray-50 last:border-0 whitespace-nowrap overflow-hidden text-ellipsis transition-colors"
                onClick={() => {
                  actions.setSelectedRecord(record);
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
          {state.history.length === 0 && (
            <div class="px-4 py-3 text-sm text-gray-400 italic">
              No history yet
            </div>
          )}
        </div>
      </Show>
    </div>
  );
}

// Solid 声明 directive 需要在 global 环境或者通过特定方式，这里我们直接在 ref 里面处理比较稳妥
// 或者是把 showHistory 放在组件内部并使用 ref
