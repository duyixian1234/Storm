import { useStorm } from "../../vm";

import { Show } from "solid-js";
import { ResponseTabs } from "./ResponseTabs";
import { ResponseBrief } from "./ResponBrief";

export function ResponsePage() {
  const [state] = useStorm();
  return (
    <div class="flex-1 flex flex-col min-w-0 border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
      <Show when={state.error}>
        <div class="p-4 bg-red-50 text-red-600 border-b border-red-100">
          <p class="font-medium">Error: {state.error}</p>
        </div>
      </Show>
      <Show
        when={state.response.status > 0}
        fallback={
          <div class="flex flex-col h-full items-center justify-center text-gray-400 italic">
            No response yet
          </div>
        }
      >
        <div class="flex flex-col h-full">
          <ResponseBrief />
          <ResponseTabs />
        </div>
      </Show>
    </div>
  );
}
