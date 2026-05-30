import { describe, expect, it } from "vitest";

import {
  openMobileSearchSidebar,
  shouldKeepMobileSidebarOpen,
  shouldShowSearchTags,
} from "../src/lib/mobile-search-sidebar";

describe("openMobileSearchSidebar", () => {
  it("opens the sidebar on mobile screens", () => {
    const shell = createShell();

    openMobileSearchSidebar(shell, true);

    expect(shell.classList.contains("is-sidebar-open")).toBe(true);
  });

  it("keeps the desktop sidebar state unchanged", () => {
    const shell = createShell();

    openMobileSearchSidebar(shell, false);

    expect(shell.classList.contains("is-sidebar-open")).toBe(false);
  });
});

describe("shouldKeepMobileSidebarOpen", () => {
  it("keeps the sidebar open for header search interactions", () => {
    const target = {
      closest: (selector: string) => selector.includes("[data-header-search]"),
    } as unknown as Element;

    expect(shouldKeepMobileSidebarOpen(target)).toBe(true);
  });
});

describe("shouldShowSearchTags", () => {
  it("shows tags only while the search input is focused and empty", () => {
    expect(shouldShowSearchTags("", true)).toBe(true);
    expect(shouldShowSearchTags("git", true)).toBe(false);
    expect(shouldShowSearchTags("", false)).toBe(false);
  });
});

function createShell() {
  const classes = new Set<string>();

  return {
    classList: {
      add: (className: string) => classes.add(className),
      contains: (className: string) => classes.has(className),
    },
  } as unknown as HTMLElement;
}
