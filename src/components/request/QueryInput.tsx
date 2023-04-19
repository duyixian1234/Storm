import { queries, setQueries } from "../../context";
import { Query } from "../../types";
import "./request.css";

export function QueryInput(props: { query: Query; index: number }) {
  const { query, index } = props;

  const handleKeyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: value, value: query.value });
  };

  const handleValueChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    onChange(index, { key: query.key, value });
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleAddQuery = () => {
    const newHeaders = [...queries(), { key: "", value: "" }];
    setQueries(newHeaders);
  };

  const onChange = (index: number, query: Query) => {
    const newQueries = [...queries()];
    newQueries[index] = query;
    setQueries(newQueries);
  };

  const onDelete = (index: number) => {
    const newHeaders = [...queries()];
    newHeaders.splice(index, 1);
    setQueries(newHeaders);
  };

  return (
    <div class="query-input">
      <input type="text" value={query.key} onInput={handleKeyChange} />
      <span />
      <input type="text" value={query.value} onInput={handleValueChange} />
      <button onClick={handleDelete}>删除</button>
      {index == queries().length - 1 && (
        <button onClick={handleAddQuery}>添加</button>
      )}
    </div>
  );
}
