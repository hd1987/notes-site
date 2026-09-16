import { activateSidebarTab } from "./sidebar-tabs";

export function openMobileSearchSidebar(
  shell: HTMLElement | null,
  isMobile: boolean,
  tabButtons: Iterable<Element> = [],
  tabPanels: Iterable<Element> = [],
): void {
  if (shell && isMobile) {
    shell.classList.add("is-sidebar-open");
  }

  activateSidebarTab("articles", tabButtons, tabPanels);
}

export function shouldKeepMobileSidebarOpen(target: Element): boolean {
  return Boolean(target.closest("[data-sidebar], [data-menu-button], [data-header-search]"));
}

export function shouldShowSearchTags(value: string, isFocused: boolean): boolean {
  return isFocused && !value.trim();
}
