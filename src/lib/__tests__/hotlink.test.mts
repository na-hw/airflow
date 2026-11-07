import assert from "node:assert/strict";
import { test } from "node:test";
import { isAllowedImageReferer } from "../hotlink.ts";

test("allows requests from the page's own host, whatever the deployment", () => {
  assert.equal(isAllowedImageReferer("https://airflow-beryl.vercel.app/projects", "airflow-beryl.vercel.app"), true);
  assert.equal(isAllowedImageReferer("https://preview-abc.vercel.app/", "preview-abc.vercel.app"), true);
  assert.equal(isAllowedImageReferer("http://localhost:3000/", "localhost"), true);
});

test("allows the production domains from any host", () => {
  assert.equal(isAllowedImageReferer("https://www.airflowsystem.ir/", "airflowsystem.ir"), true);
});

test("allows requests without a usable referer", () => {
  assert.equal(isAllowedImageReferer(null, "airflow-beryl.vercel.app"), true);
  assert.equal(isAllowedImageReferer("not a url", "airflow-beryl.vercel.app"), true);
});

test("blocks other websites", () => {
  assert.equal(isAllowedImageReferer("https://evil.example/page", "airflow-beryl.vercel.app"), false);
});
