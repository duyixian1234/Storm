import { formItems, setFormItems } from "../../vm";
import { FormItem } from "../../types";
import "./request.css";

export function FormItemInput(props: { formItem: FormItem; index: number }) {
  const { formItem: formitem, index } = props;

  const handleKeyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: value, value: formitem.value });
  };

  const handleValueChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: formitem.key, value });
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleAddQuery = () => {
    const newFormItems = [...formItems(), { key: "", value: "" }];
    setFormItems(newFormItems);
  };

  const onChange = (index: number, formitem: FormItem) => {
    const newFormItems = [...formItems()];
    newFormItems[index] = formitem;
    setFormItems(newFormItems);
  };

  const onDelete = (index: number) => {
    const newFormItems = [...formItems()];
    newFormItems.splice(index, 1);
    setFormItems(newFormItems);
  };

  return (
    <div class="form-item-input">
      <input type="text" value={formitem.key} onInput={handleKeyChange} />
      <span />
      <input type="text" value={formitem.value} onInput={handleValueChange} />
      <button onClick={handleDelete}>Del</button>
      {index == formItems().length - 1 && (
        <button onClick={handleAddQuery}>Add</button>
      )}
    </div>
  );
}
