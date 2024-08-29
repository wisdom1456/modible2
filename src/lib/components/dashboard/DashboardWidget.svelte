<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let title: string;
  export let isCustomizing: boolean;
</script>

<div class="dashboard-widget p-4 bg-white rounded-lg shadow-md">
  <h3 class="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
  <slot></slot>
  {#if isCustomizing}
    <button class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" on:click={() => dispatch('remove')}>Remove</button>
  {/if}
</div>

<style>
  /* Add styles for the dashboard widget component */
</style>