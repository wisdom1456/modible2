<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types/finance';

  export let currentTransaction: Transaction | null = null;
  const dispatch = createEventDispatcher();

  let transaction: Transaction = currentTransaction 
    ? { ...currentTransaction } 
    : { id: Date.now().toString(), date: new Date(), amount: 0, type: 'expense', description: '', category: '' };
  let isLoading = false;
  let error: string | null = null;

  function formatDate(date: Date): string {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Ensure the date is formatted correctly for the input
  $: formattedDate = formatDate(transaction.date);

  async function handleSubmit() {
    isLoading = true;
    error = null;
    try {
      if (currentTransaction) {
        await transactionsStore.updateTransaction(transaction);
      } else {
        await transactionsStore.addTransaction(transaction);
      }
      dispatch('close');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to save transaction';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
  <div class="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">{currentTransaction ? 'Edit Expense' : 'Add Expense'}</h2>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <label class="block">
        <span class="text-gray-700">Date</span>
        <input type="date" bind:value={formattedDate} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Amount</span>
        <input type="number" bind:value={transaction.amount} placeholder="Amount" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Description</span>
        <input bind:value={transaction.description} placeholder="Description" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Category</span>
        <input bind:value={transaction.category} placeholder="Category" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <div class="flex justify-end space-x-4">
        <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{currentTransaction ? 'Save' : 'Add'}</button>
        <button type="button" on:click={() => dispatch('close')} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
      </div>
    </form>
  </div>
</div>