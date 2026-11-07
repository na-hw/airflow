import assert from "node:assert/strict";
import { test } from "node:test";
import { toAsciiDigits, toTelHref } from "../digits.ts";

test("converts Persian digits to ASCII", () => {
  assert.equal(toAsciiDigits("۱۰۰×۲۰۰ mm"), "100×200 mm");
});

test("builds a dialable tel: href", () => {
  assert.equal(toTelHref("۰۲۱-۳۳۵۸۵۷۸۰"), "tel:02133585780");
  assert.equal(toTelHref("+98 (21) 3358 5780"), "tel:+982133585780");
});
