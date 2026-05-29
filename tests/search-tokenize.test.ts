import MiniSearch from "minisearch";
import { describe, expect, it } from "vitest";

import { tokenizeSearchText } from "../src/lib/search-tokenize";

describe("tokenizeSearchText", () => {
  it("matches Chinese terms that are not at the beginning of a title", () => {
    const search = new MiniSearch({
      fields: ["title"],
      tokenize: tokenizeSearchText,
    });

    search.addAll([
      { id: "git-basics", title: "Git基础" },
      { id: "js-isweixin", title: "判断是否是微信内置浏览器" },
    ]);

    expect(search.search("基础").map((result) => result.id)).toContain("git-basics");
    expect(search.search("内置").map((result) => result.id)).toContain("js-isweixin");
  });
});
