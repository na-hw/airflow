import assert from "node:assert/strict";
import { test } from "node:test";
import { CONTACT_LIMITS, getContactSchema } from "../contactSchema.ts";

const valid = {
  name: "Sara Ahmadi",
  email: "sara@example.com",
  phone: "021-33585780",
  company: "",
  projectType: "Commercial",
  message: "We need dampers for a ten-storey office building.",
};

test("accepts a valid submission and trims whitespace", () => {
  const result = getContactSchema("en").safeParse({ ...valid, name: "  Sara  " });
  assert.equal(result.success, true);
  assert.equal(result.success && result.data.name, "Sara");
});

test("accepts Persian digits in the phone number", () => {
  const result = getContactSchema("fa").safeParse({ ...valid, phone: "۰۲۱-۳۳۵۸۵۷۸۰" });
  assert.equal(result.success, true);
});

test("rejects invalid email, short message and letters in phone", () => {
  const schema = getContactSchema("en");
  assert.equal(schema.safeParse({ ...valid, email: "nope" }).success, false);
  assert.equal(schema.safeParse({ ...valid, message: "short" }).success, false);
  assert.equal(schema.safeParse({ ...valid, phone: "call me maybe" }).success, false);
});

test("rejects oversized fields", () => {
  const schema = getContactSchema("en");
  const tooLong = "x".repeat(CONTACT_LIMITS.message + 1);
  assert.equal(schema.safeParse({ ...valid, message: tooLong }).success, false);
  assert.equal(
    schema.safeParse({ ...valid, name: "x".repeat(CONTACT_LIMITS.name + 1) }).success,
    false,
  );
});

test("uses localized error messages", () => {
  const result = getContactSchema("fa").safeParse({ ...valid, email: "nope" });
  assert.equal(result.success, false);
  assert.equal(!result.success && result.error.issues[0].message, "ایمیل معتبر نیست");
});
