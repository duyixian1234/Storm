import { createSignal } from "solid-js";
import { BodyEditor } from "./BodyEditor";
import { HeadersEditor } from "./HeadersEditor";
import { UrlEditor } from "./UrlEditor";
import "./request.css";
import { QueriesEditor } from "./QueriesEditor";

type Tab = "headers" | "body" | "queries";

const [selectedTab, setSelectedTab] = createSignal<Tab>("queries");

export function Request() {
  return (
    <div class="request">
      <UrlEditor />
      <RequestTabs />
    </div>
  );
}

function RequestTabs() {
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
        {selectedTab() === "headers" && <HeadersEditor />}
        {selectedTab() === "body" && <BodyEditor />}
      </div>
    </div>
  );
}
