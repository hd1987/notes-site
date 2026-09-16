import { describe, expect, it, vi } from "vitest";
import { createSearchLoader, validateSearchDocuments } from "../src/lib/search-loader";

describe("search initialization", () => {
  it("does no work until requested and shares pending and successful initialization", async () => {
    const initialize = vi.fn(async () => ({ ready: true }));
    const load = createSearchLoader(initialize);
    expect(initialize).not.toHaveBeenCalled();
    const first = load();
    expect(load()).toBe(first);
    const value = await first;
    expect(await load()).toBe(value);
    expect(initialize).toHaveBeenCalledTimes(1);
  });

  it("permits a retry after failed initialization", async () => {
    const initialize = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce("ready");
    const load = createSearchLoader(initialize);
    await expect(load()).rejects.toThrow("offline");
    await expect(load()).resolves.toBe("ready");
    expect(initialize).toHaveBeenCalledTimes(2);
  });

  it.each([null, {}, [null], [{ id: "x" }]])("rejects malformed index %j", (value) => {
    expect(() => validateSearchDocuments(value)).toThrow();
  });

  it("accepts valid documents and rejects duplicate IDs", () => {
    const item = { id: "x", title: "X", description: "", body: "", url: "/notes/x/", filePath: "x.md", tags: ["Git"] };
    expect(validateSearchDocuments([item])).toEqual([item]);
    expect(() => validateSearchDocuments([item, item])).toThrow();
  });
});
