import { RequestPage } from "./request/RequestPage";
import { ResponsePage } from "./response/ResponsePage";

export default function Window() {
  return (
    <div class="flex flex-col lg:flex-row p-4 h-full bg-gray-50 gap-4 overflow-hidden">
      <RequestPage />
      <ResponsePage />
    </div>
  );
}
