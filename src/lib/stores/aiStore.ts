import { writable } from "svelte/store";

export const aiStore = writable({
  insights: [],
  // Add more AI-related data here
});

export function getInsights() {
  // Fetch and return AI insights
  return [
    { id: "1", text: "Insight 1" },
    { id: "2", text: "Insight 2" },
    // Add more insights here
  ];
}
