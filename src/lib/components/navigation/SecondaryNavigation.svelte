<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let sections: { name: string; key: string }[];
  export let changeSection: (section: string) => void;
  export let activeSection: Writable<string>;
</script>

<!-- Secondary navigation -->
<nav class="flex overflow-x-auto border-b border-white/10 py-4">
  <ul class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
    {#each sections as section}
    <li>
      <button
        class="px-3 py-2 rounded transition-colors duration-200"
        class:text-indigo-400={$activeSection === section.key}
        class:text-gray-400={$activeSection !== section.key}
        class:hover:text-indigo-300={$activeSection !== section.key}
        on:click={() => changeSection(section.key)}
      >
        {section.name}
      </button>
    </li>
    {/each}
  </ul>
</nav>