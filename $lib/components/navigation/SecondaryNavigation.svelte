<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let sections: { name: string; key: string }[];
  export let activeSection: string;

  const dispatch = createEventDispatcher();

  function handleClick(key: string) {
    dispatch('sectionChange', key);
  }
</script>

<nav class="flex space-x-4">
  {#each sections as { name, key }}
    <a
      href={key}
      class={`px-3 py-2 text-sm font-medium rounded-md ${
        activeSection === key
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      on:click|preventDefault={() => handleClick(key)}
    >
      {name}
    </a>
  {/each}
</nav>