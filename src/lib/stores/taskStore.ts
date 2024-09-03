import { writable } from 'svelte/store';
import type { Task, Project } from '$lib/types';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '$lib/utils/localStorage';

function createTaskStore() {
  const { subscribe, set, update } = writable<Task[]>(
    loadFromLocalStorage<Task[]>('tasks') || [],
  );

  subscribe((value) => saveToLocalStorage('tasks', value));

  return {
    subscribe,
    addTask: (task: Task) =>
      update((tasks) => {
        const newTasks = [...tasks, task];
        saveToLocalStorage('tasks', newTasks);
        return newTasks;
      }),
    updateTask: (id: string, updates: Partial<Task>) =>
      update((tasks) =>
        tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
      ),
    deleteTask: (id: string) =>
      update((tasks) => tasks.filter((task) => task.id !== id)),
    getProjects: async (): Promise<Project[]> => {
      // Implement logic to fetch projects
      return [];
    },
    updateProject: async (id: string, updates: Partial<Project>) => {
      // Implement logic to update a project
    },
    deleteProject: async (id: string) => {
      // Implement logic to delete a project
    },
  };
}

export const taskStore = createTaskStore();
