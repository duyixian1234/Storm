import { body, setBody, setByValue } from "../../vm";

export function BodyEditor() {
  return (
    <div class="h-full pb-2">
      <textarea
        class="w-full h-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        value={body()}
        onInput={setByValue(setBody)}
        placeholder="Request body (JSON, text, etc.)..."
      />
    </div>
  );
}
