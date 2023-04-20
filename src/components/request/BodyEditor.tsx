import { body, setBody } from "../../context";
import "./request.css";

export function BodyEditor() {
  const handleBodyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setBody(value);
  };

  return (
    <div>
      <textarea class="body-input" value={body()} onInput={handleBodyChange} />
    </div>
  );
}
