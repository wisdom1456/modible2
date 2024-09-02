<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types';

  export let currentExpense: Transaction | null = null;
  const dispatch = createEventDispatcher();

  let expense: Transaction = currentExpense 
    ? { ...currentExpense } 
    : { id: Date.now().toString(), date: new Date(), amount: 0, description: '', type: 'expense' };
  let isLoading = false;
  let error: string | null = null;

  async function handleSubmit() {
    isLoading = true;
    error = null;
    try {
      if (currentExpense) {
        await transactionsStore.updateTransaction(expense);
      } else {
        await transactionsStore.addTransaction(expense);
      }
      dispatch('close');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to save expense';
    } finally {
      isLoading = false;
    }
  }

  async function handleDelete() {
    if (currentExpense) {
      isLoading = true;
      error = null;
      try {
        await transactionsStore.deleteTransaction(currentExpense.id);
        dispatch('close');
      } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to delete expense';
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
  <div class="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">{currentExpense ? 'Edit Expense' : 'Add Expense'}</h2>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <label class="block">
        <span class="text-gray-700">Date</span>
        <input type="date" bind:value={expense.date} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Amount</span>
        <input type="number" bind:value={expense.amount} placeholder="Amount" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Description</span>
        <input bind:value={expense.description} placeholder="Description" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <div class="flex justify-end space-x-4">
        {#if currentExpense}
          <button type="button" on:click={handleDelete} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
        {/if}
        <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{currentExpense ? 'Save' : 'Add'}</button>
        <button type="button" on:click={() => dispatch('close')} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
      </div>
    </form>
  </div>
</div>