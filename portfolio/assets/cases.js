(() => {
  const tablist = document.querySelector(".casebook-tabs");
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll("a[href^='#']")];
  const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
  if (!tabs.length || panels.some(panel => !panel)) return;

  const select = (index, focus = false) => {
    tabs.forEach((tab, current) => {
      const active = current === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[current].hidden = !active;
    });
    if (focus) tabs[index].focus();
  };

  tablist.setAttribute("role", "tablist");
  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panels[index].id);
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      select(index, true);
    });
    tab.addEventListener("keydown", event => {
      let next;
      switch (event.key) {
        case "ArrowLeft": next = (index - 1 + tabs.length) % tabs.length; break;
        case "ArrowRight": next = (index + 1) % tabs.length; break;
        case "Home": next = 0; break;
        case "End": next = tabs.length - 1; break;
        case " ": next = index; break;
        default: return;
      }
      event.preventDefault();
      select(next, true);
    });
  });

  const fromHash = () => tabs.findIndex(tab => tab.hash === location.hash);
  select(Math.max(0, fromHash()));
  window.addEventListener("hashchange", () => {
    const index = fromHash();
    if (index >= 0) select(index);
  });
})();
