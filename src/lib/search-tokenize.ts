const cjkPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu;
const latinPattern = /[a-z0-9]+/gu;
const latinTokenPattern = /^[a-z0-9]+$/u;

export const searchOptions = {
  boost: { title: 3, tags: 2 },
  combineWith: "AND" as const,
  prefix: true,
};

export function tokenizeSearchText(text: string): string[] {
  const value = text.toLowerCase();
  const tokens = new Set<string>();

  for (const token of value.match(latinPattern) ?? []) {
    tokens.add(token);
  }

  for (const group of value.match(cjkPattern) ?? []) {
    for (let index = 0; index < group.length; index += 1) {
      tokens.add(group[index]);

      if (index + 2 <= group.length) {
        tokens.add(group.slice(index, index + 2));
      }
    }
  }

  return [...tokens];
}

export function buildSearchQuery(query: string): string {
  const tokens = tokenizeSearchText(query).filter((token) => {
    if (latinTokenPattern.test(token)) {
      return token.length > 1;
    }

    return true;
  });

  return tokens.join(" ");
}
