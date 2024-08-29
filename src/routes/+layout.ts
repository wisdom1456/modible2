import type { LoadEvent } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load({ params }: LoadEvent) {
  const { route } = params;
  if (route && typeof route === 'object' && 'id' in route && route.id === '/tasks') {
    await import('$lib/components/tasks/Tasks.svelte');
  }
  // Add other routes as needed
}
