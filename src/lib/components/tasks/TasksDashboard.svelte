<script lang="ts">
  import { page } from '$app/stores';
  import Overview from './Overview.svelte';
  import TaskList from './TaskList.svelte';
  import Calendar from './Calendar.svelte';

  $: currentPath = $page.url.pathname;
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  {#if currentPath === '/tasks' || currentPath === '/tasks/'}
    <Overview />
  {:else if currentPath === '/tasks/list'}
    <TaskList />
  {:else if currentPath === '/tasks/calendar'}
    <Calendar />
  {:else}
    <p class="text-gray-800">Page not found: {currentPath}</p>
  {/if}
</div>