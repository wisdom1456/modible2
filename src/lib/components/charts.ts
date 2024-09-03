import type { SvelteComponentTyped } from 'svelte';

export class LineChart extends SvelteComponentTyped<{ data: any }> {}
export class BarChart extends SvelteComponentTyped<{ data: any }> {}
export class PredictionChart extends SvelteComponentTyped<{ data: any }> {}

function someFunction(param: SomeType): ReturnType {
  // Your function implementation
}
