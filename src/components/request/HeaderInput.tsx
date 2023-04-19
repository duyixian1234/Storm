import { headers, setHeaders } from "../../context";
import { RequestHeader } from "../../types";
import "./request.css";

export function HeaderInput(props: { header: RequestHeader; index: number }) {
  const { header, index } = props;

  const handleKeyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: value, value: header.value });
  };

  const handleValueChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: header.key, value });
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleAddHeader = () => {
    const newHeaders = [...headers(), { key: "", value: "" }];
    setHeaders(newHeaders);
  };

  const onChange = (index: number, header: RequestHeader) => {
    const newHeaders = [...headers()];
    newHeaders[index] = header;
    setHeaders(newHeaders);
  };

  const onDelete = (index: number) => {
    const newHeaders = [...headers()];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  return (
    <div class="header-input">
      <input type="text" value={header.key} onInput={handleKeyChange} />
      <span />
      <input type="text" value={header.value} onInput={handleValueChange} />
      <button onClick={handleDelete}>删除</button>
      {index == headers().length - 1 && (
        <button onClick={handleAddHeader}>添加</button>
      )}
    </div>
  );
}
