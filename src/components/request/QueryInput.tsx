import { queries, setQueries } from "../../vm";
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
    const newQueires = [...queries(), { key: "", value: "" }];
    setQueries(newQueires);
  };

  const onChange = (index: number, query: Query) => {
    const newQueries = [...queries()];
    newQueries[index] = query;
    setQueries(newQueries);
  };

  const onDelete = (index: number) => {
    const newQueires = [...queries()];
    newQueires.splice(index, 1);
    setQueries(newQueires);
  };

  return (
    <div class="query-input">
      <input type="text" value={query.key} onInput={handleKeyChange} />
      <span />
      <input type="text" value={query.value} onInput={handleValueChange} />
      <button onClick={handleDelete}>Del</button>
      {index == queries().length - 1 && (
        <button onClick={handleAddQuery}>Add</button>
      )}
    </div>
  );
}
