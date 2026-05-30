import { describe, expect, it } from "vitest";

import { articleMatchesSearchFilter } from "../src/lib/article-search-filter";

describe("articleMatchesSearchFilter", () => {
  it("matches keyword search results by article id", () => {
    const resultIds = new Set(["git-basics"]);

    expect(articleMatchesSearchFilter({ id: "git-basics", tags: ["git"] }, "基础", resultIds)).toBe(true);
    expect(articleMatchesSearchFilter({ id: "css-flex", tags: ["css"] }, "基础", resultIds)).toBe(false);
    expect(articleMatchesSearchFilter({ id: "css-flex", tags: ["css"] }, "", resultIds)).toBe(true);
  });

  it("uses exact tag matching when a tag shortcut is selected", () => {
    const resultIds = new Set(["javascript-note"]);

    expect(articleMatchesSearchFilter({ id: "javascript-note", tags: ["javascript"] }, "js", resultIds, "js")).toBe(false);
    expect(articleMatchesSearchFilter({ id: "js-note", tags: ["js"] }, "js", resultIds, "js")).toBe(true);
  });
});
