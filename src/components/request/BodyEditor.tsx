import { body, setBody, setByValue } from "../../vm";
import "./request.css";

export function BodyEditor() {
  return (
    <div>
      <textarea
        class="body-input"
        value={body()}
        onInput={setByValue(setBody)}
      />
    </div>
  );
}
