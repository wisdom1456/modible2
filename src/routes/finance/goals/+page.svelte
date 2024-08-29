<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';

  const financeNavItems = [
    { href: '/finance', label: 'Overview' },
    { href: '/finance/budget', label: 'Budget' },
    { href: '/finance/expenses', label: 'Expenses' },
    { href: '/finance/investments', label: 'Investments' },
    { href: '/finance/goals', label: 'Financial Goals' },
  ];
</script>

<style>
  .goals-container {
    padding: 2rem;
    background: #f5f7fa;
    min-height: 100vh;
  }
</style>

<div class="goals-container">
  <h1 class="text-2xl font-bold mb-4">Financial Goals</h1>
  <p>This page is under construction.</p>
</div>