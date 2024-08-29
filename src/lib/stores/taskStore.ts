import { writable } from "svelte/store";
import type { Task, Project, CalendarEvent, ScheduleBlock } from "$lib/types";

const createTaskStore = () => {
  const { subscribe, set, update } = writable<Task[]>([]);

  return {
    subscribe,
    set,
    update,
    getTasks: async () => {
      // Fetch tasks from an API or local storage
      return [];
    },
    addTask: (task: Task) => update((tasks) => [...tasks, task]),
    updateTask: (id: string, updates: Partial<Task>) =>
      update((tasks) =>
        tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
      ),
    deleteTask: (id: string) =>
      update((tasks) => tasks.filter((task) => task.id !== id)),
    getTask: async (id: string): Promise<Task | null> => {
      // Fetch single task logic
      return null;
    },
    addSubtask: (taskId: string, subtask: Task) => {
      // Add subtask logic
    },
    deleteSubtask: (taskId: string, subtaskId: string) => {
      // Delete subtask logic
    },
    getTaskSummary: () => {
      // Implement task summary logic
      return { pendingTasks: 0 };
    },
  };
};

export const taskStore = createTaskStore();
