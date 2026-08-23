import assert from "node:assert/strict";
import test from "node:test";
import { parseContent } from "../lib/content/parser.ts";

test("parseContent parses scalars and arrays without evaluating code", () => {
  const result = parseContent(`---\ntitle: "Bài viết"\nfeatured: true\norder: 2\ntags:\n  - "món ngon"\n---\n\nNội dung`);
  assert.equal(result.data.title, "Bài viết");
  assert.equal(result.data.featured, true);
  assert.equal(result.data.order, 2);
  assert.deepEqual(result.data.tags, ["món ngon"]);
  assert.equal(result.body, "Nội dung");
});
