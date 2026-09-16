export function activateSidebarTab(target: string, buttons: Iterable<Element>, panels: Iterable<Element>): void {
  for (const button of buttons) {
    const active = button.getAttribute("data-tab-button") === target;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.setAttribute("tabindex", active ? "0" : "-1");
  }
  for (const panel of panels) {
    const active = panel.getAttribute("data-tab-panel") === target;
    panel.classList.toggle("is-active", active);
    panel.toggleAttribute("hidden", !active);
  }
}
