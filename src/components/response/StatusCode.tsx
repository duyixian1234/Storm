import { response } from "../../vm";

export function StatusCode() {
  return (
    <div class="flex justify-start items-center">
      {response().status > 0 && (
        <span
          class={`px-2 py-0.5 rounded text-sm font-bold ${
            response().status >= 200 && response().status < 300
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {response().status}
        </span>
      )}
    </div>
  );
}
