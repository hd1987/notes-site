type TaggedDocument = {
  tags?: string[];
};

export function collectSearchTags(documents: TaggedDocument[]): string[] {
  const tags = new Map<string, string>();

  for (const document of documents) {
    for (const tag of document.tags ?? []) {
      const normalized = tag.trim();
      if (!normalized) continue;

      const key = normalized.toLowerCase();
      if (!tags.has(key)) {
        tags.set(key, normalized);
      }
    }
  }

  return [...tags.values()].sort((first, second) =>
    first.localeCompare(second, undefined, { sensitivity: "base" }),
  );
}
