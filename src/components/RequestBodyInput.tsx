import { setBody, body } from "./../context";
import "./Window.css";

export function RequestBodyInput() {
  const handleBodyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setBody(value);
  };

  return (
    <div>
      <h4>请求体</h4>
      <textarea value={body()} onInput={handleBodyChange} />
    </div>
  );
}
