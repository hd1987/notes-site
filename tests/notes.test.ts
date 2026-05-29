import { describe, expect, it } from "vitest";
import { buildNoteRecords, sortNoteRecords } from "../src/lib/notes";

describe("note records", () => {
  it("uses explicit slugs and fails duplicate slugs", () => {
    const entries = [
      {
        id: "first.md",
        body: "# First",
        data: { title: "First", slug: "same-slug" },
      },
      {
        id: "second.md",
        body: "# Second",
        data: { title: "Second", slug: "same-slug" },
      },
    ];

    expect(() => buildNoteRecords(entries)).toThrow("Duplicate note slug");
  });

  it("sorts notes by updated, created, title, and path", () => {
    const records = buildNoteRecords([
      {
        id: "b.md",
        body: "# Beta",
        data: {
          title: "Beta",
          created: new Date("2026-05-01"),
          updated: new Date("2026-05-20"),
        },
      },
      {
        id: "a.md",
        body: "# Alpha",
        data: {
          title: "Alpha",
          created: new Date("2026-05-02"),
          updated: new Date("2026-05-20"),
        },
      },
      {
        id: "newer.md",
        body: "# Newer",
        data: {
          title: "Newer",
          created: new Date("2026-05-01"),
          updated: new Date("2026-05-21"),
        },
      },
    ]);

    expect(sortNoteRecords(records).map((record) => record.title)).toEqual([
      "Newer",
      "Alpha",
      "Beta",
    ]);
  });

  it("falls back to first heading and file path slug", () => {
    const [record] = buildNoteRecords([
      {
        id: "folder/Untitled Note.md",
        body: "# Heading Title\n\nBody text",
        data: {},
      },
    ]);

    expect(record.title).toBe("Heading Title");
    expect(record.slug).toBe("folder/untitled-note");
    expect(record.url).toBe("/notes/folder/untitled-note/");
  });
});
