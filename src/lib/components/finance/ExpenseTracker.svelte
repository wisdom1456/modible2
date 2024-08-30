<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { Expense } from '$lib/types';

  let expenses: Expense[] = [];
  let newExpense: Expense = { id: '', date: new Date(), amount: 0, category: '', description: '' };
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      expenses = await financeStore.getExpenses();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });

  async function addExpense() {
    try {
      await financeStore.addExpense(newExpense);
      newExpense = { id: '', date: new Date(), amount: 0, category: '', description: '' };
      expenses = await financeStore.getExpenses();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    }
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Expense Tracker</h2>
  <ul class="space-y-2">
    {#each expenses as expense}
      <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
        <span>{expense.date.toLocaleDateString()}</span>
        <span>{expense.description} - ${expense.amount} ({expense.category})</span>
      </li>
    {/each}
  </ul>
  <form on:submit|preventDefault={addExpense} class="mt-4 space-y-4">
    <input type="date" bind:value={newExpense.date} required class="w-full p-2 border border-gray-300 rounded-md" />
    <input type="number" bind:value={newExpense.amount} placeholder="Amount" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input bind:value={newExpense.category} placeholder="Category" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input bind:value={newExpense.description} placeholder="Description" required class="w-full p-2 border border-gray-300 rounded-md" />
    <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Expense</button>
  </form>
</div>