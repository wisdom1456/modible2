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

  let balance = 0;

  onMount(() => {
    const unsubscribe = financeStore.subscribe(value => {
      if (value) {
        balance = value.balance;
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<ModuleNavigation items={financeNavItems} />

<div class="p-4 bg-white rounded-lg shadow-md">
  <h1 class="text-3xl font-bold mb-4 text-gray-800">Balance</h1>
  <p class="text-lg">Your current balance is: <span class="font-semibold">${balance}</span></p>
  <p class="text-lg">This page will provide detailed insights into your financial balance, including recent transactions, income, and expenses.</p>
</div>