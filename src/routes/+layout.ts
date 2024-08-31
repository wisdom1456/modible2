import type { LoadEvent } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load({ params }: LoadEvent) {
  const { route } = params;
  if (typeof route === 'string' && route === '/tasks') {
    await import('$lib/components/tasks/Tasks.svelte');
  }
  // Add other routes as needed
}
