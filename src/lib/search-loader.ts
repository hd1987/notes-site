import type { SearchDocument } from "./search";

export function createSearchLoader<T>(initialize: () => Promise<T>): () => Promise<T> {
  let pending: Promise<T> | undefined;
  return () => {
    pending ??= Promise.resolve().then(initialize).catch((error) => {
      pending = undefined;
      throw error;
    });
    return pending;
  };
}

export function validateSearchDocuments(value: unknown): SearchDocument[] {
  if (!Array.isArray(value)) throw new Error("Invalid search index");
  const ids = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== "object" ||
      !["id", "title", "description", "body", "url", "filePath"].every((key) => typeof item[key] === "string") ||
      !item.id || ids.has(item.id) || !Array.isArray(item.tags) || !item.tags.every((tag: unknown) => typeof tag === "string")) {
      throw new Error("Invalid search document");
    }
    ids.add(item.id);
  }
  return value;
}
