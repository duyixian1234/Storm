import { UrlEditor } from "./UrlEditor";
import { RequestTabs } from "./RequestTabs";

export function RequestPage() {
  return (
    <div class="flex flex-col mx-[0.5vw] w-[80vw] lg:w-[48vw] border border-gray-300 rounded-[0.5vw] bg-white shadow-sm overflow-hidden">
      <UrlEditor />
      <RequestTabs />
    </div>
  );
}
