import { createSignal } from "solid-js";
import { BodyEditor } from "./BodyEditor";
import { HeadersEditor } from "./HeadersEditor";
import { QueriesEditor } from "./QueriesEditor";
import { FormEditor } from "./FormEditor";

type Tab = "headers" | "body" | "queries" | "form";

const [selectedTab, setSelectedTab] = createSignal<Tab>("queries");

export function RequestTabs() {
  return (
    <div class="tabs">
      <div class="tab-indicators">
        <button
          class={selectedTab() === "queries" ? "active" : ""}
          onClick={() => {
            setSelectedTab("queries");
          }}
        >
          Queries
        </button>
        <button
          class={selectedTab() === "form" ? "active" : ""}
          onClick={() => {
            setSelectedTab("form");
          }}
        >
          Form
        </button>
        <button
          class={selectedTab() === "headers" ? "active" : ""}
          onClick={() => {
            setSelectedTab("headers");
          }}
        >
          Headers
        </button>
        <button
          class={selectedTab() === "body" ? "active" : ""}
          onClick={() => setSelectedTab("body")}
        >
          Body
        </button>
      </div>
      <div class="tab">
        {selectedTab() === "queries" && <QueriesEditor />}
        {selectedTab() === "form" && <FormEditor />}
        {selectedTab() === "headers" && <HeadersEditor />}
        {selectedTab() === "body" && <BodyEditor />}
      </div>
    </div>
  );
}
