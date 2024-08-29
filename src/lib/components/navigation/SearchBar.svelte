<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { debounce } from '$lib/utils';

  const dispatch = createEventDispatcher<{search: {term: string}}>();

  let searchTerm = '';

  const debouncedSearch = debounce((term: string) => {
    dispatch('search', { term });
  }, 300);

  $: if (searchTerm) debouncedSearch(searchTerm);
</script>

<div class="relative">
  <input
    type="text"
    bind:value={searchTerm}
    placeholder="Search..."
    class="w-full px-4 py-2 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {#if searchTerm}
    <button
      on:click={() => (searchTerm = '')}
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      Clear
    </button>
  {/if}
</div>