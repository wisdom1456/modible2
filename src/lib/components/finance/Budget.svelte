<script lang="ts">
  import { onMount } from 'svelte';
  import { budgetStore } from '$lib/stores/financeStore';
  import type { BudgetItem } from '$lib/types/finance';

  let budgetItems: BudgetItem[] = [];
  let newBudgetItem: Omit<BudgetItem, 'id'> = { name: '', amount: 0, category: '' };
  let isLoading = false;
  let error: string | null = null;

  async function loadBudgetItems() {
    isLoading = true;
    error = null;
    try {
      budgetItems = await budgetStore.getBudgetItems();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch budget items';
    } finally {
      isLoading = false;
    }
  }

  async function addBudgetItem() {
    if (!newBudgetItem.name || newBudgetItem.amount <= 0 || !newBudgetItem.category) {
      error = 'Invalid budget item details';
      return;
    }
    isLoading = true;
    error = null;
    try {
      await budgetStore.addBudgetItem(newBudgetItem);
      await loadBudgetItems();
      newBudgetItem = { name: '', amount: 0, category: '' };
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to add budget item';
    } finally {
      isLoading = false;
    }
  }

  onMount(loadBudgetItems);
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="budget-heading">
  <h2 id="budget-heading" class="text-2xl font-bold mb-4 text-gray-800">Budget</h2>
  
  {#if isLoading}
    <p class="text-gray-600">Loading budget items...</p>
  {:else if error}
    <p class="text-red-500" role="alert">Error: {error}</p>
  {:else}
    <ul class="space-y-2">
      {#each budgetItems as item (item.id)}
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span class="text-gray-800">{item.name}</span>
          <span class="text-gray-800">${item.amount}</span>
          <span class="text-gray-800">{item.category}</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addBudgetItem} class="mt-4 space-y-4" aria-label="Add new budget item">
      <input bind:value={newBudgetItem.name} placeholder="Item Name" required class="input" />
      <input type="number" bind:value={newBudgetItem.amount} placeholder="Amount" required class="input" />
      <input bind:value={newBudgetItem.category} placeholder="Category" required class="input" />
      <button type="submit" class="btn">Add Budget Item</button>
    </form>
  {/if}
</div>