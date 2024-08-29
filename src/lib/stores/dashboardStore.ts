import { writable } from "svelte/store";

interface Widget {
  type: string;
  id: number;
}

function createDashboardStore() {
  const { subscribe, set, update } = writable<Widget[]>([]);

  return {
    subscribe,
    getWidgets: () => {
      // Implement logic to get widgets from storage or API
      return [];
    },
    saveLayout: (widgets: Widget[]) => {
      // Implement logic to save layout
      set(widgets);
    },
    addWidget: (widget: Widget) => update((widgets) => [...widgets, widget]),
    removeWidget: (id: number) =>
      update((widgets) => widgets.filter((w) => w.id !== id)),
  };
}

export const dashboardStore = createDashboardStore();
