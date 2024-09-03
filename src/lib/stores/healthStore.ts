import { writable } from 'svelte/store';
import type { HealthGoal, EmotionalHealthData } from '$lib/types';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '$lib/utils/localStorage';

interface HealthState {
  goals: HealthGoal[];
  emotionalHealth: EmotionalHealthData;
}

const initialState: HealthState = loadFromLocalStorage<HealthState>(
  'health',
) || {
  goals: [],
  emotionalHealth: { happinessLevel: 0 },
};

function createHealthStore() {
  const { subscribe, set, update } = writable<HealthState>(initialState);

  subscribe((value) => saveToLocalStorage('health', value));

  return {
    subscribe,
    setGoals: (goals: HealthGoal[]) => update((state) => ({ ...state, goals })),
    addGoal: (goal: HealthGoal) =>
      update((state) => ({ ...state, goals: [...state.goals, goal] })),
    updateGoal: (id: string, updates: Partial<HealthGoal>) =>
      update((state) => ({
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === id ? { ...goal, ...updates } : goal,
        ),
      })),
    deleteGoal: (id: string) =>
      update((state) => ({
        ...state,
        goals: state.goals.filter((goal) => goal.id !== id),
      })),
    updateEmotionalHealth: (data: Partial<EmotionalHealthData>) =>
      update((state) => ({
        ...state,
        emotionalHealth: { ...state.emotionalHealth, ...data },
      })),
    getDataPoints: async (): Promise<any[]> => {
      // Implement logic to fetch health data points
      return [];
    },
  };
}

export const healthStore = createHealthStore();
