import { articleMatchesTagFilter } from "./article-tag-filter";

type ArticleFilterTarget = {
  id: string;
  tags: string[];
};

export function articleMatchesSearchFilter(
  article: ArticleFilterTarget,
  filter: string,
  resultIds: Set<string>,
  exactTag?: string,
): boolean {
  if (!filter.trim()) return true;
  if (exactTag) return articleMatchesTagFilter(article.tags, exactTag);

  return resultIds.has(article.id);
}
