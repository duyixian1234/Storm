import { UrlEditor } from "./UrlEditor";
import { RequestTabs } from "./RequestTabs";

export function RequestPage() {
  return (
    <div class="flex-1 flex flex-col min-w-0 border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
      <UrlEditor />
      <RequestTabs />
    </div>
  );
}
