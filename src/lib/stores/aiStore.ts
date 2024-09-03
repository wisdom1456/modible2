import { writable } from 'svelte/store';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '$lib/utils/localStorage';

const aiStore = writable(loadFromLocalStorage('aiStore') || { insights: [] });

aiStore.subscribe((value) => saveToLocalStorage('aiStore', value));

export { aiStore };

export function getInsights() {
  // Fetch and return AI insights
  return [
    { id: '1', text: 'Insight 1' },
    { id: '2', text: 'Insight 2' },
    // Add more insights here
  ];
}
