import { createSignal } from "solid-js";
import { Headers } from "./Headers";
import { Body } from "./Body";

type Tab = "headers" | "body" | "status";

const [selectedTab, setSelectedTab] = createSignal<Tab>("body");

export function ResponseTabs() {
  return (
    <div class="flex-1 flex flex-col mt-4 min-h-0">
      <div class="flex justify-start px-4 space-x-4 border-b border-gray-100">
        <button
          class={`pb-2 px-1 text-sm font-medium transition-colors ${
            selectedTab() === "body"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("body");
          }}
        >
          Body
        </button>
        <button
          class={`pb-2 px-1 text-sm font-medium transition-colors ${
            selectedTab() === "headers"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("headers");
          }}
        >
          Headers
        </button>
      </div>
      <div class="border border-gray-200 rounded-lg p-4 mx-4 mt-4 mb-4 flex-1 overflow-auto bg-gray-50/30">
        {selectedTab() === "body" && <Body />}
        {selectedTab() === "headers" && <Headers />}
      </div>
    </div>
  );
}
