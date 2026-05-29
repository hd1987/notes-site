import { normalizeSlug } from "./slug";

export type NoteEntryLike = {
  id: string;
  filePath?: string;
  body?: string;
  data: {
    title?: string;
    slug?: string;
    description?: string;
    tags?: string[];
    created?: Date;
    updated?: Date;
  };
};

export type NoteRecord = {
  id: string;
  filePath: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  created?: Date;
  updated?: Date;
  body: string;
  url: string;
};

export function buildNoteRecords(entries: NoteEntryLike[]): NoteRecord[] {
  const records = entries.map((entry) => {
    const slug = normalizeSlug(entry.data.slug ?? entry.id);
    const filePath = entry.filePath ?? entry.id;
    const title = resolveTitle(entry);

    return {
      id: entry.id,
      filePath,
      title,
      slug,
      description: entry.data.description ?? "",
      tags: entry.data.tags ?? [],
      created: entry.data.created,
      updated: entry.data.updated,
      body: entry.body ?? "",
      url: `/notes/${slug}/`,
    };
  });

  assertUniqueSlugs(records);
  return records;
}

export function sortNoteRecords(records: NoteRecord[]): NoteRecord[] {
  return [...records].sort((a, b) => {
    const updatedDiff = dateValue(b.updated) - dateValue(a.updated);
    if (updatedDiff !== 0) return updatedDiff;

    const createdDiff = dateValue(b.created) - dateValue(a.created);
    if (createdDiff !== 0) return createdDiff;

    const titleDiff = a.title.localeCompare(b.title, "zh-Hans");
    if (titleDiff !== 0) return titleDiff;

    return a.filePath.localeCompare(b.filePath, "zh-Hans");
  });
}

export function findNoteBySlug(records: NoteRecord[], slug: string): NoteRecord | undefined {
  return records.find((record) => record.slug === slug);
}

function resolveTitle(entry: NoteEntryLike): string {
  if (entry.data.title?.trim()) return entry.data.title.trim();

  const heading = entry.body?.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading) return heading;

  const fileName = entry.id.split("/").at(-1) ?? entry.id;
  return fileName.replace(/\.md$/i, "");
}

function assertUniqueSlugs(records: NoteRecord[]): void {
  const seen = new Map<string, string>();

  for (const record of records) {
    const existing = seen.get(record.slug);
    if (existing) {
      throw new Error(`Duplicate note slug "${record.slug}" in ${existing} and ${record.filePath}`);
    }
    seen.set(record.slug, record.filePath);
  }
}

function dateValue(value: Date | undefined): number {
  return value?.getTime() ?? 0;
}
