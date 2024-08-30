<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let sections: { name: string; key: string }[];
  export let changeSection: (section: string) => void;
  export let activeSection: Writable<string>;
</script>

<nav class="bg-gray-800 p-4 text-white">
  <ul class="flex space-x-4">
    {#each sections as section}
      <li>
        <button
          class="px-3 py-2 rounded"
          class:bg-gray-600={$activeSection === section.key}
          on:click={() => changeSection(section.key)}
        >
          {section.name}
        </button>
      </li>
    {/each}
  </ul>
</nav>