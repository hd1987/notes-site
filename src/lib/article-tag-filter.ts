export function articleMatchesTagFilter(tags: string[], filter: string): boolean {
  const normalizedFilter = filter.trim().toLowerCase();
  if (!normalizedFilter) return true;

  return tags.some((tag) => tag.trim().toLowerCase() === normalizedFilter);
}
