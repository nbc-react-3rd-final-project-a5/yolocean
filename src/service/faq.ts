import { readFile } from "fs/promises";
import path from "path";

// 최적화시 사용예정.. 현재 안씀
export async function getFaq() {
  const filePath = path.join(process.cwd(), "src/data", "customerData.json");
  const data = await readFile(filePath, "utf-8");

  const result = JSON.parse(data);

  return result;
}
