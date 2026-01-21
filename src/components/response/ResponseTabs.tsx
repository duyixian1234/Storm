import { createSignal } from "solid-js";
import { Headers } from "./Headers";
import { Body } from "./Body";

type Tab = "headers" | "body" | "status";

const [selectedTab, setSelectedTab] = createSignal<Tab>("body");

export function ResponseTabs() {
  return (
    <div class="flex flex-col mt-[1vw]">
      <div class="flex justify-start ml-[1.5vw] space-x-4 border-b border-gray-100">
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
      <div class="border border-gray-200 rounded-lg p-3 ml-[1.5vw] mr-[1.5vw] mt-3 mb-3 h-[80vh] overflow-auto bg-gray-50/30">
        {selectedTab() === "body" && <Body />}
        {selectedTab() === "headers" && <Headers />}
      </div>
    </div>
  );
}
