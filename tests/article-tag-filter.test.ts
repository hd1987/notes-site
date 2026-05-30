import { describe, expect, it } from "vitest";

import { articleMatchesTagFilter } from "../src/lib/article-tag-filter";

describe("articleMatchesTagFilter", () => {
  it("matches articles by exact tag and allows empty filters", () => {
    expect(articleMatchesTagFilter(["js", "css"], "")).toBe(true);
    expect(articleMatchesTagFilter(["js", "css"], "CSS")).toBe(true);
    expect(articleMatchesTagFilter(["javascript"], "js")).toBe(false);
  });
});
