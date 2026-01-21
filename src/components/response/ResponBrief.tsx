import { requested, response } from "../../vm";

export function ResponseBrief() {
  return (
    <div class="text-left px-4 py-3 border-b border-gray-100">
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider flex gap-4">
        <span>
          Status:{" "}
          <span class="text-emerald-500">
            {requested() ? response().status : ""}
          </span>
        </span>
        <span>
          Size:{" "}
          <span class="text-emerald-500">
            {requested() ? response().body.byteLength + " Bytes" : ""}
          </span>
        </span>
        <span>
          Time:{" "}
          <span class="text-emerald-500">
            {requested() ? response().time + "ms" : ""}
          </span>
        </span>
      </p>
    </div>
  );
}
