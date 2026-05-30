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

  it("keeps the desktop drawer state unchanged", () => {
    const shell = createShell();

    openMobileSearchSidebar(shell, false);

    expect(shell.classList.contains("is-sidebar-open")).toBe(false);
  });

  it.each([true, false])("switches the sidebar back to the articles tab when isMobile is %s", (isMobile) => {
    const shell = createShell();
    const articlesButton = createSidebarItem("data-tab-button", "articles", false);
    const outlineButton = createSidebarItem("data-tab-button", "outline", true);
    const articlesPanel = createSidebarItem("data-tab-panel", "articles", false);
    const outlinePanel = createSidebarItem("data-tab-panel", "outline", true);

    openMobileSearchSidebar(shell, isMobile, [articlesButton, outlineButton], [articlesPanel, outlinePanel]);

    expect(articlesButton.classList.contains("is-active")).toBe(true);
    expect(outlineButton.classList.contains("is-active")).toBe(false);
    expect(articlesPanel.classList.contains("is-active")).toBe(true);
    expect(outlinePanel.classList.contains("is-active")).toBe(false);
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

function createSidebarItem(attribute: string, value: string, isActive: boolean) {
  const classes = new Set<string>(isActive ? ["is-active"] : []);

  return {
    classList: {
      contains: (className: string) => classes.has(className),
      toggle: (className: string, force: boolean) => {
        if (force) classes.add(className);
        else classes.delete(className);
      },
    },
    getAttribute: (name: string) => (name === attribute ? value : null),
  } as unknown as Element;
}
