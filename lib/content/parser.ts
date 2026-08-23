import type { FrontmatterValue } from "./types";

function parseScalar(raw: string): FrontmatterValue {
  const value = raw.trim().replace(/^['"]|['"]$/g, "");
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

export function parseContent(source: string): {
  data: Record<string, FrontmatterValue>;
  body: string;
} {
  const normalized = source.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    throw new Error("Content file is missing frontmatter");
  }
  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) throw new Error("Frontmatter is not closed");

  const data: Record<string, FrontmatterValue> = {};
  let arrayKey = "";
  for (const line of normalized.slice(4, end).split("\n")) {
    const arrayItem = line.match(/^\s+-\s+(.+)$/);
    if (arrayItem && arrayKey) {
      const current = data[arrayKey];
      if (Array.isArray(current)) current.push(String(parseScalar(arrayItem[1])));
      continue;
    }
    const pair = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!pair) continue;
    const [, key, raw] = pair;
    if (raw === "") {
      data[key] = [];
      arrayKey = key;
    } else {
      data[key] = parseScalar(raw);
      arrayKey = "";
    }
  }

  return { data, body: normalized.slice(end + 5).trim() };
}
