<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { Budget, BudgetCategory } from '$lib/types';

  let budget: Budget = { categories: [] };
  let newCategory: BudgetCategory = { id: '', name: '', amount: 0 };

  onMount(async () => {
    budget = await financeStore.getBudget();
  });

  function addCategory() {
    financeStore.addBudgetCategory(newCategory);
    newCategory = { id: '', name: '', amount: 0 };
  }
</script>

<div class="card">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Budget Manager</h2>
  <div class="categories space-y-4">
    {#each budget.categories as category}
      <div class="category flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
        <span class="text-lg font-medium text-gray-700">{category.name}</span>
        <span class="text-lg font-medium text-gray-700">${category.amount}</span>
      </div>
    {/each}
  </div>
  <div class="form-group mt-4">
    <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
    <input id="name" type="text" bind:value={newCategory.name} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <div class="form-group mt-4">
    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
    <input id="amount" type="number" bind:value={newCategory.amount} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <button on:click={addCategory} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Category</button>
</div>

<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>