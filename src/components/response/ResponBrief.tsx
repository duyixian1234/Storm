import { requested, response } from "../../vm";
import "./response.css";

export function ResponseBrief() {
  return (
    <div class="response-breif">
      <p>
        Status: <span>{requested() ? response().status : ""} </span>
        Size:{" "}
        <span>{requested() ? response().body.byteLength + " Bytes" : ""} </span>
        Time: <span>{requested() ? response().time + "ms" : ""} </span>
      </p>
    </div>
  );
}
