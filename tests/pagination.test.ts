import assert from "node:assert/strict";
import test from "node:test";
import { paginate } from "../lib/pagination.ts";

test("paginate returns the requested static slice", () => {
  const result = paginate(Array.from({ length: 19 }, (_, index) => index + 1), 2, 8);
  assert.deepEqual(result.items, [9, 10, 11, 12, 13, 14, 15, 16]);
  assert.equal(result.totalPages, 3);
});

test("paginate clamps invalid page numbers", () => {
  assert.equal(paginate([1, 2], 99, 1).page, 2);
  assert.equal(paginate([1, 2], -4, 1).page, 1);
});
