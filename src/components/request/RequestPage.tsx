import { UrlEditor } from "./UrlEditor";
import "./request.css";
import { RequestTabs } from "./RequestTabs";

export function RequestPage() {
  return (
    <div class="request">
      <UrlEditor />
      <RequestTabs />
    </div>
  );
}
