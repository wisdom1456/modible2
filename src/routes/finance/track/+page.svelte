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

  let categories = [];

  onMount(() => {
    const unsubscribe = financeStore.subscribe(value => {
      if (value) {
        categories = value.categories || [];
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<ModuleNavigation items={financeNavItems} />

<div class="p-8 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-bold mb-4 text-gray-800">Track</h1>
  <p>This page is under construction.</p>
</div>