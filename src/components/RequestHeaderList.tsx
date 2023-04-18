import { For } from "solid-js";
import { RequestHeader } from "./../types";
import { headers, setHeaders } from "./../context";
import { RequestHeaderInput } from "./RequestHeaderInput";
import "./Window.css";

export function RequestHeaderList() {
  const handleAddHeader = (event: Event) => {
    event.preventDefault();
    const newHeaders = [...headers(), { key: "", value: "" }];
    setHeaders(newHeaders);
  };

  const handleHeaderChange = (index: number, header: RequestHeader) => {
    const newHeaders = [...headers()];
    newHeaders[index] = header;
    setHeaders(newHeaders);
  };

  const handleDeleteHeader = (index: number) => {
    const newHeaders = [...headers()];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  return (
    <div class="header-list">
      <h4>请求头</h4>
      <button onClick={handleAddHeader}>添加</button>
      <For each={headers()}>
        {(header, index) =>
          header && (
            <RequestHeaderInput
              header={header}
              index={index()}
              onChange={(newHeader) => handleHeaderChange(index(), newHeader)}
              onDelete={() => handleDeleteHeader(index())}
            />
          )
        }
      </For>
    </div>
  );
}
