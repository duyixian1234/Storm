import "./Window.css";
import { RequestPage } from "./request/RequestPage";
import { ResponsePage } from "./response/ResponsePage";

export default function Window() {
  return (
    <div class="container">
      <RequestPage />
      <ResponsePage />
    </div>
  );
}
