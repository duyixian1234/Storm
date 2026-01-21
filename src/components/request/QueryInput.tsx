import { queries, setQueries } from "../../vm";
import { Query } from "../../types";

export function QueryInput(props: { query: Query; index: number }) {
  const { query, index } = props;

  const handleKeyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: value, value: query.value });
  };

  const handleValueChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: query.key, value });
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleAddQuery = () => {
    const newQueires = [...queries(), { key: "", value: "" }];
    setQueries(newQueires);
  };

  const onChange = (index: number, query: Query) => {
    const newQueries = [...queries()];
    newQueries[index] = query;
    setQueries(newQueries);
  };

  const onDelete = (index: number) => {
    const newQueires = [...queries()];
    newQueires.splice(index, 1);
    setQueries(newQueires);
  };

  return (
    <div class="flex items-center gap-3 mb-3 p-2 bg-white rounded-md border border-gray-100 shadow-sm transition-all hover:border-gray-200">
      <input
        class="flex-1 h-9 px-3 bg-gray-50/50 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        type="text"
        value={query.key}
        onInput={handleKeyChange}
        placeholder="Key"
      />
      <div class="w-px h-6 bg-gray-200" />
      <input
        class="flex-1 h-9 px-3 bg-gray-50/50 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
        {index == queries().length - 1 && (
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
