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

  let balance: any[] = [];

  onMount(() => {
    financeStore.subscribe(value => {
      balance = value.balance;
    });
  });
</script>

<h1>Balance Placeholder</h1>
<p>This page is under construction.</p>