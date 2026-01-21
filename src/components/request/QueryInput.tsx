import { useStorm } from "../../vm";
import { Query } from "../../types";

export function QueryInput(props: { query: Query; index: number }) {
  const [state, actions] = useStorm();
  const { query, index } = props;

  const handleKeyChange = (e: { target: { value: string } }) => {
    actions.updateQuery(index, "key", e.target.value);
  };

  const handleValueChange = (e: { target: { value: string } }) => {
    actions.updateQuery(index, "value", e.target.value);
  };

  const handleDelete = () => {
    actions.removeQuery(index);
  };

  const handleAddQuery = () => {
    actions.addQuery();
  };

  return (
    <div class="flex items-center gap-3 mb-3 p-2 bg-white rounded-md border border-gray-100 shadow-sm transition-all hover:border-gray-200">
      <input
        class="flex-1 min-w-0 h-9 px-3 bg-gray-50/50 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        type="text"
        value={query.key}
        onInput={handleKeyChange}
        placeholder="Key"
      />
      <div class="w-px h-6 bg-gray-200" />
      <input
        class="flex-1 min-w-0 h-9 px-3 bg-gray-50/50 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        type="text"
        value={query.value}
        onInput={handleValueChange}
        placeholder="Value"
      />
      <div class="flex gap-2 ml-2">
        <button
          class="h-9 px-3 text-xs font-semibold text-red-500 hover:bg-red-50 rounded transition-colors"
          onClick={handleDelete}
        >
          Del
        </button>
        {index === state.queries.length - 1 && (
          <button
            class="h-9 px-4 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors shadow-sm"
            onClick={handleAddQuery}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
