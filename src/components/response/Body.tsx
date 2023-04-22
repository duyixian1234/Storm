import { Base64 } from "js-base64";
import { contentType, realUrl, response } from "../../vm";
import { Match, Switch } from "solid-js";
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
  return (
    <div>
      <Switch>
        <Match when={textTypes.has(contentType())}>
          <div class="response-text">
            <button
              class="copy-button"
              onClick={() => {
                copyToClipboard(new TextDecoder().decode(response().body));
              }}
            >
              Copy To Clipboard
            </button>
            <pre>
              <code>{new TextDecoder().decode(response().body)}</code>
            </pre>
          </div>
        </Match>
        <Match when={imageTypes.has(contentType())}>
          <img
            class="response-image"
            src={`data:${contentType()};base64, ${Base64.fromUint8Array(
              new Uint8Array(response().body)
            )}`}
          />
        </Match>
        <Match when={audioTypes.has(contentType())}>
          <audio controls>
            <source src={realUrl()} type={contentType()} />
            Your browser does not support the audio element.
          </audio>
        </Match>
        <Match when={videoTypes.has(contentType())}>
          <video controls>
            <source src={realUrl()} type={contentType()} />
            Your browser does not support the video element.
          </video>
        </Match>
        <Match when={binaryTypes.has(contentType())}>
          <a
            href={`data:${contentType()};base64, ${Base64.fromUint8Array(
              new Uint8Array(response().body)
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
