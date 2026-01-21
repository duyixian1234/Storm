import { useStorm } from "../../vm";

export function BodyEditor() {
  const [state, actions] = useStorm();

  return (
    <div class="h-full pb-2">
      <textarea
        class="w-full h-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        value={state.body}
        onInput={(e) => actions.setBody(e.target.value)}
        placeholder="Request body (JSON, text, etc.)..."
      />
    </div>
  );
}
