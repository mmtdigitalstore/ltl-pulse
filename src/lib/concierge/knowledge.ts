import fs from "node:fs";
import path from "node:path";

let cachedKnowledge: string | null = null;

export function getCadenceKnowledge(): string {
  if (cachedKnowledge) {
    return cachedKnowledge;
  }

  const filePath = path.join(process.cwd(), "src/data/cadence-knowledge.md");
  cachedKnowledge = fs.readFileSync(filePath, "utf-8");
  return cachedKnowledge;
}
