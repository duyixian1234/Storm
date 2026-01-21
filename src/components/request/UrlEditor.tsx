import { useStorm } from "../../vm";
import { Method } from "../../types";
import { History } from "../history/History";

export function UrlEditor() {
  const [state, actions] = useStorm();

  return (
    <div class="flex items-center gap-2 p-4 border-b border-gray-100">
      <select
        class="h-10 px-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        value={state.method}
        onChange={(e) => actions.setMethod(e.target.value as Method)}
      >
        {Object.values(Method).map((method) => (
          <option value={method}>{method}</option>
        ))}
      </select>
      <input
        class="flex-1 min-w-0 h-10 px-3 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        type="text"
        value={state.url}
        onInput={(e) => actions.setUrl(e.target.value)}
        placeholder="Enter URL here..."
      />
      <button
        class={`h-10 px-6 font-semibold rounded-md text-sm transition-all ${
          state.loading
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm active:transform active:scale-95"
        }`}
        onClick={() => actions.doRequest()}
        disabled={state.loading}
      >
        {state.loading ? "Loading..." : "Send"}
      </button>
      <History />
    </div>
  );
}
