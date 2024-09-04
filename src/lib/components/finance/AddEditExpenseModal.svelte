<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types/finance';

  export let currentTransaction: Transaction | null = null;
  const dispatch = createEventDispatcher();

  let description = currentTransaction?.description || '';
  let amount = currentTransaction?.amount || 0;
  let date = currentTransaction?.date || new Date().toISOString().split('T')[0];
  let category = currentTransaction?.category || '';
  function handleSave() {
    const newExpense: Transaction = {
      id: currentTransaction ? currentTransaction.id : Date.now().toString(),
      name: description, 
      description,
      amount,
      date: new Date(date),
      type: 'expense',
      category,
    };

    if (currentTransaction) {
      transactionsStore.updateTransaction(newExpense);
    } else {
      transactionsStore.addTransaction(newExpense);
    }

    dispatch('close');
  }

  function handleCancel() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-xl font-bold mb-4">{currentTransaction ? 'Edit Expense' : 'Add Expense'}</h2>
    <form on:submit|preventDefault={handleSave}>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input id="description" type="text" bind:value={description} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input id="amount" type="number" bind:value={amount} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input id="date" type="date" bind:value={date} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <input id="category" type="text" bind:value={category} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="flex justify-end">
        <button type="button" on:click={handleCancel} class="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </form>
  </div>
</div>