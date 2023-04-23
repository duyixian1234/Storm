import { createSignal } from "solid-js";
import { Headers } from "./Headers";
import { Body } from "./Body";

type Tab = "headers" | "body" | "status";

const [selectedTab, setSelectedTab] = createSignal<Tab>("body");

export function ResponseTabs() {
  return (
    <div class="tabs">
      <div class="tab-indicators">
        <button
          class={selectedTab() === "body" ? "active" : ""}
          onClick={() => {
            setSelectedTab("body");
          }}
        >
          Body
        </button>
        <button
          class={selectedTab() === "headers" ? "active" : ""}
          onClick={() => {
            setSelectedTab("headers");
          }}
        >
          Headers
        </button>
      </div>
      <div class="tab">
        {selectedTab() === "body" && <Body />}
        {selectedTab() === "headers" && <Headers />}
      </div>
    </div>
  );
}
