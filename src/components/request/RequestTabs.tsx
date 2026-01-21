import { createSignal } from "solid-js";
import { BodyEditor } from "./BodyEditor";
import { HeadersEditor } from "./HeadersEditor";
import { QueriesEditor } from "./QueriesEditor";
import { FormEditor } from "./FormEditor";
import { useStorm } from "../../vm";

type Tab = "headers" | "body" | "queries" | "form";

const [selectedTab, setSelectedTab] = createSignal<Tab>("queries");

export function RequestTabs() {
  const [, actions] = useStorm();
  return (
    <div class="flex-1 flex flex-col mt-2 min-h-0">
      <div class="flex justify-start px-4 space-x-4 border-b border-gray-100">
        <button
          class={`pb-2 px-1 text-sm font-medium transition-colors ${
            selectedTab() === "queries"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("queries");
          }}
        >
          Queries
        </button>
        <button
          class={`pb-2 px-1 text-sm font-medium transition-colors ${
            selectedTab() === "form"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("form");
            actions.setIsForm(true);
          }}
        >
          Form
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
        <button
          class={`pb-2 px-1 text-sm font-medium transition-colors ${
            selectedTab() === "body"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("body");
            actions.setIsForm(false);
          }}
        >
          Body
        </button>
      </div>
      <div class="p-4 flex-1 overflow-auto bg-gray-50/20">
        {selectedTab() === "queries" && <QueriesEditor />}
        {selectedTab() === "form" && <FormEditor />}
        {selectedTab() === "headers" && <HeadersEditor />}
        {selectedTab() === "body" && <BodyEditor />}
      </div>
    </div>
  );
}
