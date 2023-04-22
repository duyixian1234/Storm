import { response } from "../../vm";

export function Headers() {
  return (
    <div class="headers">
      {Array.from(Object.entries(response().headers)).map(([key, value]) => (
        <div>
          <strong>{key}</strong>: {value}
        </div>
      ))}
    </div>
  );
}
