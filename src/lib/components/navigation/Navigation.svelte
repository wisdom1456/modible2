<script lang="ts">
  import { page } from '$app/stores';
  
  export let items: { href: string; label: string }[];
  export let module: string | undefined = undefined;
</script>

<nav class="flex justify-center p-4 bg-gray-800 rounded-md">
  {#if module}
    <span class="text-white mr-4">{module}</span>
  {/if}
  {#each items as item}
    <a
      href={item.href}
      class="mx-2 px-4 py-2 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
      class:bg-gray-700={$page.url.pathname === item.href}
    >
      {item.label}
    </a>
  {/each}
</nav>