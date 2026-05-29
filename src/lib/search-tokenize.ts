const cjkPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu;
const latinPattern = /[a-z0-9]+/gu;

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
