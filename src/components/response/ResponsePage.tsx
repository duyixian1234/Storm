import { error, response } from "../../vm";

import { Show } from "solid-js";
import { ResponseTabs } from "./ResponseTabs";
import { ResponseBrief } from "./ResponBrief";

export function ResponsePage() {
  return (
    <div class="flex flex-col mx-[0.5vw] w-[80vw] lg:w-[48vw] border border-gray-300 rounded-[0.5vw] bg-white shadow-sm overflow-hidden">
      <Show when={error()}>
        <div class="p-4 bg-red-50 text-red-600 border-b border-red-100">
          <p class="font-medium">Error: {error()}</p>
        </div>
      </Show>
      <Show
        when={response()}
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
