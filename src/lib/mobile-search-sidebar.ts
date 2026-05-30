export function openMobileSearchSidebar(
  shell: HTMLElement | null,
  isMobile: boolean,
  tabButtons: Iterable<Element> = [],
  tabPanels: Iterable<Element> = [],
): void {
  if (shell && isMobile) {
    shell.classList.add("is-sidebar-open");
  }

  for (const button of tabButtons) {
    button.classList.toggle("is-active", button.getAttribute("data-tab-button") === "articles");
  }

  for (const panel of tabPanels) {
    panel.classList.toggle("is-active", panel.getAttribute("data-tab-panel") === "articles");
  }
}

export function shouldKeepMobileSidebarOpen(target: Element): boolean {
  return Boolean(target.closest("[data-sidebar], [data-menu-button], [data-header-search]"));
}

export function shouldShowSearchTags(value: string, isFocused: boolean): boolean {
  return isFocused && !value.trim();
}
