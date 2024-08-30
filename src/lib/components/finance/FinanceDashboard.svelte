<script lang="ts">
  import { page } from '$app/stores';
  import Dashboard from './Dashboard.svelte';
  import Budget from './Budget.svelte';
  import Expenses from './Expenses.svelte';
  import Income from './Income.svelte';
  import Investments from './Investments.svelte';
  import Goals from './Goals.svelte';

  $: currentPath = $page.url.pathname;
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  {#if currentPath === '/finance' || currentPath === '/finance/'}
    <Dashboard />
  {:else if currentPath === '/finance/budget'}
    <Budget />
  {:else if currentPath === '/finance/expenses'}
    <Expenses />
  {:else if currentPath === '/finance/income'}
    <Income />
  {:else if currentPath === '/finance/investments'}
    <Investments />
  {:else if currentPath === '/finance/goals'}
    <Goals />
  {:else}
    <p class="text-gray-800">Page not found: {currentPath}</p>
  {/if}
</div>