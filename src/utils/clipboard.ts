import { writeText } from "@tauri-apps/api/clipboard";

export async function copyToClipboard(text: string) {
  await writeText(text);
}
