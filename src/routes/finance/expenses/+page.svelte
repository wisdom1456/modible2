<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';

  const financeNavItems = [
    { href: '/finance', label: 'Overview' },
    { href: '/finance/budget', label: 'Budget' },
    { href: '/finance/expenses', label: 'Expenses' },
    { href: '/finance/investments', label: 'Investments' },
    { href: '/finance/goals', label: 'Financial Goals' },
  ];

  let expenses: any[] = [];

  onMount(() => {
    financeStore.subscribe(value => {
      expenses = value.expenses;
    });
  });
</script>

<h1>Expenses Placeholder</h1>
<p>This page is under construction.</p>