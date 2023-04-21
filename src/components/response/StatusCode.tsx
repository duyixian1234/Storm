import { response } from "../../vm";

export function StatusCode() {
  return (
    <div class="status-code">
      {response().status > 0 && <p>{response().status}</p>}
    </div>
  );
}
