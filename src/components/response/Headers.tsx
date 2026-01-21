import { useStorm } from "../../vm";

export function Headers() {
  const [state] = useStorm();
  return (
    <div class="flex flex-col space-y-1 bg-white p-4 rounded-md border border-gray-100 shadow-sm">
      {Array.from(Object.entries(state.response.headers)).map(
        ([key, value]) => (
          <div class="text-sm border-b border-gray-50 pb-1 last:border-0">
            <strong class="text-gray-700 font-semibold">{key}</strong>:{" "}
            <span class="text-gray-600 break-all">
              {typeof value === "string"
                ? value
                : Object.values(value).join(", ")}
            </span>
          </div>
        ),
      )}
    </div>
  );
}
