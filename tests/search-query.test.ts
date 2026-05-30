import MiniSearch from "minisearch";
import { describe, expect, it } from "vitest";

import { buildSearchQuery, searchOptions, tokenizeSearchText } from "../src/lib/search-tokenize";

describe("buildSearchQuery", () => {
  it("removes single-character latin tokens", () => {
    expect(buildSearchQuery("github a")).toBe("github");
  });

  it("does not broaden multi-token searches", () => {
    const search = new MiniSearch({
      fields: ["title"],
      tokenize: tokenizeSearchText,
      searchOptions,
    });

    search.addAll([
      { id: "github", title: "GitHub account setup" },
      { id: "app", title: "React app setup" },
      { id: "github-cli", title: "GitHub CLI setup" },
    ]);

    const githubResults = search.search(buildSearchQuery("github")).map((result) => result.id);
    const githubCliResults = search.search(buildSearchQuery("github cli")).map((result) => result.id);

    expect(githubCliResults).toEqual(["github-cli"]);
    expect(githubCliResults.length).toBeLessThanOrEqual(githubResults.length);
  });

  it("does not match fuzzy latin terms", () => {
    const search = new MiniSearch({
      fields: ["title"],
      tokenize: tokenizeSearchText,
      searchOptions,
    });

    search.addAll([{ id: "github", title: "GitHub account setup" }]);

    expect(search.search(buildSearchQuery("githob"))).toEqual([]);
  });
});
