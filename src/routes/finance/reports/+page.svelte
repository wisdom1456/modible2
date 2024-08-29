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

  let goals: any[] = [];
  let dailyExpenses: any[] = [];

  onMount(() => {
    financeStore.subscribe(value => {
      goals = value.goals;
      dailyExpenses = value.dailyExpenses;
    });
  });
</script>

<h1>Reports Placeholder</h1>
<p>This page is under construction.</p>