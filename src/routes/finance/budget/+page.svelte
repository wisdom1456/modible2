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

  let budget = { categories: [] };
  let newCategory = { id: '', name: '', amount: 0 };

  onMount(async () => {
    budget = await financeStore.getBudget();
  });

  function addCategory() {
    financeStore.addBudgetCategory(newCategory);
    newCategory = { id: '', name: '', amount: 0 };
  }
</script>

<h1>Budget Placeholder</h1>
<p>This page is under construction.</p>

<style>
  .budget-container {
    padding: 2rem;
    background: #f5f7fa;
    min-height: 100vh;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-group button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
  }
</style>

<div class="budget-container">
  <h1 class="text-2xl font-bold mb-4">Budget Manager</h1>
  <div class="form-group">
    <label>Name:</label>
    <input type="text" bind:value={newCategory.name} />
    <label>Amount:</label>
    <input type="number" bind:value={newCategory.amount} />
  </div>
  <button on:click={addCategory}>Add Category</button>
  <h2 class="text-xl font-semibold mt-4">Categories</h2>
  {#each budget.categories as category}
    <div class="form-group">
      <label>{category.name}:</label>
      <input type="number" bind:value={category.amount} />
    </div>
  {/each}
</div>