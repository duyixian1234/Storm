import { useStorm } from "../../vm";
import { FormItem } from "../../types";

export function FormItemInput(props: { formItem: FormItem; index: number }) {
  const [state, actions] = useStorm();
  const { formItem: formitem, index } = props;

  const handleKeyChange = (e: { target: { value: string } }) => {
    actions.updateFormItem(index, "key", e.target.value);
  };

  const handleValueChange = (e: { target: { value: string } }) => {
    actions.updateFormItem(index, "value", e.target.value);
  };

  const handleDelete = () => {
    actions.removeFormItem(index);
  };

  const handleAddFormItem = () => {
    actions.addFormItem();
  };

  return (
    <div class="flex items-center gap-3 mb-2 p-2 bg-white rounded-md border border-gray-100 transition-all hover:border-gray-200 shadow-sm">
      <input
        class="flex-1 min-w-0 h-9 px-3 bg-gray-50/50 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        type="text"
        value={formitem.key}
        onInput={handleKeyChange}
        placeholder="Field Name"
      />
      <div class="w-px h-6 bg-gray-200" />
      <input
        class="flex-1 min-w-0 h-9 px-3 bg-gray-50/50 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        type="text"
        value={formitem.value}
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
        {index === state.formItems.length - 1 && (
          <button
            class="h-9 px-4 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors shadow-sm"
            onClick={handleAddFormItem}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
