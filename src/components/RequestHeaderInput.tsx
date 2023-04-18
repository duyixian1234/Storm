import { RequestHeader } from "./../types";
import "./Window.css";

export function RequestHeaderInput(props: {
  header: RequestHeader;
  index: number;
  onChange: (header: RequestHeader) => void;
  onDelete: (index: number) => void;
}) {
  const { header, onChange, onDelete, index } = props;

  const handleKeyChange = (e: any) => {
    onChange({ key: e.target.value, value: header.value });
  };

  const handleValueChange = (e: any) => {
    onChange({ key: header.key, value: e.target.value });
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div class="header-input">
      <input type="text" value={header.key} onInput={handleKeyChange} />
      :
      <input type="text" value={header.value} onInput={handleValueChange} />
      <button onClick={handleDelete}>删除</button>
    </div>
  );
}
