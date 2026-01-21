import { writeText } from "@tauri-apps/plugin-clipboard-manager";

export async function copyToClipboard(text: string) {
  await writeText(text);
}
