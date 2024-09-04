<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types/finance';

  export let currentTransaction: Transaction | null = null;
  const dispatch = createEventDispatcher();

  let description = currentTransaction?.description || '';
  let amount = currentTransaction?.amount || 0;
  let date = currentTransaction?.date || new Date().toISOString().split('T')[0];
  let type = currentTransaction?.type || 'income';
  let category = currentTransaction?.category || '';
  let name = currentTransaction?.name || '';
  
  function handleSave() {
    const newTransaction: Transaction = {
      id: currentTransaction ? currentTransaction.id : Date.now().toString(),
      description,
      name,
      amount,
      date: new Date(date),
      type,
      category,
    };

    if (currentTransaction) {
      transactionsStore.updateTransaction(newTransaction);
    } else {
      transactionsStore.addTransaction(newTransaction);
    }

    dispatch('close');
  }

  function handleCancel() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-xl font-bold mb-4">{currentTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
    <form on:submit|preventDefault={handleSave}>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input type="text" bind:value={description} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" bind:value={amount} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" bind:value={date} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Type</label>
        <select bind:value={type} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <input type="text" bind:value={category} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="flex justify-end">
        <button type="button" on:click={handleCancel} class="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </form>
  </div>
</div>