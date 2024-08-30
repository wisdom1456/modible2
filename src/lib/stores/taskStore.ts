import { writable } from "svelte/store";
import type { Task } from "$lib/types";
import { browser } from '$app/environment';

function loadTasks(): Task[] {
  if (browser) {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
}

function saveTasks(tasks: Task[]) {
  if (browser) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function createTaskStore() {
  const { subscribe, set, update } = writable<Task[]>(loadTasks());

  return {
    subscribe,
    addTask: (task: Task) => update(tasks => {
      const newTasks = [...tasks, task];
      saveTasks(newTasks);
      return newTasks;
    }),
    updateTask: (id: string, updates: Partial<Task>) => update(tasks =>
      tasks.map(task => task.id === id ? { ...task, ...updates } : task)
    ),
    deleteTask: (id: string) => update(tasks => tasks.filter(task => task.id !== id)),
    // Add more methods as needed
  };
}

export const taskStore = createTaskStore();
