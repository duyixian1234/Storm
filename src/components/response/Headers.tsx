import { response } from "../../context";

export function Headers() {
  return (
    <div class="headers">
      {Array.from(response().headers).map(([key, value]) => (
        <div>
          <strong>{key}</strong>: {value}
        </div>
      ))}
    </div>
  );
}
