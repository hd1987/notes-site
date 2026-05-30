export function openMobileSearchSidebar(shell: HTMLElement | null, isMobile: boolean): void {
  if (shell && isMobile) {
    shell.classList.add("is-sidebar-open");
  }
}

export function shouldKeepMobileSidebarOpen(target: Element): boolean {
  return Boolean(target.closest("[data-sidebar], [data-menu-button], [data-header-search]"));
}

export function shouldShowSearchTags(value: string, isFocused: boolean): boolean {
  return isFocused && !value.trim();
}
