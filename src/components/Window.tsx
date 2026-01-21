import { RequestPage } from "./request/RequestPage";
import { ResponsePage } from "./response/ResponsePage";

export default function Window() {
  return (
    <div class="flex-1 flex flex-col lg:flex-row p-[0.5vh] min-h-screen bg-gray-50 gap-4">
      <RequestPage />
      <ResponsePage />
    </div>
  );
}
