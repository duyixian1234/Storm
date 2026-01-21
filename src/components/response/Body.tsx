import { Base64 } from "js-base64";
import { contentType, useStorm } from "../../vm";
import { Match, Switch, createMemo } from "solid-js";
import { copyToClipboard } from "../../utils/clipboard";

const textTypes = new Set([
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  "application/json",
  "application/xml",
]);

const imageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/svg+xml",
]);

const audioTypes = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/m4a",
]);

const videoTypes = new Set(["video/mp4", "video/mpeg", "video/ogg"]);

const binaryTypes = new Set([
  "application/octet-stream",
  "application/pdf",
  "application/zip",
]);

export function Body() {
  const [state] = useStorm();
  const currentContentType = createMemo(() => contentType(state.response));

  return (
    <div>
      <Switch>
        <Match
          when={
            textTypes.has(currentContentType()) ||
            currentContentType().includes("json") ||
            currentContentType().includes("xml") ||
            currentContentType().startsWith("text/")
          }
        >
          <div class="flex flex-col items-start">
            <button
              class="w-fit px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm transition-colors mb-2"
              onClick={() => {
                copyToClipboard(new TextDecoder().decode(state.response.body));
              }}
            >
              Copy To Clipboard
            </button>
            <pre class="w-full bg-[#faebd7] text-left whitespace-pre-wrap break-words p-3 rounded border border-[#e6d8c4]">
              <code>{new TextDecoder().decode(state.response.body)}</code>
            </pre>
          </div>
        </Match>
        <Match when={imageTypes.has(currentContentType())}>
          <img
            class="max-h-[1000px] w-auto object-contain rounded border border-gray-200"
            src={`data:${currentContentType()};base64, ${Base64.fromUint8Array(
              new Uint8Array(state.response.body),
            )}`}
          />
        </Match>
        <Match when={audioTypes.has(currentContentType())}>
          <div class="p-4 bg-gray-50 rounded border border-gray-200">
            <audio controls class="w-full">
              <source src={state.url} type={currentContentType()} />
              Your browser does not support the audio element.
            </audio>
          </div>
        </Match>
        <Match when={videoTypes.has(currentContentType())}>
          <div class="p-2 bg-black rounded overflow-hidden">
            <video controls class="max-w-full h-auto">
              <source src={state.url} type={currentContentType()} />
              Your browser does not support the video element.
            </video>
          </div>
        </Match>
        <Match when={binaryTypes.has(currentContentType())}>
          <a
            class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
            href={`data:${currentContentType()};base64, ${Base64.fromUint8Array(
              new Uint8Array(state.response.body),
            )}`}
            download="file"
          >
            Download Binary File
          </a>
        </Match>
      </Switch>
    </div>
  );
}
