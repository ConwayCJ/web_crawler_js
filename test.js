import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("fn normalizeURL", () => {
  expect(normalizeURL("https://hello.com/world")).toBe("hello.com/world")
  expect(normalizeURL("https://hello.com/world/")).toBe("hello.com/world/")
  expect(normalizeURL("http://hello.com/world")).toBe("hello.com/world")
  expect(normalizeURL("http://hello.com/world/")).toBe("hello.com/world/")
})