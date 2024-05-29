import { test, expect } from "@jest/globals";
import { JSDOM } from "jsdom"
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

describe("normalizeURL",() => {

  test("fn normalizeURL", () => {
    expect(normalizeURL("https://hello.com/world")).toBe("hello.com/world")
    expect(normalizeURL("https://hello.com/world/")).toBe("hello.com/world/")
    expect(normalizeURL("http://hello.com/world")).toBe("hello.com/world")
    expect(normalizeURL("http://hello.com/world/")).toBe("hello.com/world/")
  })
})

describe("getURLsFromHTML", () => {

  test("extracts URLs from anchor tags and normalizes them", () => {
  const htmlBody = `
    <html>
      <body>
        <a href="http://example.com/page1">Page 1</a>
        <a href="/page2">Page 2</a>
      </body>
    </html>
    `;
  const baseURL = "http://example.com";
  
  const urls = getURLsFromHTML(htmlBody, baseURL);

  expect(urls).toEqual([
    "example.com/page1",
    "example.com/page2",
  ]);
});

test("handles no anchor tags gracefully", () => {
  const htmlBody = `
  <html>
    <body>
      <p>No links here!</p>
    </body>
  </html>`;

  const baseURL = "http://example.com";

  const urls = getURLsFromHTML(htmlBody, baseURL);
  
  expect(urls).toEqual([]);
});

test("handles malformed HTML gracefully", () => {
  const htmlBody = `
  <html>
    <body>
      <a href="http://example.com/page1">
        <p>Page 1</p>
    </body>
  </html>`;
  const baseURL = "http://example.com";
  
  const urls = getURLsFromHTML(htmlBody, baseURL);
  
  expect(urls).toEqual(["example.com/page1"]);
});

test("handles relative URLs", () => {
  const htmlBody = `
  <html>
    <body>
      <a href="/page1">Page 1</a>
      <a href="/page2">Page 2</a>
    </body>
  </html>
  `;
  const baseURL = "http://example.com"
  
  const urls = getURLsFromHTML(htmlBody, baseURL);
  
  expect(urls).toEqual([
    "example.com/page1",
    "example.com/page2",
  ]);
});

test("returns normalized URLs correctly", () => {
  const htmlBody = `
  <html>
    <body>
      <a href="http://example.com/page1">Page 1</a>
    </body>
  </html>
  `;
  const baseURL = "http://example.com"
  
  const urls = getURLsFromHTML(htmlBody, baseURL);
  
  expect(urls).toEqual(["example.com/page1"])
  })
})