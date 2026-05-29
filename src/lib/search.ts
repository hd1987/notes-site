import type { NoteRecord } from "./notes";
import { withBasePath } from "./paths";

export type SearchDocument = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  body: string;
  url: string;
  filePath: string;
};

export function buildSearchDocuments(records: NoteRecord[]): SearchDocument[] {
  return records.map((record) => ({
    id: record.slug,
    title: record.title,
    description: record.description,
    tags: record.tags,
    body: markdownToText(record.body),
    url: withBasePath(record.url),
    filePath: record.filePath,
  }));
}

export function markdownToText(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/m, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
