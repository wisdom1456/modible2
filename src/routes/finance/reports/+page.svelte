<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/Unused/ModuleNavigation.svelte';
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';

  const financeNavItems = [
    { href: '/finance', label: 'Overview' },
    { href: '/finance/budget', label: 'Budget' },
    { href: '/finance/expenses', label: 'Expenses' },
    { href: '/finance/investments', label: 'Investments' },
    { href: '/finance/goals', label: 'Financial Goals' },
  ];

  let goals = [];
  let dailyExpenses = [];

  onMount(() => {
    const unsubscribe = financeStore.subscribe(value => {
      if (value) {
        goals = value.goals;
        dailyExpenses = value.dailyExpenses || [];
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<ModuleNavigation items={financeNavItems} />

<div class="p-4 bg-white rounded-lg shadow-md">
  <h1 class="text-3xl font-bold mb-4 text-gray-800">Reports</h1>
  <p>This page is under construction.</p>
</div>

<style>
  /* Remove this if it's not used */
  /*
  .reports-container {
    // Your styles here
  }
  */
</style>