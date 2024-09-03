declare module 'svelte-routing' {
  import { SvelteComponentTyped } from 'svelte';

  export class Router extends SvelteComponentTyped<{ url?: string }> {}
  export class Route extends SvelteComponentTyped<{
    path?: string;
    component?: any;
  }> {}
  export class Link extends SvelteComponentTyped<{ to: string }> {}
}
