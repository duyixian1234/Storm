import { createSignal } from "solid-js";
import { Headers } from "./Headers";
import { Body } from "./Body";
import { StatusCode } from "./StatusCode";

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
        <button
          class={selectedTab() === "status" ? "active" : ""}
          onClick={() => {
            setSelectedTab("status");
          }}
        >
          Status
        </button>
      </div>
      <div class="tab">
        {selectedTab() === "body" && <Body />}
        {selectedTab() === "headers" && <Headers />}
        {selectedTab() === "status" && <StatusCode />}
      </div>
    </div>
  );
}
