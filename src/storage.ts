import {
  createDir,
  exists,
  writeTextFile,
  readTextFile,
  BaseDirectory,
} from "@tauri-apps/api/fs";
import { RequestRecord } from "./types";

export async function init() {
  const appDirExists = await exists(".storm", {
    dir: BaseDirectory.Home,
  });
  if (!appDirExists) {
    console.log("Creating $HOME/.storm/ directory");
    await createDir(".storm", {
      dir: BaseDirectory.Home,
      recursive: true,
    });
  }
  const historyDirExists = await exists(".storm/history", {
    dir: BaseDirectory.Home,
  });
  if (!historyDirExists) {
    console.log("Creating $HOME/.storm/history/ directory");
    await createDir(".storm/history", {
      dir: BaseDirectory.Home,
      recursive: true,
    });
  }
}

export async function loadHistory() {
  const historyExists = await exists(".storm/history/history.json", {
    dir: BaseDirectory.Home,
  });
  if (!historyExists) {
    console.log("Creating $HOME/.storm/history/history.json");
    writeTextFile(".storm/history/history.json", "[]", {
      dir: BaseDirectory.Home,
    });
  }
  return JSON.parse(
    await readTextFile(".storm/history/history.json", {
      dir: BaseDirectory.Home,
    })
  ) as RequestRecord[];
}

export async function saveHistory(history: RequestRecord[]) {
  await writeTextFile(".storm/history/history.json", JSON.stringify(history), {
    dir: BaseDirectory.Home,
  });
}

export async function appendRequestRecord(record: RequestRecord) {
  const history = await loadHistory();
  await saveHistory([record, ...history.slice(0, 19)]);
}
