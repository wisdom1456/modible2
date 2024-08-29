<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { Expense } from '$lib/types';

  let expenses: Expense[] = [];
  let newExpense: Expense = { id: '', date: new Date(), amount: 0, category: '', description: '' };

  onMount(async () => {
    expenses = await financeStore.getExpenses();
  });

  function addExpense() {
    financeStore.addExpense(newExpense);
    newExpense = { id: '', date: new Date(), amount: 0, category: '', description: '' };
  }

  function deleteExpense(id: string) {
    financeStore.deleteExpense(id);
  }
</script>

<div class="card">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Expense Tracker</h2>
  <div class="expenses space-y-4">
    {#each expenses as expense}
      <div class="expense-item flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
        <span class="text-lg font-medium text-gray-700">{expense.description}</span>
        <span class="text-lg font-medium text-gray-700">${expense.amount}</span>
        <button on:click={() => deleteExpense(expense.id)} class="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    {/each}
  </div>
  <div class="form-group mt-4">
    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
    <input id="description" type="text" bind:value={newExpense.description} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <div class="form-group mt-4">
    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
    <input id="amount" type="number" bind:value={newExpense.amount} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <button on:click={addExpense} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Expense</button>
</div>

<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>