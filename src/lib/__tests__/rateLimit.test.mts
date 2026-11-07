import assert from "node:assert/strict";
import { test } from "node:test";
import { createRateLimiter } from "../rateLimit.ts";

test("allows up to max requests per window, then limits", () => {
  const isLimited = createRateLimiter({ max: 3, windowMs: 1000, now: () => 0 });

  assert.equal(isLimited("a"), false);
  assert.equal(isLimited("a"), false);
  assert.equal(isLimited("a"), false);
  assert.equal(isLimited("a"), true);
  assert.equal(isLimited("b"), false, "keys are tracked independently");
});

test("resets once the window has elapsed", () => {
  let time = 0;
  const isLimited = createRateLimiter({ max: 1, windowMs: 1000, now: () => time });

  assert.equal(isLimited("a"), false);
  assert.equal(isLimited("a"), true);
  time = 1000;
  assert.equal(isLimited("a"), false);
});
