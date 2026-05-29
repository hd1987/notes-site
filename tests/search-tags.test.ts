import { describe, expect, it } from "vitest";

import { collectSearchTags } from "../src/lib/search-tags";

describe("collectSearchTags", () => {
  it("deduplicates and sorts tags case-insensitively", () => {
    const tags = collectSearchTags([
      { tags: ["js", "Git"] },
      { tags: ["astro", "git"] },
      { tags: [] },
    ]);

    expect(tags).toEqual(["astro", "Git", "js"]);
  });
});
