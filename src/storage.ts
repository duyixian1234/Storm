import {
  mkdir,
  exists,
  writeTextFile,
  readTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { RequestRecord } from "./types";

export async function init() {
  const appDirExists = await exists(".storm", {
    baseDir: BaseDirectory.Home,
  });
  if (!appDirExists) {
    console.log("Creating $HOME/.storm/ directory");
    await mkdir(".storm", {
      baseDir: BaseDirectory.Home,
      recursive: true,
    });
  }
  const historyDirExists = await exists(".storm/history", {
    baseDir: BaseDirectory.Home,
  });
  if (!historyDirExists) {
    console.log("Creating $HOME/.storm/history/ directory");
    await mkdir(".storm/history", {
      baseDir: BaseDirectory.Home,
      recursive: true,
    });
  }
}

export async function loadHistory() {
  const historyExists = await exists(".storm/history/history.json", {
    baseDir: BaseDirectory.Home,
  });
  if (!historyExists) {
    console.log("Creating $HOME/.storm/history/history.json");
    await writeTextFile(".storm/history/history.json", "[]", {
      baseDir: BaseDirectory.Home,
    });
  }
  return JSON.parse(
    await readTextFile(".storm/history/history.json", {
      baseDir: BaseDirectory.Home,
    }),
  ) as RequestRecord[];
}

export async function saveHistory(history: RequestRecord[]) {
  await writeTextFile(".storm/history/history.json", JSON.stringify(history), {
    baseDir: BaseDirectory.Home,
  });
}

export async function appendRequestRecord(record: RequestRecord) {
  const history = await loadHistory();
  await saveHistory([record, ...history.slice(0, 19)]);
}
